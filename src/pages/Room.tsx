import React, { FormEvent, useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import useAuth from "../hooks/useAuth";
import RoomCode from "../components/RoomCode";
import Button from "../components/Button";
import { database } from "../services/firebase";

import logoImg from "../assets/images/logo.svg";

import "../styles/room.scss";

type FirebaseQuestions = Record<
	string,
	{
		author: {
			name: string;
			avatar: string;
		};
		content: string;
		isAnswered: boolean;
		isHighlighted: boolean;
	}
>;

interface Question {
	id: string;
	author: {
		name: string;
		avatar: string;
	};
	content: string;
	isAnswered: boolean;
	isHighlighted: boolean;
}

interface RoomParams {
	id: string;
}

const Room: React.FC = () => {
	const { user } = useAuth();
	const params = useParams<RoomParams>();

	const [newQuestion, setNewQuestion] = useState("");
	const [questions, setQuestions] = useState<Question[]>([]);
	const [title, setTitle] = useState("");
	const roomId = params.id;

	useEffect(() => {
		const roomRef = database.ref(`/rooms/${roomId}`);

		roomRef.on("value", (room) => {
			const databaseRoom = room.val();
			const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

			const parsedQuestions = Object.entries(firebaseQuestions).map(
				([key, value]) => {
					return {
						id: key,
						content: value.content,
						author: value.author,
						isHighlighted: value.isHighlighted,
						isAnswered: value.isAnswered,
					};
				}
			);

			setTitle(databaseRoom.title);
			setQuestions(parsedQuestions);
		});
	}, [roomId]);

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
		// eslint-disable-next-line
		[newQuestion, roomId, user]
	);

	return (
		<div id="page-room">
			<header>
				<div className="content">
					<img src={logoImg} alt="Letmeask" />
					<RoomCode code={roomId} />
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
			</main>

			<Toaster position="top-right" />
		</div>
	);
};

export default Room;
