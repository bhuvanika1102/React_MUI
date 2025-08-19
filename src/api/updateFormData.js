import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const updateFormData = async (id, updatedData) => {
  try {
    const docRef = doc(db, "formData", id);
    await updateDoc(docRef, updatedData);
    return { success: true };
  } catch (error) {
    console.error("Error updating document:", error);
    return { success: false, error };
  }
};