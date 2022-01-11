import { useRouter } from "next/router";
import { FormEvent } from "react";

const createJoinRoomHandler = (roomID: string) => {
	const router = useRouter();

	return (e: FormEvent) => {
		e.preventDefault();

		router.push(`/${roomID}`);
	};
};

export default createJoinRoomHandler;
