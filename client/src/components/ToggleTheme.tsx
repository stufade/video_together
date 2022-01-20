import Image from "next/image";
import { useTheme } from "next-themes";

interface ToggleThemeProps {
	className?: string;
}

const ToggleTheme: React.FC<ToggleThemeProps> = ({ className }) => {
	const { theme, setTheme } = useTheme();

	return (
		<div className={`${className || ""}`}>
			<button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
				<Image
					src={`/${theme === "dark" ? "sun.svg" : "moon.svg"}`}
					layout="fill"
					alt="Toggle theme"
				/>
			</button>
		</div>
	);
};

export default ToggleTheme;
