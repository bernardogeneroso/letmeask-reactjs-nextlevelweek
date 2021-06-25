import { useState, useEffect } from "react";

import useAuth from "./useAuth";
import { database } from "../services/firebase";

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
		likes: Record<
			string,
			{
				authorId: string;
			}
		>;
	}
>;

type Room = {
	title: string;
	authorId: string;
	endedAt: Date;
};

export interface Question {
	id: string;
	author: {
		name: string;
		avatar: string;
	};
	content: string;
	isAnswered: boolean;
	isHighlighted: boolean;
	likeCount: number;
	likeId: string | undefined;
}

const useRoom = (roomId: string) => {
	const { user } = useAuth();
	const [roomInfo, setRoomInfo] = useState<Room>();
	const [questions, setQuestions] = useState<Question[]>([]);

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
						likeCount: Object.values(value.likes ?? {}).length,
						likeId: Object.entries(value.likes ?? {}).find(
							([, like]) => like.authorId === user?.id
						)?.[0],
					};
				}
			);

			delete databaseRoom.questions;

			setRoomInfo(databaseRoom);
			setQuestions(parsedQuestions);
		});

		return () => {
			roomRef.off("value");
		};
	}, [roomId, user?.id]);

	return { questions, roomInfo };
};

export default useRoom;
