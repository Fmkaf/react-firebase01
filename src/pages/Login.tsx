import { auth, provider } from "../config/firebase";
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate=useNavigate();
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            navigate('/')
        } catch (error:any) {
            alert(error.mesage)
        }
    }

    return (
        <div>
            <p>SignIn with Google to continue</p>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    )
}