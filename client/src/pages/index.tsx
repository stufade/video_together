import type { NextPage } from "next";
import createNewRoomHandler from "../api/createNewRoomHandler";
import InputForm from "../components/InputForm";

const Home: NextPage = () => {
	return (
		<div className="flex flex-col gap-14">
			<InputForm
				label="Video ID"
				buttonText="Generate Room"
				createSubmit={createNewRoomHandler}
			/>
			{/* <InputForm
				label="Room ID"
				buttonText="Join Room"
				onSubmit={() => undefined}
			/> */}
		</div>
	);
};

export default Home;
