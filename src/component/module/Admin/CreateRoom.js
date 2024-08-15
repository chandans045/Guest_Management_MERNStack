import React, { useState } from "react";
import AdminPanel from "./AdminPanel";
import Navbar from "../Navbar";
import Footer from "../Footer";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    category: "",
    image: null,
    description: "",
    price: "",
    status: "",
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.category.trim() === "") {
      alert("Category is required");
      return;
    }

    if (!formData.image) {
      alert("Image is required");
      return;
    }

    if (formData.description.trim() === "") {
      alert("Description is required");
      return;
    }

    if (formData.price.trim() === "") {
      alert("Price is required");
      return;
    }

    if (formData.status.trim() === "") {
      alert("Status is required");
      return;
    }

    try {
      const response = await fetch(
        "https://guest-mangement-backend.onrender.com/app/create-rooms",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("room added successfully");
        alert("room added successfully");
        setFormData({
          category: "",
          image: null,
          description: "",
          price: "",
          status: "",
        });
      } else {
        console.error("Failed to add room");
      }
    } catch (error) {
      console.error("Error adding room:", error);
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
              <div className="container">
                <h1>Create Room</h1>
                <form>
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
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
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
                    <label className="form-label">status</label>
                    <input
                      type="number"
                      className="form-control"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CreateProduct;
