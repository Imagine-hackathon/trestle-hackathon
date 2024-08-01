import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { getEmbeddings, getMatchesFromEmbeddings } from "./embedding";
import { PDFPage } from "../../../types";

export const prepareDocument = async (doc: PDFPage) => {
  let { pageContent, metadata } = doc;
  pageContent = pageContent.replace(/\n/g, " ");

  //split the docs
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 1000),
      },
    }),
  ]);
  return docs;
};
const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();

  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

export async function getContext(query: string, fileKey: string) {
  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.7
  );
  console.log("qualifying matches", qualifyingDocs);

  type Metadata = {
    text: string;
    pageNumber: number;
  };

  let docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);
  // 5 vectors
  return docs.join("\n").substring(0, 3000);
}
