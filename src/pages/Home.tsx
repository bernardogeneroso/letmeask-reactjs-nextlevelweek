import React, { FormEvent, useCallback, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import useAuth from "../hooks/useAuth";
import { database } from "../services/firebase";
import { Button } from "../components/Button";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import "../styles/auth.scss";

const Home: React.FC = () => {
	const history = useHistory();
	const { user, signInWithGoogle } = useAuth();

	const [roomCode, setRoomCode] = useState("");
	const [errorRoomCode, setErrorRoomCode] = useState<string | undefined>();

	const handleCreateRoom = useCallback(async () => {
		if (!user) await signInWithGoogle();

		history.push("/rooms/new");
	}, [user, signInWithGoogle, history]);

	const handleJoinRoom = useCallback(
		async (event: FormEvent) => {
			event.preventDefault();

			if (!roomCode.trim()) {
				setErrorRoomCode("Field room code is required");
				return;
			}

			const roomRef = await database.ref(`/rooms/${roomCode}`).get();

			if (!roomRef.exists()) {
				setErrorRoomCode("Room does not exist");
				return;
			}

			if (roomRef.val().endedAt) {
				setErrorRoomCode("Room already closed");
				return;
			}

			history.push(`/rooms/${roomCode}`);
		},
		[roomCode, database, history]
	);

	return (
		<div id="page-auth">
			<aside>
				<Link to="/">
					<img src={illustrationImg} alt="Illustration" />
				</Link>
				<strong>Create rooms of Q&amp;A in real-time</strong>
				<p>Ask your audience's questions in real-time</p>
			</aside>
			<main>
				<div className="main-content">
					<img src={logoImg} alt="Letmeask" />
					<button className="create-room" onClick={handleCreateRoom}>
						<img src={googleIconImg} alt="Google logo" />
						Create your room with Google
					</button>

					<div className="separator">or enter a room</div>
					<form onSubmit={handleJoinRoom}>
						<input
							type="text"
							placeholder="Room code..."
							onChange={(event) => setRoomCode(event.target.value)}
							value={roomCode}
						/>
						{errorRoomCode && <p>{errorRoomCode}</p>}

						<Button type="submit">
							<FiLogIn />
							Enter on room
						</Button>
					</form>
				</div>
			</main>
		</div>
	);
};

export default Home;
