import type { NextPage } from "next";

declare module "next" {
	export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
		containerClassName?: string;
	};
}
