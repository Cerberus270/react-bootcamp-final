import { signOut } from "firebase/auth";
import { collection, addDoc, Timestamp, doc, DocumentData, getDocs, getDoc } from "firebase/firestore";
import { auth, db } from "../database/db";
import { milisToTimeStamp } from "./utils";

// First version
// interface IApplicationData {
//     employeeId: DocumentData;
//     medicalUnit: string;
//     starDate: Timestamp;
//     endDate: Timestamp;
//     doctorName: string;
//     medicalDiagnostic: string;
//     coverageDays: string;
// }

export interface IApplicationForm {
    employeeId: string;
    medicalUnit: string;
    starDate: string;
    endDate: string;
    doctorName: string;
    medicalDiagnostic: string;
    coverageDays: string;
}

export interface IApplicationData {
    employeeId: DocumentData;
    medicalUnit: string;
    starDate: Timestamp;
    endDate: Timestamp;
    doctorName: string;
    medicalDiagnostic: string;
    coverageDays: string;
    id: string;
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

export const getEmployees = async (): Promise<any[]> => {
    let tempData: any[] = []
    const employeeRef = collection(db, "employee");
    const querySnapshot = await getDocs(employeeRef);
    querySnapshot.forEach((doc: any) => {
        let tempDoc = doc.data();
        tempDoc.id = doc.id
        tempData.push(tempDoc);
    });
    return tempData;
}

export const getEmployeeById = async (documentId: string): Promise<any> => {
    const docRef = doc(db, "employee", documentId); // Creating a reference to the document
    console.log(documentId);
    const docSnap = await getDoc(docRef); // Fetching the document
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }
}

export const logout = (): boolean => {
    // Log out the current user
    let control: boolean = true;
    signOut(auth)
        .then(() => {
            // Sign-out successful.
            console.log('User signed out.');
            control = true;
        })
        .catch((error) => {
            // An error happened.
            console.log(error.message);
            control = false;
        })
        return control;
}
