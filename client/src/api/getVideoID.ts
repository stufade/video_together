import axios from "axios";

const getVideoID = async (roomID: string) => {
	const {
		data: { videoID },
	} = await axios.get<{ videoID: string }>(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms/${roomID}`
	);

    return videoID;
};

export default getVideoID;
