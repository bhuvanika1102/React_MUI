import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const postFormData = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "education_details"), data);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document:", error);
    return { success: false, error };
  }
};
