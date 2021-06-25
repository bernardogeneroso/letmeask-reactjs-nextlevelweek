import { memo, ReactNode } from "react";
import className from "classnames";

import { Container } from "./styles";

interface QuestionProps {
	question: {
		content: string;
		author: {
			name: string;
			avatar: string;
		};
		isAnswered?: boolean;
		isHighlighted?: boolean;
	};
	children?: ReactNode;
	style: Record<string, unknown>;
}

const Question = ({
	question: {
		content,
		author: { name, avatar },
		isAnswered = false,
		isHighlighted = false,
	},

	children,
	style,
}: QuestionProps) => {
	return (
		<Container
			style={style}
			className={className(
				"question",
				{ answered: isAnswered },
				{ highlighted: isHighlighted && !isAnswered }
			)}
		>
			<p>{content}</p>
			<footer>
				<div className="user-info">
					<img src={avatar} alt={name} />
					<span>{name}</span>
				</div>
				<div>{children}</div>
			</footer>
		</Container>
	);
};

export default memo(Question);
