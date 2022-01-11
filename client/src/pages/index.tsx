import type { NextPage } from "next";
import createJoinRoomHandler from "../api/createJoinRoomHandler";
import createNewRoomHandler from "../api/createNewRoomHandler";
import InputForm from "../components/InputForm";

const Home: NextPage = () => {
	return (
		<div className="flex flex-col gap-16">
			<InputForm
				label="Video ID"
				buttonText="Create Room"
				placeholder="Paste link or ID"
				createSubmit={createNewRoomHandler}
			/>
			<InputForm
				label="Room ID"
				buttonText="Join Room"
				createSubmit={createJoinRoomHandler}
			/>
		</div>
	);
};

export default Home;
