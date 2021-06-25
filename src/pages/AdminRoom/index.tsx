import React, { useContext, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { ThemeContext } from "styled-components";
import { useTransition } from "react-spring";
import { Link, useHistory, useParams } from "react-router-dom";
import Loader from "react-loader-spinner";

import useRoom, { Question as QuestionType } from "../../hooks/useRoom";
import RoomCode from "../../components/RoomCode";
import Button from "../../components/Button";
import Question from "../../components/Question";
import { database } from "../../services/firebase";

import logoImg from "../../assets/images/logo.svg";
import deleteImg from "../../assets/images/delete.svg";
import deleteModalImg from "../../assets/images/delete-modal.svg";

import { Container, ContainerLoader } from "../Room/styles";

interface ModelDelete {
	data: QuestionType | undefined;
	active: boolean;
}

interface AdminRoomParams {
	id: string;
	switchTheme: string;
}

interface AdminRoomProps {
	switchTheme(): void;
}

const AdminRoom: React.FC<AdminRoomProps> = ({ switchTheme }) => {
	const themeContext = useContext(ThemeContext);
	const history = useHistory();
	const params = useParams<AdminRoomParams>();
	const roomId = params.id;
	const { questions, roomInfo } = useRoom(roomId);

	const [modalDelete, setModalDelete] = useState<ModelDelete>({
		data: undefined,
		active: false,
	});

	const questionsTransition = useTransition(questions, {
		keys: (question) => question.id,
		enter: { opacity: 1, transform: "scale(1)", translateY: 0 },
		leave: { opacity: 0, transform: "scale(0.6)", translateY: 400 },
		from: { opacity: 0, transform: "scale(0.6)", translateY: 400 },
	});

	const handleEndRoom = async () => {
		await database.ref(`rooms/${roomId}`).update({
			endedAt: new Date(),
		});

		history.push("/");
	};

	const handleDeleteQuestion = async (questionId?: string) => {
		if (questionId) {
			await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();

			handleToggleModalDelete();
		}
	};

	const handleCheckQuestionAsAnswered = async (
		questionId: string,
		isAnswered: boolean
	) => {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
			isAnswered: !isAnswered,
		});
	};

	const handleHighlightQuestion = async (
		questionId: string,
		isHighlighted: boolean
	) => {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
			isHighlighted: !isHighlighted,
		});
	};

	const handleToggleModalDelete = (question?: QuestionType) => {
		setModalDelete((state) => ({
			data: question,
			active: !state.active,
		}));
	};

	const handleReturnToHome = () => {
		history.push("/");
	};

	if (!roomInfo)
		return (
			<ContainerLoader>
				<Loader type="ThreeDots" color="#737380" height={100} width={100} />
			</ContainerLoader>
		);

	return (
		<Container>
			<header>
				<div className="content">
					<Link to="/">
						<img src={logoImg} alt="Letmeask" />
					</Link>

					<div>
						{!roomInfo?.endedAt && <RoomCode code={roomId} />}
						<Button
							isOutlined
							onClick={() =>
								!roomInfo?.endedAt ? handleEndRoom() : handleReturnToHome()
							}
						>
							{!roomInfo?.endedAt ? "Leave room" : "Go back"}
						</Button>
						{themeContext.title === "light" ? (
							<FiMoon
								color="#000"
								size={22}
								className="theme"
								onClick={switchTheme}
							/>
						) : (
							<FiSun
								color="#fff"
								size={22}
								className="theme"
								onClick={switchTheme}
							/>
						)}
					</div>
				</div>
			</header>

			{!roomInfo?.endedAt ? (
				<main>
					<div className="room-title">
						<h1>Room {roomInfo?.title}</h1>
						{questions.length > 0 && (
							<span>
								{`${questions.length} ${
									questions.length === 1 ? "question" : "questions"
								}`}
							</span>
						)}
					</div>

					<div className="question-list">
						{questionsTransition((props, question) => (
							<Question style={props} key={question.id} question={question}>
								{!question.isAnswered && (
									<>
										<button
											type="button"
											className="answered-question"
											onClick={() =>
												handleCheckQuestionAsAnswered(
													question.id,
													question.isAnswered
												)
											}
											title="Question answered"
										>
											<svg
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<circle
													cx="12.0003"
													cy="11.9998"
													r="9.00375"
													stroke="#737380"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193"
													stroke="#737380"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</button>
										<button
											type="button"
											className="highlighted-question"
											onClick={() =>
												handleHighlightQuestion(
													question.id,
													question.isHighlighted
												)
											}
											title="Question highlighted"
										>
											<svg
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z"
													stroke="#737380"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</button>
									</>
								)}
								<button
									type="button"
									onClick={() => handleToggleModalDelete(question)}
									title="Delete question"
								>
									<img src={deleteImg} alt="Delete question" />
								</button>
							</Question>
						))}
					</div>
				</main>
			) : (
				<div className="room-close">
					The room has been closed by you.
					<Link to="/">Click me to go back</Link>
				</div>
			)}

			{modalDelete.active && (
				<div className="container-modal-delete">
					<div className="dialog">
						<div className="content">
							<img src={deleteModalImg} alt="Delete modal" />

							<h2>Close room</h2>
							<h3>You have sure you want to close this room?</h3>

							<div className="action">
								<button
									type="button"
									className="cancel"
									onClick={() => handleToggleModalDelete()}
								>
									Cancel
								</button>
								<button
									type="button"
									className="delete"
									onClick={() => handleDeleteQuestion(modalDelete.data?.id)}
								>
									Yes, close
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</Container>
	);
};

export default AdminRoom;
