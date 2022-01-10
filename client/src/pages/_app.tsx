import "../styles/globals.css";
import type { AppProps } from "next/app";
import ToggleTheme from "../components/ToggleTheme";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider attribute="class">
			<div className="h-screen grid place-items-center relative">
				<ToggleTheme />
				<Component {...pageProps} />
			</div>
		</ThemeProvider>
	);
}

export default MyApp;
