import React from "react";
import { useHistory, useParams } from "react-router-dom";

import useRoom from "../hooks/useRoom";
import RoomCode from "../components/RoomCode";
import Button from "../components/Button";
import Question from "../components/Question";
import { database } from "../services/firebase";

import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";

import "../styles/room.scss";

interface AdminRoomParams {
	id: string;
}

const AdminRoom: React.FC = () => {
	const history = useHistory();
	const params = useParams<AdminRoomParams>();
	const roomId = params.id;
	const { questions, title } = useRoom(roomId);

	const handleEndRoom = async () => {
		console.log("aqui");

		await database.ref(`rooms/${roomId}`).update({
			endedAt: new Date(),
		});

		history.push("/");
	};

	const handleDeleteQuestion = async (questionId: string) => {
		if (confirm("Are you sure you want to delete the question?")) {
			await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
		}
	};

	return (
		<div id="page-room">
			<header>
				<div className="content">
					<img src={logoImg} alt="Letmeask" />

					<div>
						<RoomCode code={roomId} />
						<Button isOutlined onClick={handleEndRoom}>
							Leave room
						</Button>
					</div>
				</div>
			</header>

			<main>
				<div className="room-title">
					<h1>Room {title}</h1>
					{questions.length > 0 && (
						<span>
							{`${questions.length} ${
								questions.length === 1 ? "question" : "questions"
							}`}
						</span>
					)}
				</div>

				<div className="question-list">
					{questions.map((question) => (
						<Question key={question.id} question={question}>
							<button
								type="button"
								onClick={() => handleDeleteQuestion(question.id)}
							>
								<img src={deleteImg} alt="Delete question" />
							</button>
						</Question>
					))}
				</div>
			</main>
		</div>
	);
};

export default AdminRoom;
