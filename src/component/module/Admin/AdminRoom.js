import React, { useState, useEffect } from "react";
import Navbar from "../../module/Navbar";
import Footer from "../../module/Footer";
import AdminPanel from "./AdminPanel";

export default function AdminRoom() {
  const [rooms, setRooms] = useState([]);
  const [getid, setGetid] = useState("");
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    price: 0,
    status: 0,
    // image: "",
  });

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

  const handleDeleteRoom = async (roomId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `https://guest-mangement-backend.onrender.com/app/delete-room/${roomId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setRooms(rooms.filter((room) => room._id !== roomId));
        } else {
          throw new Error("Failed to delete room");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (room) => {
    // Set the form fields with the values of the selected product
    setFormData({
      ...formData,
      category: room.category,
      description: room.description,
      price: room.price,
      status: room.status,
    });
    setGetid(room._id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch(
        `https://guest-mangement-backend.onrender.com/app/update-room/${getid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (data.ok) {
        console.log("room updated successfully");
        // Reset the form fields
        setFormData({
          category: "",
          description: "",
          price: 0,
          status: 0,
        });
        fetchRooms();
      } else {
        console.error("Failed to update room");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <Navbar />
        <div className="container-fluid mt-3 p-0">
          <div className="row">
            <div className="col-md-3">
              <AdminPanel />
            </div>
            <div className="col-md-9 justify-content-center align-items-center ">
              <h1>All rooms</h1>
              <div className="row">
                {rooms.map((room) => (
                  <div key={room._id} className="col-md-4 mb-4">
                    <div className="card h-100">
                      {" "}
                      {/* Set a fixed height for the card */}
                      <img
                        src={room.image}
                        className="card-img-top"
                        alt={room.category}
                        style={{ objectFit: "cover", height: "200px" }}
                      />
                      <div className="card-body d-flex flex-column justify-content-between">
                        {" "}
                        {/* Wrap buttons in a flex container */}
                        <h5 className="card-title">{room.category}</h5>
                        <p className="card-text">
                          Description: {room.description}
                        </p>
                        <p className="card-text">Price: Rs:{room.price}</p>
                        <p className="card-text">Status: {room.status}</p>
                        <div className="mt-auto">
                          {" "}
                          {/* Apply margin to the container */}
                          <button
                            className="btn btn-danger mr-2 me-2"
                            onClick={() => handleDeleteRoom(room._id)}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => handleEdit(room)}
                            data-bs-toggle="modal"
                            data-bs-target="#updateRoomModal"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />

        {/* Update room form */}
        <div
          className="modal fade"
          id="updateRoomModal"
          tabIndex="-1"
          aria-labelledby="updateRoomModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form>
                <div className="modal-header">
                  <h5 className="modal-title" id="updateRoomModalLabel">
                    Update Room
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    id="closeUpdateRoomModal"
                  ></button>
                </div>
                <div className="modal-body">
                  {/* <input
                  type="file"
                  className="form-control"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                /> */}
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                      type="text"
                      className="form-control"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <input
                      type="number"
                      className="form-control"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleUpdate}
                    data-bs-dismiss="modal"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
