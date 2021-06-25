import React from "react";

import copyImg from "../../assets/images/copy.svg";

import { Button } from "./styles";

interface RoomCodeProps {
	code: string;
}

const RoomCode: React.FC<RoomCodeProps> = ({ code }) => {
	function copyRoomCodeToClipboard() {
		navigator.clipboard.writeText(code);
	}

	return (
		<Button className="room-code" onClick={copyRoomCodeToClipboard}>
			<div>
				<img src={copyImg} alt="Copy room code" />
			</div>
			<span>Sala #{code}</span>
		</Button>
	);
};

export default RoomCode;
