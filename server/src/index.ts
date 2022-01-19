import "express-async-errors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import express from "express";
import { createClient } from "redis";
import cors from "cors";
import roomsRouter from "./routes/rooms";
import errorHandler from "./middlewares/error-handler";

dotenv.config();
export const redisClient = createClient({
	url: process.env.REDIS_URL,
	password: process.env.REDIS_PASSWORD,
});
const PORT = process.env.PORT || 5000;
const main = async () => {
	redisClient.on("error", (e) => console.log("Redis Client Error", e));
	await redisClient.connect();

	const app = express();
	const server = app.listen(PORT, () => console.log(`listening on ${PORT}`));
	const io = new Server(server, {
		cors: {
			origin: process.env.CLIENT_URL,
			methods: ["GET", "POST"],
		},
	});

	app.use(cors({ origin: process.env.CLIENT_URL }));
	app.use(express.json());

	app.use("/api/rooms", roomsRouter);
	app.use(errorHandler);

	io.on("connection", (socket) => {
		socket.on("start", (time: number, roomID: string) => {
			socket.to(roomID).emit("start", time);
		});

		socket.on("pause", (time: number, roomID: string) => {
			socket.to(roomID).emit("pause", time);
		});

		socket.on("play", (roomID: string) => {
			socket.to(roomID).emit("play");
		});

		socket.on("newUser", (roomID: string) => {
			socket.join(roomID);
		});

		socket.on("message", (roomId: string, text: string) => {
			socket.emit("message", text, true);
			socket.to(roomId).emit("message", text, false);
		});

		socket.on("disconnecting", () => {
			let roomID = "";
			for (let id of socket.rooms) {
				if (id !== socket.id) {
					roomID = id;
				}
			}
			if (io.sockets.adapter.rooms.get(roomID)?.size === 1) {
				redisClient.expire(roomID, 60 * 5);
			}
		});
	});
};

main();
