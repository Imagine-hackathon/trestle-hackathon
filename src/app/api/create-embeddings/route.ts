import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

import { pineconeIndex } from "@/lib/pinecone";
import { PDFPage } from "../../../../types";
import { prepareDocument } from "@/lib/utils";
import { convertToAscii, embedDocuments } from "@/lib/embedding";

export async function GET(req: Request) {
    const loader = new PDFLoader("src/app/api/create-embeddings/test.pdf");

    const pages = (await loader.load()) as PDFPage[];

    //split and segment the docs
    const documents = await Promise.all(pages.map(prepareDocument));
    console.log(documents);

    const vectors = await Promise.all(documents.flat().map(embedDocuments));
    const namespace = pineconeIndex.namespace("imaginec");

    // const namespace = pineconeIndex.namespace(convertToAscii(fileKey));

    await namespace.upsert(vectors);

    return Response.json({ status: 200 });
}
