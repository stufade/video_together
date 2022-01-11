import { GetServerSideProps, NextPage } from "next";
import Player from "../components/Player";
import axios from "axios";

interface VideoPageProps {
	videoID: string;
}

const VideoPage: NextPage<VideoPageProps> = ({ videoID }) => {
	return (
		<div>
			<Player videoID={videoID} />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const {
		params: { roomID },
	} = context;

	try {
		const {
			data: { videoID },
		} = await axios.get<{ videoID: string }>(
			`http://localhost:5000/api/rooms/${roomID}`,
			{ data: { roomID } }
		);

		return { props: { videoID } };
	} catch (e) {
		console.log(e);

		return {
			notFound: true
		};
	}
};

export default VideoPage;
