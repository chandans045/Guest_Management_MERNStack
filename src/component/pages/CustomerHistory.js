import React, { useState, useEffect } from "react";
import Navbar from "../module/Navbar";
import ReactPaginate from "react-paginate";

export default function CustomerHistory() {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); // For pagination

  useEffect(() => {
    fetchCustomers();
  }, []);

  const customersPerPage = 10; // Number of customers to show per page

  const fetchCustomers = async () => {
    try {
      const response = await fetch(
        "https://guest-mangement-backend.onrender.com/app/customers-get"
      );
      if (response.ok) {
        const data = await response.json();
        // Sort customers by checkout date in descending order
        data.sort(
          (a, b) => new Date(b.checkoutDate) - new Date(a.checkoutDate)
        );
        setCustomers(data);
        setFilteredCustomers(data);
      } else {
        throw new Error("Failed to fetch customers");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filteredData = customers.filter((customer) => {
      // Check if any field contains the search query
      return (
        customer.price.toString().includes(query) ||
        customer.category.toLowerCase().includes(query) ||
        customer.name.toLowerCase().includes(query) ||
        customer.aadhar.toString().includes(query) ||
        customer.address.toLowerCase().includes(query) ||
        new Date(customer.dob).toLocaleDateString().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.mobile.toString().includes(query) ||
        customer.roomNumbers.toString().includes(query) ||
        new Date(customer.checkinDate).toLocaleDateString().includes(query) ||
        new Date(customer.checkoutDate).toLocaleDateString().includes(query)
      );
    });
    setFilteredCustomers(filteredData);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = async (customerId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `https://guest-mangement-backend.onrender.com/app/customers-delete/${customerId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          fetchCustomers(); // Refresh the customer list after deletion
        } else {
          throw new Error("Failed to delete customer");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to delete customer");
      }
    }
  };

  const pageCount = Math.ceil(filteredCustomers.length / customersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayedCustomers = filteredCustomers.slice(
    pageNumber * customersPerPage,
    (pageNumber + 1) * customersPerPage
  );

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <h2 className="mt-3 mb-4">Customer History</h2>
        <div className="form-group d-flex mb-3">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search by any field"
            value={searchQuery}
            onChange={handleChange}
            style={{ maxWidth: "200px" }}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>No.</th>
                <th>Price</th>
                <th>Category</th>
                <th>Name</th>
                <th>Aadhar</th>
                <th>Address</th>
                <th>Date of Birth</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Room Numbers</th>
                <th>Check-in Date</th>
                <th>Check-out Date</th>
                <th>Action</th> {/* Add a column for the delete button */}
              </tr>
            </thead>
            <tbody>
              {displayedCustomers.map((customer, index) => (
                <tr key={customer._id}>
                  <td>{index + 1}</td>
                  <td>{customer.price}</td>
                  <td>{customer.category}</td>
                  <td>{customer.name}</td>
                  <td>{customer.aadhar}</td>
                  <td>{customer.address}</td>
                  <td>{new Date(customer.dob).toLocaleDateString()}</td>
                  <td>{customer.email}</td>
                  <td>{customer.mobile}</td>
                  <td>{customer.roomNumbers}</td>
                  <td>{new Date(customer.checkinDate).toLocaleDateString()}</td>
                  <td>
                    {new Date(customer.checkoutDate).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(customer._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination justify-content-center"} // Center the pagination
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          disabledClassName={"disabled"}
          activeClassName={"active"}
          pageClassName={"page-item"} // Style for each page item
          breakClassName={"page-item"} // Style for break pages (if any)
          pageLinkClassName={"page-link"}
          breakLinkClassName={"page-link"}
          previousClassName={"page-item"} // Style for previous button
          nextClassName={"page-item"} // Style for next button
        />
      </div>
    </div>
  );
}
