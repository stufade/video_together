import express from "express";
import { createRoom, getVideoID } from "../controlers/rooms";

const router = express.Router();

router.route("/:roomID").get(getVideoID);
router.route("/").post(createRoom);

export default router;