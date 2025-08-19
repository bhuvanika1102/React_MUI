import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getUserById = async (id) => {
  try {
    const docRef = doc(db, "formData", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, error: { message: "User not found" } };
    }
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return { success: false, error };
  }
};