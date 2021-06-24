import React, { memo, ReactNode } from "react";

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
}

const Question = ({
	question: {
		content,
		author: { name, avatar },
	},
	children,
}: QuestionProps) => {
	return (
		<div className="question">
			<p>{content}</p>
			<footer>
				<div className="user-info">
					<img src={avatar} alt={name} />
					<span>{name}</span>
				</div>
				<div>{children}</div>
			</footer>
		</div>
	);
};

export default memo(Question);
