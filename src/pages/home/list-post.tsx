import { Post as IPost } from "./Home";
import { addDoc, getDocs, deleteDoc, collection, query, where, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";

interface Post {
    post: IPost
}

interface Like {
    userId: String | null
}
export default function ListPost(props: Post) {
    const [likes, setLikes] = useState<Like[] | null>(null);
    const likesCollection = collection(db, "Likes");
    const getLikesQuery = query(likesCollection, where("postId", "==", props.post.id));
    const deleteLikeQuery = query(likesCollection, where("userId", "==", auth.currentUser?.uid), where("postId", "==", props.post.id))

    async function getLikes() {
        const likeList = await getDocs(getLikesQuery);
        setLikes(likeList.docs.map((like) => ({ userId: like.data().userId })) as Like[])
        // console.log(likeList.docs.map((like)=>({...like.data()})) as Like[])
    }
    async function likeDoc() {
        try {
            await addDoc(likesCollection, { userId: auth.currentUser?.uid, postId: props.post.id })
            if (auth.currentUser) {
                setLikes((prevLikes) => prevLikes ? [...prevLikes, { userId: auth.currentUser?.uid || null }] : [{ userId: auth.currentUser?.uid || null }])
            }
        } catch (error) {
            console.log(error)
        }
    }
    async function dislikeDoc() {
        try {
            const docDetails = await getDocs(deleteLikeQuery)
            await deleteDoc(doc(db, "Likes", docDetails.docs[0].id));
            setLikes(likes ? likes?.filter((like) => (like.userId !== auth.currentUser?.uid)) : null)
        } catch (error) {
            console.log(error)
        }
    }

    let hasUserLiked = likes?.find((like) => (like.userId === auth.currentUser?.uid));

    useEffect(() => { getLikes() }, [])
    return (
        <div>
            <div className="title">
                <h1>{props.post.title}</h1>
            </div>
            <div className="description">
                <p>{props.post.description}</p>
            </div>
            <div className="userName">
                <p>#{props.post.userName}</p>
                <button onClick={hasUserLiked ? dislikeDoc : likeDoc}> {hasUserLiked ? <>&#128078;</> : <>&#x1F44D;</>} </button>
                {likes?.length && <p>Likes:{likes?.length}</p>}
            </div>
        </div>
    )
}
