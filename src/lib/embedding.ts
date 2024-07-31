import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { GoogleGenerativeAI } from "@google/generative-ai";
import md5 from "md5";

import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { metadata } from "@/app/layout";
import { PineconeRecord } from "@pinecone-database/pinecone";
import { PDFPage } from "../../types";
import { pineconeIndex } from "./pinecone";
const genAI = new GoogleGenerativeAI("AIzaSyDbE7e2C0QNq93QsW6giNg-hpPopmM3Ay8");
export const embedDocuments = async (doc: Document) => {
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

  const result = await model.embedContent(doc.pageContent);
  const embeddings = result.embedding.values;

  const hash = md5(doc.pageContent);

  return {
    id: hash,
    values: embeddings,
    metadata: {
      text: doc.metadata.text,
      pagenumber: doc.metadata.pageNumber,
    },
  } as PineconeRecord;
};

export async function getEmbeddings(text: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

    const result = await model.embedContent(text);
    const embeddings = result.embedding.values;

    return embeddings;
  } catch (error) {
    console.log("error calling openai embeddings api", error);
    throw error;
  }
}

export async function getMatchesFromEmbeddings(
  embeddings: number[],
  fileKey: string
) {
  try {
    //   const namespace = pineconeIndex.namespace(convertToAscii(fileKey));
    const namespace = pineconeIndex.namespace(fileKey);

    const queryResult = await namespace.query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
    });
    return queryResult.matches || [];
  } catch (error) {
    console.log("error querying embeddings", error);
    throw error;
  }
}

export function convertToAscii(inputString: string) {
  // remove non ascii characters
  const asciiString = inputString.replace(/[^\x00-\x7F]+/g, "");
  return asciiString;
}
