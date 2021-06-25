import { ButtonHTMLAttributes } from "react";

import { Button as Bt } from "./styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	isOutlined?: boolean;
};

export const Button = ({ isOutlined = false, ...props }: ButtonProps) => {
	return <Bt className={`button ${isOutlined ? "outlined" : ""}`} {...props} />;
};

export default Button;
