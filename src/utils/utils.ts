import { Timestamp } from "firebase/firestore";

export const milisToTimeStamp = (stringDate: any): Timestamp => {
    let targetDate = new Date(stringDate);
    return Timestamp.fromDate(new Date(targetDate.getTime() + Math.abs(targetDate.getTimezoneOffset() * 60000)));
}