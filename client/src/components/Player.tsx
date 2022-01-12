import YouTube from "react-youtube";
import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import useRoomID from "../hooks/useRoomID";

interface PlayerProps {
	videoID: string;
	socket: Socket;
}

const Player: React.FC<PlayerProps> = ({ videoID, socket }) => {
	const roomID = useRoomID();	
	const playerRef = useRef<YouTube>(null);

	useEffect(() => {
		if (!socket) return;
		
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
	}, [socket]);

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

	return (
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
			containerClassName="h-[400px] aspect-video max-w-full"
			ref={playerRef}
		/>
	);
};

export default Player;
