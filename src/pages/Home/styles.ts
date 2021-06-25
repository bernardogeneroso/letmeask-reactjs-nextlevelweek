import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	align-items: stretch;
	height: 100vh;

	aside {
		flex: 7;
		background-color: ${(props) => props.theme.colors.home.background};
		color: #fff;

		display: flex;
		flex-direction: column;
		justify-content: center;

		padding: 12rem 8rem;

		img {
			max-width: 320px;
		}

		strong {
			font: 700 3.6rem "Poppins", sans-serif;
			line-height: 4.2rem;
			margin-top: 1.6rem;
		}

		p {
			font-size: 2.4rem;
			line-height: 3.2rem;
			margin-top: 1.6rem;
			color: #f8f8f8;
		}
	}

	main {
		flex: 8;

		padding: 0 3.2rem;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		div.main-content {
			display: flex;
			flex-direction: column;
			width: 100%;
			max-width: 320px;
			align-items: stretch;
			text-align: center;

			> img {
				align-self: center;
			}

			h2 {
				font-size: 2.4rem;
				margin: 6.4rem 0 2.4rem;
				font-family: "Poppins", sans-serif;
				color: ${(props) => props.theme.colors.text.title};
			}

			button.create-room {
				height: 5rem;
				border-radius: 0.8rem;
				font-weight: 500;
				background: #ea4335;
				color: #fff;
				margin-top: 3.2rem;

				display: flex;
				justify-content: center;
				align-items: center;

				cursor: pointer;
				border: 0;

				transition: filter 0.2s;

				img {
					margin-right: 0.8rem;
				}

				&:hover {
					filter: brightness(0.9);
				}
			}

			div.separator {
				font-size: 1.4rem;
				color: #a8a8b3;

				margin: 3.2rem 0;
				display: flex;
				align-items: center;

				&::before {
					content: "";
					flex: 1;
					height: 0.1rem;
					background: #a8a8b3;
					margin-right: 1.6rem;
				}

				&::after {
					content: "";
					flex: 1;
					height: 0.1rem;
					background: #a8a8b3;
					margin-left: 1.6rem;
				}
			}

			form {
				input {
					height: 5rem;
					border-radius: 0.8rem;
					padding: 0 1.6rem;
					background-color: ${(props) => props.theme.colors.background};
					color: ${(props) => props.theme.colors.text.default};
					border: 0.1rem solid #a8a8b3;
				}

				p {
					font-size: 1.4rem;
					color: #db493c;
					margin-top: 0.6rem;
					text-align: start;
				}

				button {
					margin-top: 1.6rem;
				}

				button,
				input {
					width: 100%;
				}
			}

			p {
				font-size: 1.4rem;
				color: #737380;
				margin-top: 1.6rem;

				a {
					color: #e559f9;
				}
			}
		}
	}

	div.container-theme {
		position: absolute;
		right: 16px;
		top: 16px;
		width: 48px;
		height: 48px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;

		background-color: #835afd;
		border-radius: 0.8rem;

		transition: filter 0.2s;

		&:hover {
			filter: brightness(0.9);
		}
	}
`;
