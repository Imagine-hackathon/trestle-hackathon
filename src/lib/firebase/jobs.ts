import { collection, addDoc } from "firebase/firestore";
import { db, firebaseAuth } from "./firebase";
import { JobListingProps } from "@/components/JobListings";
import { Jobs } from "@/app/dashboard/[adminId]/page";

export const addJob = async (data: JobListingProps) => {
  try {
    const user = firebaseAuth.currentUser;

    if (!user) throw Error("User not found");
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "jobs"), {
      ...data,
      userId: user.uid,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e: any) {
    return { status: "failed", message: e.message };
  }
};

export const addApplication = async ({
  data,
  jobId,
}: {
  data: Jobs;
  jobId: string;
}) => {
  try {
    // const user = firebaseAuth.currentUser;

    // if (!user) throw Error("User not found");
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "applications"), {
      ...data,
      jobId,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e: any) {
    return { status: "failed", message: e.message };
  }
};
