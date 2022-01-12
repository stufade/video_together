import React from 'react'

interface MessageProps {
    userIsSender: boolean;
}

const Message: React.FC<MessageProps> = ({ children, userIsSender }) => {
    return (
        <div className={`
            rounded-lg text-white px-2 py-[2px] text-lg rounded-bl-none bg-violet-400 dark:bg-transparent border-violet-400 border-2
            ${userIsSender ? "self-end rounded-bl-lg rounded-br-none bg-cyan-400 border-cyan-400" : ""}
        `}>
            {children}
        </div>
    )
}

export default Message
