import express from "express";
import {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/getusers", getAllUsers);
router.post("/addusers", addUser);
router.put("/updateusers", updateUser);
router.delete("/deleteusers/:id", deleteUser);

export default router;
