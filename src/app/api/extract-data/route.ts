import DocumentIntelligence from "@azure-rest/ai-document-intelligence";
import {
  getLongRunningPoller,
  isUnexpected,
} from "@azure-rest/ai-document-intelligence";
import { NextResponse } from "next/server";

const { AzureKeyCredential } = require("@azure/core-auth");

// set `<your-key>` and `<your-endpoint>` variables with the values from the Azure portal.
const key = "fb367a7349ac4d5c939e8927c2b07ac0";
const endpoint = "https://hackerton.cognitiveservices.azure.com";

// sample document
const formUrl =
  "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-layout.pdf";

async function main() {
  const client = DocumentIntelligence(endpoint, new AzureKeyCredential(key));

  const initialResponse = await client
    .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
    .post({
      contentType: "application/json",
      body: {
        urlSource: formUrl,
      },
    });

  if (isUnexpected(initialResponse)) {
    console.error(initialResponse.body.error);
  }

  // const poller = await getLongRunningPoller(client, initialResponse);

  // const resultsBody = await poller.pollUntilDone();
  // const analyzeResult = resultsBody.body.analyzeResult;

  // const documents = analyzeResult?.documents;

  // const document = documents && documents[0];
  // if (!document) {
  //   throw new Error("Expected at least one document in the result.");
  // }

  // console.log(
  //   "Extracted document:",
  //   document.docType,
  //   `(confidence: ${document.confidence || "<undefined>"})`
  // );
  // console.log("Fields:", document.fields);
}

export async function GET(request: Request) {
    console.log("Data extracting begin")
  main().catch((error) => {
    console.error("An error occurred:", error);
    process.exit(1);
  });
  return   Response.json({ data:"done" })

}
