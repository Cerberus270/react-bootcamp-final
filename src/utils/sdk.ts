import { collection, addDoc, Timestamp, doc, DocumentData } from "firebase/firestore";
import { auth, db } from "../database/db";
import { milisToTimeStamp } from "./utils";

interface IApplicationData {
    employeeId: DocumentData;
    medicalUnit: string;
    starDate: Timestamp;
    endDate: Timestamp;
    doctorName: string;
    medicalDiagnostic: string;
    coverageDays: string;
}

export const addNewSick = async (data: any): Promise<boolean> => {
    try {
        let tempObject: IApplicationData = data;
        tempObject.starDate = milisToTimeStamp(data.starDate);
        tempObject.endDate = milisToTimeStamp(data.endDate);
        tempObject.employeeId = doc(db, "employee", data.employeeId);
        console.log(tempObject);
        const docRef = await addDoc(collection(db, "application"), tempObject);
        console.log("Document written with ID: ", docRef.id);
        return true;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
}