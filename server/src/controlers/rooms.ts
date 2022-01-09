import { Request, Response } from "express";
import crypto from "crypto";
import { redisClient } from "../index";

export const getVideoID = async (
	req: Request<{}, {}, { roomID: string }>,
	res: Response
) => {
	const { roomID } = req.body;
	const videoID = await redisClient.get(roomID);

	res.json({videoID});
};

export const createRoom = async (
	req: Request<{}, {}, { videoID: string }>,
	res: Response
) => {
	const { videoID } = req.body;
	const roomID = crypto.randomBytes(6).toString("hex");
	await redisClient.set(roomID, videoID);

	res.json({ roomID });
};
