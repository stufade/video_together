// @ts-ignore
import { GetServerSideProps, NextPageWithLayout } from "next";
import Player from "../components/Player";
import axios from "axios";
import Chat from "../components/Chat";
import { useEffect } from "react";
import useSocket from "../hooks/useSocket";

interface VideoPageProps {
	videoID: string;
}

const VideoPage: NextPageWithLayout<VideoPageProps> = ({ videoID }) => {
	const socket = useSocket("http://localhost:5000");

	useEffect(() => {
		if (!socket) return;
		socket.emit("newUser", window.location.pathname.slice(1));
	}, [socket]);

	return (
		<div className="flex flex-col lg:flex-row gap-5 sm:gap-10">
			<Player socket={socket} videoID={videoID} />
			<Chat socket={socket} />
		</div>
	);
};

VideoPage.containerClassName = "block md:grid";

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
			notFound: true,
		};
	}
};

export default VideoPage;
