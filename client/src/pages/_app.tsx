import "../styles/globals.css";
import type { AppProps } from "next/app";
import ToggleTheme from "../components/ToggleTheme";
import { ThemeProvider } from "next-themes";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next/types";

type NextPageWithLayout = NextPage & {
	containerClassName?: string;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const containerClassName = Component.containerClassName;

	return (
		<ThemeProvider attribute="class">
			<div
				className={`${
					containerClassName
						? containerClassName
						: "grid"
				} h-screen dark:bg-dark dark:text-white place-items-center relative`}
			>
				<ToggleTheme />
				<Component {...pageProps} />
			</div>
		</ThemeProvider>
	);
}

export default MyApp;
