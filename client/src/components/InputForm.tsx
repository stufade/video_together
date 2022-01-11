import { ChangeEvent, FormEvent, useState } from "react";
import Button from "./Button";

interface InputFormProps {
	label: string;
	buttonText: string;
	createSubmit: (str: string) => (e: FormEvent) => void;
	placeholder?: string;
}

const InputForm: React.FC<InputFormProps> = ({
	label,
	buttonText,
	createSubmit,
	placeholder
}) => {
	const [text, setText] = useState("");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		let newText = value
		if (value.includes("youtube") && value.includes("/watch?v=")) {
			newText = value.substring(value.indexOf("/watch?v=") + 9, value.indexOf("/watch?v=") + 20);
			console.log(newText);
		}
		setText(newText);
	};

	return (
		<form onSubmit={createSubmit(text)} className="flex gap-5 flex-col sm:flex-row">
			<div
				className="
                    relative flex items-center w-80
                    after:content-[''] after:h-[3px] after:absolute after:left-0 after:right-0 after:-bottom-0 after:gradient
            	"
			>
				<label className="block text-lg font-bold absolute left-2 bottom-[120%]">
					{label}
				</label>
				<input
					className="block text-2xl px-2 py-1 w-full dark:bg-[#333]"
					onChange={handleChange}
					value={text}
					placeholder={placeholder}
				/>
			</div>
			<Button className="flex-1">{buttonText}</Button>
		</form>
	);
};

export default InputForm;
