import {useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth, db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore'

export default function CreateForm() {

    const navigate=useNavigate();
    interface entity {
        title: String,
        description: String
    }

    const entitySchema = yup.object().shape({
        title: yup.string().required("Provide a valid title"),
        description: yup.string().required("Provide a valid description")
    })

    const entityCollection = collection(db, "Posts")

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(entitySchema) })
    async function submitHandler(formData: entity) {
        const entityData = {
            ...formData,
            userName: auth.currentUser?.displayName,
            userId:auth.currentUser?.uid
        }
        try{await addDoc(entityCollection, entityData);
            navigate('/')
    }catch(error:any){
        alert(error.message)
    }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(submitHandler)}>
                <input placeholder="Title" {...register("title")} />
                <p style={{ color: "red" }}>{errors.title?.message}</p>
                <textarea placeholder="Description" {...register("description")} />
                <p style={{ color: "red" }}>{errors.description?.message}</p>
                <input type="submit" />
            </form>
        </div>
    )
}
