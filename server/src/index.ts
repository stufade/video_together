import "express-async-errors";
import { Server } from "socket.io";
import express from "express";
import { createClient } from "redis";
import cors from "cors";
import roomsRouter from "./routes/rooms";
import errorHandler from "./middlewares/error-handler";

export const redisClient = createClient();
const main = async () => {
	redisClient.on("error", (e) => console.log("Redis Client Error", e));
	await redisClient.connect();

	const app = express();
	const server = app.listen(5000, () => console.log("listening on 5000"));
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:3000",
			methods: ["GET", "POST"],
		},
	});

	app.use(cors({ origin: "http://localhost:3000" }));
	app.use(express.json());

	app.use("/api/rooms", roomsRouter);
	app.use(errorHandler);

	io.on("connection", (socket) => {
		console.log("a user connected");

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
