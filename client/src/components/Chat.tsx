import { Socket } from "socket.io-client";
import Image from "next/image";
import Message from "./Message";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useRoomID from "../hooks/useRoomID";

interface ChatProps {
	socket: Socket;
}

interface MessageType {
	text: string;
	userIsSender: boolean;
}

const Chat: React.FC<ChatProps> = ({ socket }) => {
	const roomID = useRoomID();
	const [text, setText] = useState("");
	const [messages, setMessages] = useState<MessageType[]>([]);

	useEffect(() => {
		if (!socket) return;

		socket.on("message", (text: string, userIsSender: boolean) => {
			setMessages(([...messages, { text, userIsSender }]));
		});
	}, [socket, messages]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const hanldeSubmitMessage = (e: FormEvent) => {
		e.preventDefault();

		socket.emit("message", roomID, text);
        setText("");
	};

	return (
		<div className="flex flex-col min-w-[350px] min-h-[350px] max-h-[400px] max-w-full border-2 border-gray-300 dark:border-gray-700">
			<div className="flex flex-col gap-3 items-start flex-1 bg-gray-50 dark:bg-[#212121] p-3 overflow-y-auto">
				{messages.map(({ text, userIsSender }, index) => (
					<Message userIsSender={userIsSender} key={index}>
						{text}
					</Message>
				))}
			</div>
			<form
				onSubmit={hanldeSubmitMessage}
				className="my-2 mx-3 relative flex bg-white dark:bg-dark"
			>
				<input
					onChange={handleChange}
                    value={text}
					className="flex-1 pl-2 pr-10 py-1 text-xl border-b-2 border-b-indigo-300 bg-white dark:bg-dark"
				/>
				<button className="h-full flex items-center absolute right-2">
					<Image src="/send.svg" width={24} height={24} />
				</button>
			</form>
		</div>
	);
};

export default Chat;
