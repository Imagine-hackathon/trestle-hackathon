import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, firebaseAuth } from "./firebase";
import { JobListingProps } from "@/components/JobListings";
import { Jobs, ListingResponse } from "@/app/dashboard/[adminId]/page";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { jobPostingSchema } from "@/app/jobportal/create/page";
import { time } from "console";

export const addJob = async (data: jobPostingSchema) => {
  try {
    const user = firebaseAuth.currentUser;

    if (!user) throw Error("User not found");
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "jobs"), {
      ...data,
      userId: user.uid,
      timeCreated: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e: any) {
    return { status: "failed", message: e.message };
  }
};

export const getJobs = async () => {
  const user = firebaseAuth.currentUser;

  if (!user) throw Error("User not found");
  // Reference to the collection
  const colRef = collection(db, "jobs");

  // Create a query to filter documents
  const q = query(colRef, where("userId", "==", user.uid));

  try {
    // Execute the query
    const querySnapshot = await getDocs(q);

    // Process the results
    const documents: { id: string; data: jobPostingSchema[] }[] = [];

    querySnapshot.forEach((doc) => {
      //@ts-ignore
      documents.push({ id: doc.id, data: doc.data() });
    });

    return documents;
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
};

export const getAllJobs = async () => {
  // Reference to the collection
  const colRef = collection(db, "jobs");

  try {
    // Execute the query
    const querySnapshot = await getDocs(colRef);

    // Process the results
    const documents: { id: string; data: jobPostingSchema[] }[] = [];

    querySnapshot.forEach((doc) => {
      //@ts-ignore
      documents.push({ id: doc.id, data: doc.data() });
    });

    return documents;
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
};
export const addApplication = async ({
  email,
  name,
  contact,
  jobId,
  resumeLink,
}: {
  email: string;
  name: string;
  contact: string;
  jobId: string;
  resumeLink: string;
}) => {
  try {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "applications"), {
      email,
      jobId,
      contact,
      name,
      resumeLink,
    });

    return docRef.id;
  } catch (e: any) {
    throw Error(e);
  }
};

export const addCVTOBucket = async (file: File) => {
  const storage = getStorage();
  const storageRef = ref(storage, "cvs/" + file.name);

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

export const addAIOUTPUt = async ({
  applicationId,
  aiAnalysis,
}: {
  applicationId: string;
  aiAnalysis: ListingResponse | string;
}) => {
  try {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "aiResults"), {
      applicationId,
      aiAnalysis,
    });

    return docRef.id;
  } catch (e: any) {
    throw Error(e);
  }
};

export const addImageTOBucket = async (file: File) => {
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
