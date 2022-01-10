import Image from "next/image";
import { useTheme } from "next-themes";

const ToggleTheme: React.FC = () => {
	const { theme, setTheme } = useTheme();

	return (
		<div className="absolute right-10 top-10 h-7 w-7">
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
