import Image from "next/image";

interface HideChatProps {
	onClick: () => void;
	showChat: boolean;
}

const HideChatHorizontal: React.FC<HideChatProps> = ({ onClick, showChat }) => {
	return (
		<div
			className="w-full grid lg:hidden place-items-center border-b-2 border-cyan-400 pb-2 cursor-pointer"
			onClick={onClick}
		>
			<div
				className={`transform w-[26px] h-[26px] rotate-90 ${showChat ? "rotate-[270deg]" : ""}`}
			>
				<Image src="/arrow.svg" alt="arrow" width={26} height={26} />
			</div>
		</div>
	);
};

export default HideChatHorizontal;
