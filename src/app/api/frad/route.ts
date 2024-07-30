/*
  This code sample shows Prebuilt Document operations with the Azure Form Recognizer client library. 

  To learn more, please visit the documentation - Quickstart: Form Recognizer Javascript client library SDKs
  https://learn.microsoft.com/azure/applied-ai-services/form-recognizer/quickstarts/get-started-v3-sdk-rest-api?view=doc-intel-3.1.0&pivots=programming-language-javascript
*/

import  { AzureKeyCredential, DocumentAnalysisClient } from "@azure/ai-form-recognizer"

/*
    Remember to remove the key from your code when you're done, and never post it publicly. For production, use
    secure methods to store and access your credentials. For more information, see 
    https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-security?tabs=command-line%2Ccsharp#environment-variables-and-application-configuration
  */
const key = "d4e767f5240e4341a4d7adbc22eda192";
const endpoint = "https://trestle-imagine.cognitiveservices.azure.com/";

// sample document
const formUrl = "https://firebasestorage.googleapis.com/v0/b/imagine-bk.appspot.com/o/test%2FDivine%20Korankye%20Quansah%20-%20%20Resume.pdf?alt=media&token=e5094133-6283-4bb4-8c98-dda32c94cae8";

async function main() {
    // create your `DocumentAnalysisClient` instance and `AzureKeyCredential` variable
    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

    const poller = await client.beginAnalyzeDocument("prebuilt-document", formUrl);

    const { keyValuePairs } = await poller.pollUntilDone();

    if (!keyValuePairs) return
    
    if (keyValuePairs.length <= 0) {
        console.log("No key-value pairs were extracted from the document.");
    } else {
        console.log("Key-Value Pairs:");
          for (const {
                  key,
                  value,
                  confidence
              } of keyValuePairs) {
            console.log("- Key  :", `"${key.content}"`);
            console.log("  Value:", `"${value?.content ?? "<undefined>"}" (${confidence})`);
        }
    }
    return keyValuePairs;
}

main().catch((error) => {
    console.error("An error occurred:", error);
    process.exit(1);
});

export async function GET(request: Request) {
    console.log("Data extracting begin")
    const res = main().catch((error) => {
        console.error("An error occurred:", error);
        process.exit(1);
    });
  return   Response.json({ data:res})

}
