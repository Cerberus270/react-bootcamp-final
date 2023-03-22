import { collection, addDoc, Timestamp, doc, DocumentData, getDocs, getDoc } from "firebase/firestore";
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

export const getAllSicks = async (): Promise<any[]> => {
    try {
        let tempSick: any[] = []
        const applicationRef = collection(db, "application");
        const querySnapshot = await getDocs(applicationRef);
        querySnapshot.forEach(async (doc: any) => {
            let tempDoc = doc.data();
            tempDoc.id = doc.id
            tempSick.push(tempDoc);
        });
        return tempSick;
    } catch (e) {
        console.error("Error getting Info: ", e);
        return [];
    }
}

const getEmployeeName = async (id: string): Promise<any> => {
    try {
        const employeeRef = doc(db, "employee", id);
        const docSnap = await getDoc(employeeRef);
        console.log(docSnap.data()?.fullName);
        let name: string = docSnap.data()?.fullName;
        return name;
    } catch (error) {
        console.error(error);
        return null;
    }
}