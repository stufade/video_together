import { Request, Response } from "express";
import crypto from "crypto";
import { redisClient } from "../index";
import NotFound from "../errors/NotFound";

export const getVideoID = async (
	req: Request<{}, {}, { roomID: string }>,
	res: Response
) => {
	const { roomID } = req.body;
	try {
		const videoID = await redisClient.get(roomID);

		if (!videoID) {
			throw new Error;
		}

		res.json({ videoID });
	} catch {
		throw new NotFound("No room with this ID");
	}
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
