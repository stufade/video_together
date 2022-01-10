import { ChangeEvent, useState } from "react";
import Button from "./Button";

interface InputFormProps {
	label: string;
	buttonText: string;
	createSubmit: (str: string) => () => void;
}

const InputForm: React.FC<InputFormProps> = ({
	label,
	buttonText,
	createSubmit,
}) => {
	const [text, setText] = useState("");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	return (
		<div className="flex">
			<div
				className="
                    relative flex items-center mr-5
                    after:content-[''] after:h-[3px] after:absolute after:left-0 after:right-0 after:-bottom-0 after:gradient
            	"
			>
				<label className="block text-lg font-bold absolute left-1 bottom-[120%]">
					{label}
				</label>
				<input
					className="block text-2xl px-2 py-1"
					onChange={handleChange}
					value={text}
				/>
			</div>
			<Button className="flex-1" onClick={createSubmit(text)}>{buttonText}</Button>
		</div>
	);
};

export default InputForm;
