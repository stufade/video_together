import "../styles/globals.css";
import type { AppProps } from "next/app";
import ToggleTheme from "../components/ToggleTheme";
import { ThemeProvider } from "next-themes";
import { NextPage } from "next/types";

type NextPageWithLayout = NextPage & {
	containerClassName?: string;
	toggleThemeClassName?: string;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const containerClassName = Component.containerClassName;
	const toggleThemeClassName = Component.toggleThemeClassName;

	return (
		<ThemeProvider attribute="class">
			<div
				className={`${
					containerClassName || "grid"
				} h-screen dark:bg-dark dark:text-white place-items-center relative`}
			>
				<ToggleTheme className={`absolute right-10 top-10 h-7 w-7 ${toggleThemeClassName || ""}`} />
				<Component {...pageProps} />
			</div>
		</ThemeProvider>
	);
}

export default MyApp;
