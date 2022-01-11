import Link from "next/link";

export default function Custom404() {
	return (
		<div className="text-center">
			<h1 className="text-5xl mb-10">Room is not found</h1>
			<Link href="/">
				<a className="text-3xl font-light underline underline-offset-4">
					Go Back
				</a>
			</Link>
		</div>
	);
}
