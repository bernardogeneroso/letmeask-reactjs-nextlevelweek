import styled from "styled-components";

export const Container = styled.div`
	height: 100vh;

	header {
		padding: 2.4rem;
		border-bottom: 0.1rem solid #e2e2e2;

		div.content {
			max-width: 1120px;
			margin: 0 auto;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			a img {
				max-height: 4.5rem;
			}

			div {
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 1.6rem;

				button {
					height: 4rem;
				}

				.theme {
					cursor: pointer;
				}
			}
		}
	}

	main {
		max-width: 800px;
		margin: 0 auto;

		div.room-title {
			margin: 3.2rem 0 2.4rem;
			display: flex;
			align-items: center;

			h1 {
				font-family: "Poppins", sans-serif;
				font-size: 2.4rem;
				color: ${(props) => props.theme.colors.text.default};
			}

			span {
				margin-left: 1.6rem;
				background-color: #e559f9;
				border-radius: 3rem;
				padding: 0.8rem 1.6rem;
				color: ${(props) => props.theme.colors.text.title};
				font-weight: 500;
				font-size: 1.4rem;
			}
		}

		form {
			textarea {
				width: 100%;
				min-height: 13rem;
				border: 0;
				padding: 1.6rem;
				border-radius: 0.8rem;
				background-color: ${(props) => props.theme.colors.text.textarea};
				color: ${(props) => props.theme.colors.text.default};
				box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.04);
				resize: vertical;
				outline: none;

				&:focus {
					border: 1px solid #835afd;
				}
			}

			div.form-footer {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 1.6rem;

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
						color: ${(props) => props.theme.colors.text.default};
						font-weight: 500;
						font-size: 1.4rem;
					}
				}

				> span {
					font-size: 1.4rem;
					color: ${(props) => props.theme.colors.text.p};
					font-weight: 500;

					button {
						background: transparent;
						border: 0;
						color: #835afd;
						text-decoration: underline;
						font-size: 1.4rem;
						font-weight: 500;
						cursor: pointer;
					}
				}
			}
		}

		div.question-list {
			padding-bottom: 3rem;
			margin-top: 3.2rem;
		}
	}

	div.container-modal-delete {
		background-color: rgba(0, 0, 0, 0.7);
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		overflow: auto;
		z-index: 9999;

		div.dialog {
			height: 100%;
			margin: 0 auto;
			max-width: 600px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			div.content {
				width: 100%;
				background-color: ${(props) => props.theme.colors.modal.background};
				border-radius: 0.8rem;
				padding: 6rem;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				h2 {
					color: ${(props) => props.theme.colors.modal.h2};
					font-size: 2.4rem;
					line-height: 3.4rem;
					margin-top: 2rem;
				}

				h3 {
					color: ${(props) => props.theme.colors.modal.h3};
					font-size: 1.6rem;
					line-height: 2.6rem;
					margin-top: 1rem;
					font-weight: 400;
				}

				div.action {
					display: flex;
					flex-direction: row;
					gap: 1.6rem;
					margin-top: 2rem;

					button.cancel {
						border-radius: 0.8rem;
						background-color: ${(props) =>
							props.theme.colors.modal.button.cancel.background};
						padding: 1.6rem 3.5rem;
						border: 0;
						color: ${(props) => props.theme.colors.modal.button.cancel.color};
						cursor: pointer;

						transition: filter 0.2s;

						&:hover {
							filter: brightness(0.9);
						}
					}

					button.delete {
						border-radius: 0.8rem;
						background-color: ${(props) =>
							props.theme.colors.modal.button.delete.background};
						padding: 1.6rem 3.5rem;
						border: 0;
						color: ${(props) => props.theme.colors.modal.button.delete.color};
						cursor: pointer;

						transition: filter 0.2s;

						&:hover {
							filter: brightness(0.9);
						}
					}
				}
			}
		}
	}

	div.room-close {
		height: calc(100% - 98px);
		display: flex;
		place-content: center;
		place-items: center;
	}
`;

export const ContainerLoader = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.colors.loader.background};
`;
