import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getFormData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "formData"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, error };
  }
};