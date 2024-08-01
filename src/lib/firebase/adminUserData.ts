import { getFirestore, doc, setDoc, collection, query, where, getDocs, getDoc } from "firebase/firestore";
import { getApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes,  } from "firebase/storage";

interface CompanyData {
  name: string;
  logo: string;
  useAsDefault: boolean;
}

export const uploadLogo = async (file: File) => {
  const storage = getStorage();

  const uuid = crypto.randomUUID();
  const storageRef = ref(storage, "images/" + uuid + "_" + file.name);

  try {
    // Upload the file
    await uploadBytes(storageRef, file);
    console.log("Uploaded a blob or file!");

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};






interface CompanyData {
  name: string;
  logo: string;
  useAsDefault: boolean;
}



export async function saveCompanyData(data: CompanyData, userId: string): Promise<void> {
  try {
    const db = getFirestore(getApp());
    
    // Create a reference to the user document
    const userRef = doc(db, `users/${userId}`);

    // Get the current user document
    const userDoc = await getDoc(userRef);

    let updatedData: any;

    if (userDoc.exists()) {
      // If the user document exists, update it
      const userData = userDoc.data();
      updatedData = {
        ...userData,
        company: {
          ...data,
          updatedAt: new Date()
        }
      };

      // If there's no createdAt field for the company, add it
      if (!userData.company || !userData.company.createdAt) {
        updatedData.company.createdAt = new Date();
      }
    } else {
      // If the user document doesn't exist, create it with the company data
      updatedData = {
        company: {
          ...data,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      };
    }

    await setDoc(userRef, updatedData, { merge: true });

    console.log("Company data saved successfully");
  } catch (error) {
    console.error("Error saving company data:", error);
    throw error; 
  }
}