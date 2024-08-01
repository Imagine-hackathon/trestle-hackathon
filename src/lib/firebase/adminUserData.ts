import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getApp } from "firebase/app";

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

  


export async function saveCompanyData(data: CompanyData): Promise<void> {
  try {
    const db = getFirestore(getApp());
    
    // Generate a unique ID for the company document
    const companyId = `company_${Date.now()}`;

    // Create a reference to the company document
    const companyRef = doc(db, "companies", companyId);

    // Save the data to Firestore
    await setDoc(companyRef, {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log("Company data saved successfully");
  } catch (error) {
    console.error("Error saving company data:", error);
    throw error; 
  }
}