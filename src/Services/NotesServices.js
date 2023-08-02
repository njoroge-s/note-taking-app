import { db } from "../firebase";
import {
    collection,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import {v4 as uuidv4} from 'uuid' ;


class NotesServices {
    addUser = (uid) => {
        const userRef = doc(db, "users", uid);
        return setDoc(userRef, { notesObj:{"All Notes":{id: uuidv4(),title:"All Notes",notes:[], color:"rgb(248, 212, 114)", length:0}}});
    }

    getUser = (uid) => {
        const userRef = doc(db, "users", uid);
        return getDoc(userRef);
    }

    updateUser = (uid,data) => {
        const userRef = doc(db, "users", uid);
        return updateDoc(userRef,data);
    }
}

export default new NotesServices();