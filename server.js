const express = require("express");
const mongoose = require("mongoose");
const signupschema = require("./model/signupModel.js");
const productModel = require("./model/productModel.js");
const bookingModel = require("./model/bookingModel.js");
const customerModel = require("./model/customerModel.js");
const guestsignupSchema = require("./model/guestsignupModel.js");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
//middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(express.json());
app.use(cors());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).send({ error: "Invalid JSON" });
  }
  next();
});

//mongodb connection
try {
  mongoose.connect(
    "mongodb+srv://Chandan:Chandan123@cluster0.uvhr4v4.mongodb.net/guest_management"
  );
  console.log("connect db");
} catch (error) {
  console.log("failed db");
}

//used in signup page for sending data to database in source code in (SignUp.js)
//post api for signup
app.post("/app/send", async (req, res) => {
  try {
    // Create the product
    const product = await signupschema.create(req.body);

    // Respond with the created product
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    // Handle errors
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//post api for signup guest
app.post("/app/guest-send", async (req, res) => {
  try {
    // Create the product
    const product = await guestsignupSchema.create(req.body);

    // Respond with the created product
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    // Handle errors
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//used in login page
//get api for login page in souce code(Login.js)
app.get("/app/receive", async (req, res) => {
  try {
    const products = await signupschema.find({});
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
//guest login
app.get("/app/guest-receive", async (req, res) => {
  try {
    const products = await guestsignupSchema.find({});
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//update password used in login page in source code (Login.js)
app.put("/app/updatesingle/:email/:game", async (req, res) => {
  try {
    const { email, game } = req.params;
    const user = await signupschema.findOne({ email, game });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user's password
    user.password = req.body.password;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//forgot password
app.put("/app/guest-updatesingle/:email/:game", async (req, res) => {
  try {
    const { email, game } = req.params;
    const user = await guestsignupSchema.findOne({ email, game });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user's password
    user.password = req.body.password;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//create rooms in create rooms page located in manage rooms then admin panel in frontend and in source code in(CreateRoom.js)
//create rooms
app.post("/app/create-rooms", async (req, res) => {
  try {
    const { category, description, price, status, image } = req.body;

    // Convert base64 image data to buffer
    const imageData = Buffer.from(image.split("base64,")[1], "base64");

    // Write image data to a temporary file
    const imagePath = `temp_image_${Date.now()}.jpg`;
    fs.writeFileSync(imagePath, imageData);

    // Create the room with the image path
    const product = await productModel.create({
      category,
      description,
      price,
      status,
      image: imagePath,
    });

    // Respond with the created product
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    // Handle errors
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get all rooms that are already created in create room page in admin panel
//get all rooms it used in admin panel rooms page , booking page and booked page in frontend and in source code(AdminRoom.js,AllProductsec.js and Booked.js)
app.get("/app/get-allrooms", async (req, res) => {
  try {
    const products = await productModel.find({});

    // Convert image files to Base64 format
    const productsWithBase64Images = await Promise.all(
      products.map(async (product) => {
        const base64Image = await convertImageToBase64(product.image);
        return { ...product.toJSON(), image: base64Image };
      })
    );

    res.status(200).json(productsWithBase64Images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const convertImageToBase64 = (imagePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const base64Image = Buffer.from(data).toString("base64");
        resolve(`data:image/jpeg;base64,${base64Image}`);
      }
    });
  });
};

// Update the rooms like there category,description,price,status in rooms page in frontend and in (AdminRoom.js) in source code
app.put("/app/update-room/:roomId", async (req, res) => {
  const { roomId } = req.params;
  const { category, description, price, status, image } = req.body; // Include category and status fields

  try {
    const updatedRoom = await productModel.findByIdAndUpdate(
      roomId,
      { category, description, price, status, image }, // Update category and status fields
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete particular room in rooms page in admin panel in source code(AdminRoom.js)
app.delete("/app/delete-room/:roomId", async (req, res) => {
  const { roomId } = req.params;

  try {
    const deletedRoom = await productModel.findByIdAndDelete(roomId);

    if (!deletedRoom) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//in booking page in frontend we used to book the room and the data send to database in source code (AllProductsec.js)
//booking data post
app.post("/app/booking-send", async (req, res) => {
  try {
    // Create the product
    const book = await bookingModel.create(req.body);

    // Respond with the created product
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    // Handle errors
    console.error("Error booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//status update after room booking in booking page in frontend, also used in booked section after delete the customer then it update status and in souce code(AllProductsec.js,Booked.js)
app.put("/app/update-room-status/:id", async (req, res) => {
  try {
    const roomId = req.params.id;

    // Fetch the room by ID from the database
    const room = await productModel.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Update room status
    room.status = req.body.status; // Assuming you send the new status in the request body

    // Save the updated room to the database
    await room.save();

    res.status(200).json(room);
  } catch (error) {
    // Handle errors
    console.error("Error updating room:", error);
    res.status(500).json({ error: "Failed to update room" });
  }
});

//post customer data to data base after booking history purpose used in (AllProductsec.js)
app.post("/app/customers-send", async (req, res) => {
  try {
    const customer = new customerModel(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//admin panel booked section
//get all booking details after  booking confirm in booked section in frontend and in source code(Booked.js)
app.get("/app/all-bookings", async (req, res) => {
  try {
    const bookings = await bookingModel.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete booking in booked page in frontend and in soucecode (Booked.js)

app.delete("/app/delete-booking/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBooking = await bookingModel.findByIdAndDelete(id);
    res.json({ message: "Booking deleted successfully", deletedBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//in cutomer history page it use and in souce code(CustomerHistory.js)
//delete
app.delete("/app/customers-delete/:customerId", async (req, res) => {
  try {
    const customerId = req.params.customerId;

    // Find the customer by ID and delete it
    const deletedCustomer = await customerModel.findByIdAndDelete(customerId);

    if (!deletedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//after booking in booking page a another coolection created for storing all customer details for long term to get these deatails it use(CustomerHistory.js)
// GET API to fetch all customers
app.get("/app/customers-get", async (req, res) => {
  try {
    const customers = await customerModel.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3001, (req, res) => {
  console.log("server running on 3001 port");
});
