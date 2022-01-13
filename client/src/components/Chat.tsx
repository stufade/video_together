import { Socket } from "socket.io-client";
import Image from "next/image";
import Message from "./Message";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
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
	const lastMessageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!socket) return;

		socket.on("message", (text: string, userIsSender: boolean) => {
			setMessages((mes) => ([...mes, { text, userIsSender }]));
		});
	}, [socket]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const hanldeSubmitMessage = (e: FormEvent) => {
		e.preventDefault();

		if (!text) return;

		socket.emit("message", roomID, text);
        setText("");
	};

	if (lastMessageRef.current) {
		lastMessageRef.current.scrollIntoView();
	}

	return (
		<div className="flex flex-col min-w-[350px] h-[393.75px] max-w-full border-2 border-gray-300 dark:border-gray-700">
			<div className="flex flex-col overflow-auto withoutScrollbar gap-3 items-start flex-1 bg-gray-50 dark:bg-[#212121] p-3">
				{messages.map(({ text, userIsSender }, index) => (
					<Message userIsSender={userIsSender} key={index} ref={index === messages.length - 1 ? lastMessageRef : null}>
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
					className="flex-1 font-['Roboto'] pl-2 pr-10 py-1 text-xl border-b-2 border-b-indigo-300 bg-white dark:bg-dark"
				/>
				<button className="h-full flex items-center absolute right-2">
					<Image src="/send.svg" width={24} height={24} />
				</button>
			</form>
		</div>
	);
};

export default Chat;
