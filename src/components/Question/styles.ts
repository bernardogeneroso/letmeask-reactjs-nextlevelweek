import styled from "styled-components";
import { animated } from "react-spring";

export const Container = styled(animated.div)`
	background-color: ${(props) => props.theme.colors.question.background};
	border-radius: 0.8rem;
	box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.04);
	padding: 2.4rem;

	& + div.question {
		margin-top: 0.8rem;
	}

	&.highlighted {
		background-color: ${(props) =>
			props.theme.colors.question.highlighted.background};
		border: 0.1rem solid #835afd;

		footer {
			div.user-info span {
				color: ${(props) => props.theme.colors.question.highlighted.span};
			}

			&:last-child {
				button.highlighted-question {
					svg path {
						stroke: #835afd;
					}
				}
			}
		}
	}

	&.answered {
		background-color: ${(props) =>
			props.theme.colors.question.answered.background};

		footer {
			&:last-child {
				button.answered-question {
					svg path,
					svg circle {
						stroke: #835afd;
					}
				}
			}
		}
	}

	p {
		color: ${(props) => props.theme.colors.question.p};
	}

	footer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 2.4rem;

		div.user-info {
			display: flex;
			align-items: center;

			img {
				width: 32px;
				height: 32px;
				border-radius: 30px;
			}

			span {
				margin-left: 0.8rem;
				color: ${(props) => props.theme.colors.question.span};
				font-size: 1.4rem;
			}
		}

		> div {
			display: flex;
			gap: 1.6rem;
		}

		button {
			border: 0;
			background-color: transparent;
			cursor: pointer;

			transition: filter 0.2s;

			&.like-button {
				display: flex;
				align-items: flex-end;
				color: ${(props) => props.theme.colors.question.button.text};
				gap: 0.8rem;

				&.liked {
					color: #835afd;

					svg path {
						stroke: #835afd;
					}
				}
			}

			&:hover {
				filter: brightness(0.7);
			}
		}
	}
`;
