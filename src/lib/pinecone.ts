import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({
  apiKey: "a8b2e2cd-abe7-495d-82d8-ac7c649cda72",
});
export const pineconeIndex = pc.index("imagine");
