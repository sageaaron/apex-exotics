import imageKit from "../configs/imageKit.js";
import User from "../models/User.js";
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";
import fs from "fs";

// Change User Role
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: "Now You Can List Cars" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: true, message: error.message });
  }
};

// List Car
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFiles = req.files;

    // Upload All Images To ImageKit
    const uploadPromises = imageFiles.map(async (imageFile) => {
      const response = await imageKit.files.upload({
        file: fs.createReadStream(imageFile.path),
        fileName: imageFile.originalname,
        folder: "/cars",
      });

      return response.url;
    });

    const images = await Promise.all(uploadPromises);

    // Save Car To Database
    await Car.create({ ...car, owner: _id, images });

    res.json({ success: true, message: "Car Successfully Added" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// List Owner Cars
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Car Availability
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    // Check if car belongs to user
    if (car.owner.toString() !== _id.toString()) {
      return res.json({
        success: false,
        message: "You Are Not Authorized To Perform This Action",
      });
    }

    car.isAvailable = !car.isAvailable;
    await car.save();

    res.json({
      success: false,
      message: `Car Is Now ${car.isAvailable ? "Available" : "Unavailable"}`,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Delete Car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    // Check if car belongs to user
    if (car.owner.toString() !== _id.toString()) {
      return res.json({
        success: false,
        message: "You Are Not Authorized To Perform This Action",
      });
    }

    car.owner = null;
    car.isAvailable = false;

    await car.save();

    res.json({
      success: true,
      message: "This Car Has Been Removed Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get Dashboard Data
export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner") {
      return res.json({
        success: false,
        message: "You Are Not Authorized To Perform This Action",
      });
    }

    const cars = await Car.find({ owner: _id });
    const bookings = await Booking.find({ owner: _id })
      .populate("car")
      .sort({ createdAt: -1 });

    const pendingBookings = await Booking.find({
      owner: _id,
      status: "pending",
    });
    const completedBookings = await Booking.find({
      owner: _id,
      status: "confirmed",
    });

    // Calculate Revenue From Confirmed Bookings
    const monthlyRevenue = bookings
      .slice()
      .filter((booking) => booking.status === "confirmed")
      .reduce((acc, booking) => acc + booking.price, 0);

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Update User Image
export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;
    const imageFile = req.file;

    const response = await imageKit.files.upload({
      file: fs.createReadStream(imageFile.path),
      fileName: imageFile.originalname,
      folder: "/users",
    });

    await User.findByIdAndUpdate(_id, { image: response.url });

    res.json({ success: true, message: "Profile Image Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
