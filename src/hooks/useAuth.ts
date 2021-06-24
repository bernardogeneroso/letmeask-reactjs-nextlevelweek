import { useContextSelector } from "use-context-selector";
import { AuthContext } from "./contexts/Auth";

export default function useAuth() {
	const user = useContextSelector(AuthContext, (auth) => auth.user);
	const signInWithGoogle = useContextSelector(
		AuthContext,
		(auth) => auth.signInWithGoogle
	);

	return {
		user,
		signInWithGoogle,
	};
}
