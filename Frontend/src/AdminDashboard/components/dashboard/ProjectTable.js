
// export default ProjectTables;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast"

// const ProjectTables = ({ businessId }) => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3001/business/getBookings`,
//           { withCredentials: true }
//         );
//         setBookings(response.data.bookings);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch bookings");
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [businessId]);

//   const handleStatusChange = async (index, newStatus) => {
//     const updatedBookings = [...bookings];
//     updatedBookings[index].status = newStatus; // Update the status optimistically

//     setBookings(updatedBookings); // Optimistically update the UI

//     try {
//       const bookingId = bookings[index]._id; // Get the booking ID to update

//       // Make the API call to update the status in the backend
//       await axios.post(
//         "http://localhost:3001/booking/updateStatus",
//         {
//           bookingId,
//           status: newStatus,
//         },
//         { withCredentials: true }
//       );

//       // Success: status updated in backend, no need for changes here
//     } catch (err) {
//       setError("Failed to update status");
//       console.log("Error updating booking status:", err);

//       // Rollback UI update in case of error (optional)
//       const rollbackBookings = [...bookings];
//       rollbackBookings[index].status = bookings[index].status; // Revert to the old status
//       setBookings(rollbackBookings);
//     }
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-400";
//       case "Cancel":
//         return "bg-red-600";
//       case "confirmed":
//         return "bg-green-600";
//       default:
//         return "bg-gray-500";
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="overflow-x-auto">
//       <div className="bg-white shadow-lg rounded-lg p-6">
//         <h5 className="text-2xl font-semibold mb-2 text-black text-center">
//           Bookings List
//         </h5>
//         <p className="text-sm text-gray-500 mb-4 text-center">
//           Overview of the bookings
//         </p>

//         <table className="min-w-full table-auto text-center">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-2 px-4 text-sm font-medium text-gray-600">Client Name</th>
//               <th className="py-2 px-4 text-sm font-medium text-gray-600">Email</th>
//               <th className="py-2 px-4 text-sm font-medium text-gray-600">Mobile Number</th>
//               <th className="py-2 px-4 text-sm font-medium text-gray-600">Guest</th>
//               <th className="py-2 px-4 text-sm font-medium text-gray-600">Booking Time</th>
//               <th className="py-2 px-4 text-sm font-medium text-gray-600">Date of Booking</th>
//               <th className="py-2 px-4 text-sm font-medium text-gray-600">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking, index) => (
//               <tr
//                 key={index}
//                 className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
//               >
//                 <td className="py-4 px-4 text-center">
//                   <div className="flex items-center justify-start">
//                     <div className="ml-3 text-start">
//                       <h6 className="text-sm font-medium text-black">{booking.name}</h6>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="py-4 px-4 text-sm text-black">{booking.email}</td>
//                 <td className="py-4 px-4 text-sm text-black">{booking.mobileNumber}</td>
//                 <td className="py-4 px-4 text-sm text-black">{booking.guestCount}</td>
//                 <td className="py-4 px-4 text-sm text-black">{booking.bookingTime}</td>
//                 <td className="py-4 px-4 text-sm text-black">{booking.bookingDate}</td>
//                 <td className="py-4 px-4 text-center">
//                   <div className="flex justify-center gap-2">
//                     <button
//                       onClick={() => handleStatusChange(index, "confirmed")}
//                       className={`px-4 py-2 rounded-full text-white ${
//                         booking.status === "confirmed"
//                           ? "bg-green-600"
//                           : "bg-green-400 hover:bg-green-500"
//                       }`}
//                       disabled={booking.status === "confirmed"}
//                     >
//                       Confirm
//                     </button>
//                     <button
//                       onClick={() => handleStatusChange(index, "Cancel")}
//                       className={`px-4 py-2 rounded-full text-white ${
//                         booking.status === "Cancel"
//                           ? "bg-red-600"
//                           : "bg-red-400 hover:bg-red-500"
//                       }`}
//                       disabled={booking.status === "Cancel"}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProjectTables;
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";  // Import react-hot-toast

const ProjectTables = ({ businessId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/business/getBookings`,
          { withCredentials: true }
        );
        setBookings(response.data.bookings);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch bookings");
        setLoading(false);
      }
    };

    fetchBookings();
  }, [businessId]);

  const handleStatusChange = async (index, newStatus) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].status = newStatus; // Update the status optimistically

    setBookings(updatedBookings); // Optimistically update the UI

    try {
      const bookingId = bookings[index]._id; // Get the booking ID to update

      // Make the API call to update the status in the backend
      await axios.post(
        "http://localhost:3001/booking/updateStatus",
        {
          bookingId,
          status: newStatus,
        },
        { withCredentials: true }
      );

      // Success: show a success toast
      toast.success("Booking status updated successfully!");
    } catch (err) {
      setError("Failed to update status");
      console.log("Error updating booking status:", err);

      // Rollback UI update in case of error (optional)
      const rollbackBookings = [...bookings];
      rollbackBookings[index].status = bookings[index].status; // Revert to the old status
      setBookings(rollbackBookings);

      // Show error toast
      toast.error("Failed to update booking status!");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-400";
      case "Cancel":
        return "bg-red-600";
      case "confirmed":
        return "bg-green-600";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="overflow-x-auto">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h5 className="text-2xl font-semibold mb-2 text-black text-center">
          Bookings List
        </h5>
        <p className="text-sm text-gray-500 mb-4 text-center">
          Overview of the bookings
        </p>

        <table className="min-w-full table-auto text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">Client Name</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">Email</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">Mobile Number</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">Guest</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">Booking Time</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">Date of Booking</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">Current Status</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">Update Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={index}
                className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center justify-start">
                    <div className="ml-3 text-start">
                      <h6 className="text-sm font-medium text-black">{booking.name}</h6>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-black">{booking.email}</td>
                <td className="py-4 px-4 text-sm text-black">{booking.mobileNumber}</td>
                <td className="py-4 px-4 text-sm text-black">{booking.guestCount}</td>
                <td className="py-4 px-4 text-sm text-black">{booking.bookingTime}</td>
                <td className="py-4 px-4 text-sm text-black">{booking.bookingDate}</td>
                {/* Current Status Column */}
                <td className="py-4 px-4 text-center">
                  <span
                    className={`px-4 py-2 rounded-full text-white ${getStatusClass(booking.status)}`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </td>
                {/* Update Status Column */}
                <td className="py-4 px-4 text-center">
                  <div className="flex justify-center gap-2">
                    {/* Confirm Button */}
                    <button
                      onClick={() => handleStatusChange(index, "confirmed")}
                      className={`px-4 py-2 rounded-full text-white ${
                        booking.status === "confirmed"
                          ? "bg-green-600"
                          : "bg-green-400 hover:bg-green-500"
                      }`}
                      disabled={booking.status === "confirmed"}
                    >
                      Confirm
                    </button>
                    {/* Cancel Button */}
                    <button
                      onClick={() => handleStatusChange(index, "Cancel")}
                      className={`px-4 py-2 rounded-full text-white ${
                        booking.status === "Cancel"
                          ? "bg-red-600"
                          : "bg-red-400 hover:bg-red-500"
                      }`}
                      disabled={booking.status === "Cancel"}
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTables;
