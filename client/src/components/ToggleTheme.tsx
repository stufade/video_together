import Image from "next/image";
import { useTheme } from "next-themes";

interface ToggleThemeProps {
	className?: string;
}

const ToggleTheme: React.FC<ToggleThemeProps> = ({ className }) => {
	const { theme, setTheme } = useTheme();

	return (
		<div className={`${className}`}>
			<button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
				<Image
					src={`/${theme === "light" ? "moon.svg" : "sun.svg"}`}
					layout="fill"
					alt="moon"
				/>
			</button>
		</div>
	);
};

export default ToggleTheme;
