import { useState, useEffect } from "react";
import { io } from "socket.io-client";

function useSocket(url: string) {
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const socketIo = io(url);

		setSocket(socketIo);

		function cleanup() {
			socketIo.disconnect();
		}

		return cleanup;
	}, []);

	return socket;
}

export default useSocket;
