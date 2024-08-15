import React, { useState, useEffect } from "react";
import "../css/allproduct.css";

export default function AllProductsec() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [numberOfRoom, setNumberOfRoom] = useState(1);
  const [numberOfDay, setNumberOfDay] = useState(1);
  const [futureroom, setFutureroom] = useState([]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [formData, setFormData] = useState({
    roomid: "",
    category: "",
    price: 0,
    name: "",
    aadhar: "",
    address: "",
    dob: "",
    email: "",
    mobile: "",
    roomNumbers: 1, // Default to 1 room
    checkinDate: formatDate(new Date()), // Set default check-in date to current date
    checkoutDate: "",
  });
  const [available, setAvailable] = useState({
    date: formatDate(new Date()),
  });

  const checkAvailability = async (selectedDate) => {
    try {
      const response = await fetch(
        "https://guest-mangement-backend.onrender.com/app/all-bookings"
      );
      if (response.ok) {
        const bookings = await response.json();
        const totalRooms = rooms.reduce((acc, room) => acc + room.status, 0); // Calculate total number of rooms
        const matchedBookings = bookings.filter((booking) => {
          const bookingCheckinDate = new Date(booking.checkinDate);
          const selectedDateObj = new Date(selectedDate);
          return (
            bookingCheckinDate.toDateString() === selectedDateObj.toDateString()
          );
        });
        if (selectedDate === formatDate(new Date())) {
          setFutureroom(totalRooms);
        } else {
          const numMatches = matchedBookings.length;
          const futureRooms = totalRooms - numMatches;
          setFutureroom(futureRooms);
        }
      } else {
        throw new Error("Failed to fetch bookings");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch(
        "https://guest-mangement-backend.onrender.com/app/get-allrooms"
      );
      if (response.ok) {
        const data = await response.json();
        setRooms(data);
      } else {
        throw new Error("Failed to fetch rooms");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "roomNumbers") {
      const selectedRoomPrice = selectedRoom.price || 0;
      const totalPrice = selectedRoomPrice * parseInt(value) * numberOfDay;
      setNumberOfRoom(parseInt(value));
      setFormData({ ...formData, [name]: value, price: totalPrice });
    } else if (name === "checkoutDate") {
      const checkinDate = new Date(formData.checkinDate);
      const checkoutDate = new Date(value);
      const currentDate = new Date();

      if (checkoutDate <= checkinDate) {
        alert("Checkout date must be greater than check-in date.");
        return;
      }

      if (checkoutDate <= currentDate) {
        alert("Checkout date must be greater than the current date.");
        return;
      }

      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const diffDays = Math.round(
        Math.abs((checkinDate - checkoutDate) / oneDay)
      );
      setNumberOfDay(diffDays);
      const totalPrice = selectedRoom.price * diffDays * numberOfRoom;
      setFormData({ ...formData, [name]: value, price: totalPrice });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBookNowClick = (room) => {
    setSelectedRoom(room);

    setFormData({
      ...formData,
      roomid: room._id,
      category: room.category,
      price: room.price,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let closebtn = document.getElementById("closebookingmodal");
    const { category, price, name, aadhar, address, dob, email, mobile } =
      formData;
    // Validate check-in and check-out dates
    if (!formData.checkinDate || !formData.checkoutDate) {
      alert("Please select check-in and check-out dates.");
      return;
    }
    if (category.trim() === "") {
      alert("Category is required.");
      return;
    }

    if (price <= 0) {
      alert("Price must be greater than 0.");
      return;
    }

    if (name.trim() === "") {
      alert("Name is required.");
      return;
    }

    // Validate Aadhar number format (example: 12 digits)
    const aadharRegex = /^\d{12}$/;
    if (!aadhar.match(aadharRegex)) {
      alert("Invalid Aadhar number. Please enter 12 digits.");
      return;
    }

    if (address.trim() === "") {
      alert("Address is required.");
      return;
    }

    if (!dob) {
      alert("Date of Birth is required.");
      return;
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      alert("Invalid email address.");
      return;
    }

    // Validate mobile number format (example: 10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobile.match(mobileRegex)) {
      alert("Invalid mobile number. Please enter 10 digits.");
      return;
    }

    try {
      const response = await fetch(
        "https://guest-mangement-backend.onrender.com/app/booking-send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      await fetch(
        "https://guest-mangement-backend.onrender.com/app/customers-send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Update room status in the database when check-in date arrives...
        if (selectedRoom) {
          const checkinDate = new Date(formData.checkinDate);
          const currentDate = new Date();

          if (checkinDate.getTime() <= currentDate.getTime()) {
            const updatedStatus = selectedRoom.status - formData.roomNumbers;
            await fetch(
              `https://guest-mangement-backend.onrender.com/app/update-room-status/${selectedRoom._id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: updatedStatus }),
              }
            );
            console.log(
              "Room status updated when check-in date has arrived or is the current date"
            );
          } else {
            // Calculate milliseconds until check-in date arrives
            const timeUntilCheckin =
              checkinDate.getTime() - currentDate.getTime();
            setTimeout(async () => {
              const updatedStatus = selectedRoom.status - formData.roomNumbers;
              await fetch(
                `https://guest-mangement-backend.onrender.com/app/update-room-status/${selectedRoom._id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ status: updatedStatus }),
                }
              );
              fetchRooms();
            }, timeUntilCheckin);
          }
        }

        console.log("room booking successfully");
        alert("room booking successfully");
        closebtn.click();
        fetchRooms();
        setFormData({
          ...formData,
          name: "",
          aadhar: "",
          address: "",
          dob: "",
          email: "",
          mobile: "",
          roomNumbers: 1, // Reset room numbers to 1
          checkinDate: formatDate(new Date()),
          checkoutDate: "",
        });
      } else {
        console.error("Failed to book room");
      }
    } catch (error) {
      console.error("Error book room:", error);
    }
  };

  return (
    <div>
      <section style={{ backgroundColor: "#eee" }}>
        <h2 className="pt-4">
          {" "}
          <img src="./images/roomtype.png" alt="" />
          All Rooms <img src="./images/roomtype.png" alt="" />
        </h2>
        <div className="container py-5">
          {rooms.map((room, index) => (
            <div
              className="row justify-content-center mb-3 allroom"
              key={index}
            >
              <div
                className="col-md-12 col-xl-10 wow animate__animated animate__backInUp "
                style={{ animationDuration: "2s" }}
              >
                <div className="card shadow-0 border rounded-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                        <div className="bg-image hover-zoom ripple rounded ripple-surface overflow-hidden ">
                          <img
                            src={room.image}
                            alt=""
                            className="w-100 allroomimg"
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                          <div className="hover-overlay">
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "rgba(253, 253, 253, 0.15)",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6 col-xl-6">
                        <h5>Description</h5>
                        <p>{room.description}</p>
                      </div>
                      <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                        <div className="">
                          <h5>{room.category}</h5>
                          <h3 className="">Rs:{room.price}</h3>
                        </div>
                        <h6 className="text-success">
                          Available: {room.status} rooms
                        </h6>
                        {room.status > 0 && ( // Check if room is available
                          <div className="d-flex flex-column mt-4">
                            <button
                              className="btn btn-dark btn-sm"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => handleBookNowClick(room)}
                            >
                              BOOK NOW
                            </button>
                            <div className="d-flex">
                              <button
                                className="btn mb-0 mt-3 me-2"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal2"
                              >
                                check room
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div
        class="modal fade"
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                check for future room
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <input
                className="mt-3 w-25"
                type="date"
                value={available.date}
                onChange={(e) => {
                  setAvailable({
                    ...available,
                    date: e.target.value,
                  });
                  checkAvailability(e.target.value);
                }}
                name="date"
              />
              <div className="container py-5">
                {rooms.map((room, index) => (
                  <div
                    className="row justify-content-center mb-3 allroom"
                    key={index}
                  >
                    <div
                      className="col-md-12 col-xl-10 wow animate__animated animate__backInUp "
                      style={{ animationDuration: "2s" }}
                    >
                      <div className="card shadow-0 border rounded-3">
                        <div className="card-body">
                          <div className="">
                            <h5>{room.category}</h5>
                            <h3 className="">Rs:{room.price}</h3>
                          </div>
                          <h6 className="text-success">
                            Available: {futureroom} rooms
                          </h6>
                          {room.status > 0 && ( // Check if room is available
                            <div className="d-flex flex-column mt-4">
                              <button
                                className="btn btn-dark btn-sm"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal3"
                                onClick={() => handleBookNowClick(room)}
                              >
                                BOOK NOW
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Book {selectedRoom?.category}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="closebookingmodal"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3" style={{ display: "none" }}>
                  <label htmlFor="roomid" className="form-label">
                    id:
                  </label>
                  <input
                    type="text"
                    id="roomid"
                    name="roomid"
                    value={selectedRoom?._id || ""}
                    readOnly
                    className="form-control"
                  />
                </div>
                {/* Add dropdown for selecting number of rooms */}
                <div className="mb-3">
                  <label htmlFor="roomNumbers" className="form-label">
                    Number of Rooms:
                  </label>
                  <select
                    id="roomNumbers"
                    name="roomNumbers"
                    value={formData.roomNumbers}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {[...Array(selectedRoom?.status).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                </div>
                {/* End of dropdown */}
                {/* Check-in date */}
                <div className="mb-3">
                  <label htmlFor="checkinDate" className="form-label">
                    Check-in Date:
                  </label>
                  <input
                    type="date"
                    id="checkinDate"
                    name="checkinDate"
                    value={formData.checkinDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                {/* Check-out date */}
                <div className="mb-3">
                  <label htmlFor="checkoutDate" className="form-label">
                    Check-out Date:
                  </label>
                  <input
                    type="date"
                    id="checkoutDate"
                    name="checkoutDate"
                    value={formData.checkoutDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price:
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    readOnly
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category:
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={selectedRoom?.category || ""}
                    readOnly
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="aadhar" className="form-label">
                    Aadhar:
                  </label>
                  <input
                    type="number"
                    id="aadhar"
                    name="aadhar"
                    value={formData.aadhar}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address:
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dob" className="form-label">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile Number:
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal3"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Book {selectedRoom?.category}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="closebookingmodal"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3" style={{ display: "none" }}>
                  <label htmlFor="roomid" className="form-label">
                    id:
                  </label>
                  <input
                    type="text"
                    id="roomid"
                    name="roomid"
                    value={selectedRoom?._id || ""}
                    readOnly
                    className="form-control"
                  />
                </div>
                {/* Add dropdown for selecting number of rooms */}
                <div className="mb-3">
                  <label htmlFor="roomNumbers" className="form-label">
                    Number of Rooms:
                  </label>
                  <select
                    id="roomNumbers"
                    name="roomNumbers"
                    value={formData.roomNumbers}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {[...Array(futureroom).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                </div>
                {/* End of dropdown */}
                {/* Check-in date */}
                <div className="mb-3">
                  <label htmlFor="checkinDate" className="form-label">
                    Check-in Date:
                  </label>
                  <input
                    type="date"
                    id="checkinDate"
                    name="checkinDate"
                    value={formData.checkinDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                {/* Check-out date */}
                <div className="mb-3">
                  <label htmlFor="checkoutDate" className="form-label">
                    Check-out Date:
                  </label>
                  <input
                    type="date"
                    id="checkoutDate"
                    name="checkoutDate"
                    value={formData.checkoutDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price:
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    readOnly
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category:
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={selectedRoom?.category || ""}
                    readOnly
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="aadhar" className="form-label">
                    Aadhar:
                  </label>
                  <input
                    type="number"
                    id="aadhar"
                    name="aadhar"
                    value={formData.aadhar}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address:
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dob" className="form-label">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile Number:
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
