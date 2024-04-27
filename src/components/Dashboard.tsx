import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth";

export const Dashboard = () => {
    const [user] = useAuthState(auth)
    const singUserOut = async () => {
        await signOut(auth)
    }
    return (
        <div className="navbar">
            <div className="links">
                <Link to='/'>Home</Link>
                {!auth.currentUser ? <Link to='/login'>Login</Link>: <Link to='/createPost'>Create Post</Link>}
            </div>
            <div className="user">
                {auth.currentUser && (
                    <>
                        <p>{auth.currentUser?.displayName}</p>
                        <img src={auth.currentUser?.photoURL || ""} width="20" height="20" />
                        <button onClick={singUserOut}>Sign Out</button>
                    </>
                )}
            </div>
        </div >
    )
}