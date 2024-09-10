import {doc, setDoc} from "firebase/firestore";
import {db} from "./config";

export const addDocument = async (collection, id, data) => {
    return await setDoc(doc(db, collection, id), data);
}