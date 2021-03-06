import styled from "styled-components";

export const Button = styled.button`
	height: 5rem;
	border-radius: 0.8rem;
	font-weight: 500;
	background-color: #835afd;
	color: #fff;
	padding: 0 3.2rem;

	display: flex;
	justify-content: center;
	align-items: center;

	cursor: pointer;
	border: 0;

	transition: filter 0.2s;

	img {
		margin-right: 0.8rem;
	}

	svg {
		margin-right: 0.8rem;
	}

	&:not(:disabled):hover {
		filter: brightness(0.9);
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	&.outlined {
		background: ${(props) => props.theme.colors.background};
		border: 1px solid #835afd;
		color: #835afd;
	}
`;
