import YouTube from "react-youtube";
import socket from "../constants/socket";
import { useEffect, useRef } from "react";

interface PlayerProps {
	videoID: string;
}

const Player: React.FC<PlayerProps> = ({ videoID }) => {
	let roomID: string;
	const playerRef = useRef<YouTube>(null);

	useEffect(() => {
		roomID = window.location.pathname.slice(1);
		const player = playerRef?.current.getInternalPlayer();

		socket.emit("newUser", roomID);

		socket.on("pause", (time: number) => {
			player.seekTo(time, true);
			player.pauseVideo();
		});

		socket.on("play", () => {
			player.playVideo();
			console.log("play", player);
		});

		socket.on("start", (time: number) => {
			player.seekTo(time, true);
			player.playVideo();
		});
	}, []);

	const handlePauseVideo = async () => {
		const currentTime = await playerRef.current
			.getInternalPlayer()
			.getCurrentTime();
		socket.emit("pause", currentTime, roomID);
	};

	const handlePlayVideo = () => {
		socket.emit("play", roomID);
	};

	let lastData = -2;

	const hadnleStateChange = async ({ data }: { data: number }) => {
		console.log(data);
		if (data === -1 || (lastData === 2 && data === 1)) {
			const currentTime = await playerRef.current
				.getInternalPlayer()
				.getCurrentTime();
			socket.emit("start", currentTime, roomID);
		}
		lastData = data;
	};

	// 640 / 360
	return (
		<div>
			<YouTube
				videoId={videoID}
				opts={{
					host: "https://www.youtube-nocookie.com",
				}}
				onPause={handlePauseVideo}
				onPlay={handlePlayVideo}
				onStateChange={hadnleStateChange}
				onReady={(e) => e.target.playVideo}
				className="w-full h-full"
				containerClassName="w-[700px] aspect-video"
				ref={playerRef}
			/>
		</div>
	);
};

export default Player;
