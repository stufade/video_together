interface ButtonProps {
	onClick: () => void;
	className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
	return (
		<button
			className={`${className} 
            	text-white gradient 
            	text-xl py-2 px-7 rounded-full transform transition-all duration-500 hover:scale-[0.97]
        	`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
