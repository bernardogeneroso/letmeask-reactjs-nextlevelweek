import styled from "styled-components";

export const Button = styled.button`
	height: 4rem;
	border-radius: 0.8rem;
	overflow: hidden;

	background: ${(props) => props.theme.colors.background};
	color: ${(props) => props.theme.colors.text.default};
	border: 0.1rem solid #835afd;
	cursor: pointer;

	display: flex;

	div {
		height: 100%;
		background-color: #835afd;
		padding: 0 1.2rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	span {
		display: block;
		align-self: center;
		flex: 1;
		padding: 0 1.6rem 0 1.2rem;
		font-size: 1.4rem;
		font-weight: 500;
	}
`;
