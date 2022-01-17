import React, { Ref } from "react";

interface MessageProps {
	userIsSender: boolean;
}

const Message = React.forwardRef(
	(
		{ children, userIsSender }: MessageProps & { children: React.ReactNode },
		ref: Ref<HTMLDivElement>
	) => {
		return (
			<div
				ref={ref}
				className={`
                    rounded-lg text-white px-2 py-[2px] rounded-bl-none  dark:bg-transparent
                    border-2 max-w-[75%] break-all font-['Roboto'] text-xl
                    ${
						userIsSender
							? "self-end rounded-bl-lg rounded-br-none bg-cyan-400 border-cyan-400"
							: "bg-violet-400 border-violet-400 "
				    }
        `}
			>
				{children}
			</div>
		);
	}
);

export default Message;
