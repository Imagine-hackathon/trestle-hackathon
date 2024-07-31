import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { GoogleGenerativeAI } from "@google/generative-ai";
import md5 from "md5";

import {
    Document,
    RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { metadata } from "@/app/layout";
import { PineconeRecord } from "@pinecone-database/pinecone";
export const embedDocuments = async (doc: Document) => {
    const genAI = new GoogleGenerativeAI(
        "AIzaSyDbE7e2C0QNq93QsW6giNg-hpPopmM3Ay8"
    );
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
export type PDFPage = {
    pageContent: string;
    metadata: {
        loc: {
            pageNumber: number;
        };
    };
};
