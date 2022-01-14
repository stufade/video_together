import { GetServerSideProps } from "next";
import type { NextPageWithLayout } from "../types/page";
import Player from "../components/Player";
import axios from "axios";
import Chat from "../components/Chat";
import Button from "../components/Button";
import ToggleTheme from "../components/ToggleTheme";
import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import useRoomID from "../hooks/useRoomID";

interface VideoPageProps {
	videoID: string;
}

const VideoPage: NextPageWithLayout<VideoPageProps> = ({ videoID }) => {
	const [buttonText, setButtonText] = useState("Copy Link")

	const socket = useSocket("http://localhost:5000");
	const roomID = useRoomID();

	useEffect(() => {
		if (!socket) return;
		socket.emit("newUser", roomID);
	}, [socket]);

	const handleCopyLink = () => {
		navigator.clipboard.writeText(window.location.href);
		setButtonText("Copied!");
		setTimeout(() => setButtonText("Copy Link"), 3500);
	}

	return (
		<div className="flex flex-col lg:flex-row gap-5 sm:gap-10">
			<Player socket={socket} videoID={videoID} />
			<div className="relative mx-2 md:mx-0">
				<Chat socket={socket} />
				<div className="absolute w-full mt-4 flex flex-col gap-5">
					<Button className="flex-1" onClick={handleCopyLink}>{buttonText}</Button>
					<ToggleTheme className="md:hidden self-center aspect-[1] w-[44px] relative" />
				</div>
			</div>
		</div>
	);
};

VideoPage.containerClassName = "block md:grid";
VideoPage.toggleThemeClassName = "hidden md:block";

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
