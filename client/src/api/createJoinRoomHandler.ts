import { useRouter } from "next/router";

const createJoinRoomHandler = (roomID: string) => {
	const router = useRouter();

	return () => {
        router.push(`/${roomID}`);
    }
};

export default createJoinRoomHandler;
