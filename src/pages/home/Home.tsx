import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import ListPost from './list-post';

export interface Post {
    id: string;
    userName: string;
    userId: string;
    description: string;
    title: string;
}
export const Home = () => {


    const postsCollection = collection(db, 'Posts');
    const [list, setList] = useState<Post[] | null>(null);
    // let list: Post[] = []

    async function getPosts() {
        const postList = await getDocs(postsCollection);
        setList(
        postList.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
        )
    }

    useEffect(() => { getPosts() }, [])
    return (
        <div>
            {list?.map((item) => (
                <ListPost post={item} />
            ))}
        </div>
    )
}