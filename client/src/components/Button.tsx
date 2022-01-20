interface ButtonProps {
	onClick?: () => void;
	className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
	return (
		<div
			className={`
				${className || ""}
				relative bg-white rounded-full dark:gradient grid place-items-center
				after:content-[''] after:absolute after:-z-10 after:rounded-full after:left-[-2px] after:right-[-2px] after:top-[-2px] after:bottom-[-2px] after:gradient
				transition-shadow duration-500 hover:shadow-violet-600/25 hover:shadow-xl
			`}
		>
			<button
				className="
            		w-full font-bold tracking-wider dark:bg-none gradient bg-clip-text text-transparent dark:text-white dark:bg-clip-border
            		text-xl py-2 px-7 rounded-full transform transition-all duration-500
        		"
				onClick={onClick ? onClick : null}
			>
				{children}
			</button>
		</div>
	);
};

export default Button;
