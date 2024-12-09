const Service = require("../models/services");
const jwt = require("jsonwebtoken");
const Business = require("../models/business");
const Admin = require("../models/admin");
const addService = async (req, res) => {
  try {
    const { name, description, price } = req.body;


    if (!name || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const adminId = req.user._id; 
    if (!adminId) {
      return res.status(400).json({ message: "Admin ID not found" });
    }

   
    const business = await Business.findOne({ ownerDetails: adminId });
    if (!business) {
      return res.status(404).json({ message: "Business not found for this admin" });
    }

    const businessId = business._id; 

    const newService = new Service({
      name,
      description,
      price,
      business: businessId,
    });


    await newService.save();

   
    const updatedBusiness = await Business.findByIdAndUpdate(
      businessId,
      { $push: { services: newService._id } },
      { new: true } 
    );


    if (!updatedBusiness) {
      return res.status(404).json({ message: "Business not found" });
    }

   
    res.status(201).json({
      message: "Service added successfully",
      data: newService,
      business: updatedBusiness, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add service",
      error: error.message,
    });
  }
};

const getServicesAdminDashboard =  async (req, res) => {
  try {
    const token = req.cookies.token;
   
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("2");
    console.log(decoded);
    const businessId = decoded.businessId;
    console.log(businessId);
    
    if (!businessId) {
      return res.status(404).json({ message: "Business not found for this admin" });
    }

    const business = await Business.findById(businessId).populate("services");
    // console.log("3");
    if (!business || !business.services) {
      return res.status(404).json({ message: "No services found for this business" });
    }

    res.status(200).json(business.services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}



const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const updatedService = await Service.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true }
    );
    res.status(200).json({ updatedService });
  } catch (error) {
    res.status(500).json({ message: "Failed to update service", error });
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params; // Get the ID from the URL parameters

  try {
    // Check if the service exists
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Delete the service using findByIdAndDelete
    await Service.findByIdAndDelete(id);

    // Return a success response
    return res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    // Log the error for debugging purposes
    console.error(error);

    // Return an error response if something goes wrong
    return res.status(500).json({ message: 'Server error, could not delete service' });
  }
};



const getService = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Backend: Received id:", id);
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ status: 404, msg: "Service not found" });
    }
    res.json({ status: 200, msg: "Service found", data: service });
  } catch (err) {
    console.error("Error fetching Service:", err);
    res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};

module.exports = { addService, getService , getServicesAdminDashboard , updateService , deleteService};