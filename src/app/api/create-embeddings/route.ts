// import "pdf-parse"; // Peer dep
// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

import { embedDocuments, PDFPage, prepareDocument } from "@/lib/embedding";
import { index } from "@/lib/pinecone";

export async function GET(req: Request) {
    console.log("startings pdf parsing");
    const loader = new PDFLoader("src/app/api/create-embeddings/test.pdf");

    const pages = (await loader.load()) as PDFPage[];

    //split and segment the docs
    const documents = await Promise.all(pages.map(prepareDocument));
    console.log(documents);

    const vectors = await Promise.all(documents.flat().map(embedDocuments));

    const namespace = index.namespace("imagine");

    await namespace.upsert(vectors);

    console.log(pages.length);
    return Response.json({ data: "yawiee" });
}
