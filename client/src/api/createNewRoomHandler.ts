import { useRouter } from "next/router";
import axios from "axios";

const createNewRoomHandler = (videoID: string) => {
	const router = useRouter();
	return async () => {
		try {
			const {
				data: { roomID },
			} = await axios.post<{ roomID: string }>(
				"http://localhost:5000/api/rooms",
				{ videoID }
			);

			router.push(`/${roomID}`);
		} catch (error) {
			console.log(error);
		}
	};
};

export default createNewRoomHandler;
