import { NavLink } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div>
      <div className=" container-fluid">
        <div className="list-group">
          <h4 className="text-start">Admin Panel</h4>

          <NavLink
            to="/CreateRoom"
            className="list-group-item list-group-item-action mb-1 text-start"
            style={{ backgroundColor: "#0d6efd" }}
          >
            Create Rooms
          </NavLink>

          <NavLink
            to="/AdminRoom"
            className="list-group-item list-group-item-action text-start mb-1"
            style={{ backgroundColor: "#0d6efd" }}
          >
            Rooms
          </NavLink>
          <NavLink
            to="/booked"
            className="list-group-item list-group-item-action text-start mb-1"
            style={{ backgroundColor: "#0d6efd" }}
          >
            Booked
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default AdminPanel;
