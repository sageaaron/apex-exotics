import express from "express";
import { protect } from "../middleware/auth.js";
import {
  addCar,
  changeRoleToOwner,
  deleteCar,
  getDashboardData,
  getOwnerCars,
  toggleCarAvailability,
  updateUserImage,
} from "../controllers/ownerController.js";
import upload from "../middleware/multer.js";
import imageKit from "../configs/imageKit.js";

const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changeRoleToOwner);
ownerRouter.post("/add-car", protect, addCar);
ownerRouter.get("/cars", protect, getOwnerCars);
ownerRouter.post("/toggle-car", protect, toggleCarAvailability);
ownerRouter.post("/delete-car", protect, deleteCar);
ownerRouter.get("/dashboard", protect, getDashboardData);
ownerRouter.get("/imagekit-auth", protect, (req, res) => {
  try {
    const result = imageKit.getAuthenticationParameters();
    res.json(result);
  } catch (error) {
    console.error("ImageKit auth error:", error.message);
    res.status(500).json({ error: error.message });
  }
});
ownerRouter.post(
  "/update-image",
  upload.single("image"),
  protect,
  updateUserImage,
);

export default ownerRouter;
