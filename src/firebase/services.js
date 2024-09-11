import {doc, getDoc} from "firebase/firestore";
import {db} from "./config";

export const getDocumentById = async (collectionName, documentId) => {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}