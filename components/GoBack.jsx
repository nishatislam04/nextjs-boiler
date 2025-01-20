import Button from "./Button";
import BackSvg from "@/svg/Back";

export default function GoBack() {
	return (
		<Button
			type="button"
			btnClasses="absolute top-0 right-0 me-2 mb-2"
			padding="px-5 py-2"
			bgColor="gray">
			<BackSvg />
			go back
		</Button>
	);
}
