import { useEffect, useState } from "react"

const useRoomID = () => {
    const [roomID, setRoomID] = useState("");

    useEffect(() => {
		setRoomID(window.location.pathname.slice(1));
    })

    return roomID;
}

export default useRoomID;