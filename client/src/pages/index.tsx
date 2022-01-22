import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import createNewRoom from "../api/createNewRoom";
import InputForm from "../components/InputForm";

const Home: NextPage = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const joinRoomHandler = (str: string) => {
		router.push(`/${str}`);
	};

	const createNewRoomHandler = async (str: string) => {
		try {
			setLoading(true);
			const roomID = await createNewRoom(str);
			router.push(`/${roomID}`)
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{loading ? (
				<div className="loader2">Loading...</div>
			) : (
				<div className="flex flex-col gap-16">
					<InputForm
						label="Video ID"
						buttonText="Create Room"
						placeholder="Paste link or ID"
						onSubmit={createNewRoomHandler}
					/>
					<InputForm
						label="Room ID"
						buttonText="Join Room"
						onSubmit={joinRoomHandler}
					/>
				</div>
			)}
		</>
	);
};

export default Home;
