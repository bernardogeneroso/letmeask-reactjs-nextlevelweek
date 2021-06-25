import { memo, ReactNode } from "react";
import className from "classnames";
import { animated } from "react-spring";

import "../styles/question.scss";

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
		<animated.div
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
		</animated.div>
	);
};

export default memo(Question);
