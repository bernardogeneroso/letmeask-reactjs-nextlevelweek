import React, { FormEvent, useState, useCallback, useContext } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { ThemeContext } from "styled-components";
import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useTransition } from "react-spring";
import Loader from "react-loader-spinner";

import useAuth from "../../hooks/useAuth";
import useRoom from "../../hooks/useRoom";
import RoomCode from "../../components/RoomCode";
import Button from "../../components/Button";
import Question from "../../components/Question";
import { database } from "../../services/firebase";

import logoImg from "../../assets/images/logo.svg";

import { Container, ContainerLoader } from "./styles";

interface RoomParams {
	id: string;
}

interface RoomProps {
	switchTheme(): void;
}

const Room: React.FC<RoomProps> = ({ switchTheme }) => {
	const themeContext = useContext(ThemeContext);
	const params = useParams<RoomParams>();
	const { user } = useAuth();
	const roomId = params.id;
	const { questions, roomInfo } = useRoom(roomId);

	const [newQuestion, setNewQuestion] = useState("");

	const questionsTransition = useTransition(questions, {
		keys: (question) => question.id,
		enter: { opacity: 1, transform: "scale(1)", translateY: 0 },
		leave: { opacity: 0, transform: "scale(0.6)", translateY: 400 },
		from: { opacity: 0, transform: "scale(0.6)", translateY: 400 },
	});

	const handleSendQuestion = useCallback(
		async (event: FormEvent) => {
			event.preventDefault();

			if (!newQuestion.trim()) return;

			if (!user) {
				toast.error("You must be logged in");
				return;
			}

			const question = {
				content: newQuestion,
				author: {
					name: user.name,
					avatar: user.avatar,
				},
				isHighlighted: false,
				isAnswered: false,
			};

			await database.ref(`rooms/${roomId}/questions`).push(question);

			setNewQuestion("");
		},
		[newQuestion, roomId, user]
	);

	const handleLikeQuestion = useCallback(
		async (questionId: string, likeId: string | undefined) => {
			if (likeId) {
				await database
					.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
					.remove();
			} else {
				await database
					.ref(`rooms/${roomId}/questions/${questionId}/likes`)
					.push({
						authorId: user?.id,
					});
			}
		},
		[roomId, user?.id]
	);

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

					<form onSubmit={handleSendQuestion}>
						<textarea
							placeholder="What do you want do ask?"
							onChange={(event) => setNewQuestion(event.target.value)}
							value={newQuestion}
						/>

						<div className="form-footer">
							{user ? (
								<div className="user-info">
									<img src={user.avatar} alt={user.name} />
									<span>{user.name}</span>
								</div>
							) : (
								<span>
									To send a message,{" "}
									<Link to="/">
										<button>enter in your account</button>
									</Link>
									.
								</span>
							)}
							<Button type="submit" disabled={!user}>
								Send message
							</Button>
						</div>
					</form>

					<div className="question-list">
						{questionsTransition((props, question) => (
							<Question style={props} key={question.id} question={question}>
								{!question.isAnswered && (
									<button
										className={`like-button ${question.likeId ? "liked" : ""}`}
										type="button"
										aria-label="Like"
										onClick={() =>
											handleLikeQuestion(question.id, question.likeId)
										}
									>
										{question.likeCount > 0 && (
											<span>{question.likeCount}</span>
										)}
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
												stroke="#737380"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</button>
								)}
							</Question>
						))}
					</div>
				</main>
			) : (
				<div className="room-close">
					The room has been closed.
					<Link to="/">Click me to go back</Link>
				</div>
			)}

			<Toaster position="top-right" />
		</Container>
	);
};

export default Room;
