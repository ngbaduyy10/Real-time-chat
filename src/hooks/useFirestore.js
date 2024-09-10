import { useEffect, useState } from "react";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

const useFirestore = (col, condition) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        let colRef = collection(db, col);
        if (condition) {
            colRef = query(colRef, where(condition.fieldName, condition.operator, condition.compareValue));
        }

        const unsubscribe = onSnapshot(colRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id,
                }
            });
            setDocuments(data);
        });

        return () => unsubscribe();
    }, [col, condition]);

    return documents;
}

export default useFirestore;