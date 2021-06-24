import React, { useState, useEffect } from "react";
import { createContext } from "use-context-selector";

import { auth, firebase } from "../../services/firebase";

interface User {
	id: string;
	name: string;
	avatar: string;
}

interface AuthContextType {
	user: User | undefined;
	signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<User>();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				const { displayName, photoURL, uid } = user;

				if (!displayName || !photoURL) {
					throw new Error("Missing information from Google Account");
				}

				setUser({
					id: uid,
					name: displayName,
					avatar: photoURL,
				});
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const signInWithGoogle = async () => {
		const provider = new firebase.auth.GoogleAuthProvider();

		const { user } = await auth.signInWithPopup(provider);

		if (user) {
			const { displayName, photoURL, uid } = user;

			if (!displayName || !photoURL) {
				throw new Error("Missing information from Google Account");
			}

			setUser({
				id: uid,
				name: displayName,
				avatar: photoURL,
			});
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				signInWithGoogle,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
