import axios from "axios";

const createNewRoom= async (videoID: string) => {
	const {
		data: { roomID },
	} = await axios.post<{ roomID: string }>("/api/rooms", { videoID });

	return roomID;
};

export default createNewRoom;
