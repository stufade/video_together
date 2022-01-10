import { Request, Response, NextFunction } from "express";

const errorHandler = (
	error: Error & { statusCode: number },
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	console.log(error);

	res.status(error.statusCode || 500).json({ error: error.message });
};

export default errorHandler;
