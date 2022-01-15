import Image from "next/image";

interface HideChatProps {
	onClick: () => void;
	showChat: boolean;
}

const HideChatVertical: React.FC<HideChatProps> = ({ onClick, showChat }) => {
	return (
		<div
			className="h-1/2 hidden lg:grid place-items-center border-l-2 border-cyan-400 pl-2 cursor-pointer"
			onClick={onClick}
		>
			<Image
				src="/arrow.svg"
				alt="arrow"
				width={26}
				height={26}
				className={!showChat ? "transform rotate-180" : ""}
			/>
		</div>
	);
};

export default HideChatVertical;
