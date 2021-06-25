import React, { FormEvent, useState, useCallback, useContext } from "react";
import { ThemeContext } from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn, FiSun, FiMoon } from "react-icons/fi";

import useAuth from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import { Button } from "../../components/Button";

import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";

import { Container } from "../Home/styles";

interface NewRoomProps {
	switchTheme(): void;
}

const NewRoom: React.FC<NewRoomProps> = ({ switchTheme }) => {
	const themeContext = useContext(ThemeContext);
	const history = useHistory();
	const { user } = useAuth();

	const [newRoom, setNewRoom] = useState("");
	const [errorNewRoom, setErrorNewRoom] = useState<string | undefined>();

	const handleCreateRoom = useCallback(
		async (event: FormEvent) => {
			event.preventDefault();

			if (!newRoom.trim()) {
				setErrorNewRoom("Field room code is required");
				return;
			}

			const roomRef = database.ref("rooms");

			const firebaseRoom = await roomRef.push({
				title: newRoom,
				authorId: user?.id,
			});

			history.push(`/rooms/${firebaseRoom.key}`);
		},
		[newRoom, database, user?.id, history]
	);

	return (
		<Container>
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
					<h2>Create a new room</h2>
					<form onSubmit={handleCreateRoom}>
						<input
							type="text"
							placeholder="Room name"
							onChange={(event) => setNewRoom(event.target.value)}
							value={newRoom}
						/>
						{errorNewRoom && <p>{errorNewRoom}</p>}

						<Button type="submit">
							<FiLogIn />
							Create room
						</Button>
					</form>
					<p>
						Do you want to enter an existing room?{" "}
						<Link to="/">Click here</Link>
					</p>
				</div>
			</main>

			<div className="container-theme" onClick={switchTheme}>
				{themeContext.title === "light" ? (
					<FiMoon color="#fff" size={22} />
				) : (
					<FiSun color="#fff" size={22} />
				)}
			</div>
		</Container>
	);
};

export default NewRoom;
