import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { NextResponse } from "next/server";

import { addAIOUTPUt } from "@/lib/firebase/jobs";
// import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
//

import { ListingResponse } from "@/app/dashboard/[adminId]/page";

// this function returns a new instance of the `TextExtractor` class, with the default
// extraction methods (docx, pptx, xlsx, pdf) registered.
const model = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  maxOutputTokens: 2048,
  apiKey: "AIzaSyDbE7e2C0QNq93QsW6giNg-hpPopmM3Ay8",
});
export async function POST(req: Request) {
  const formData = await req.formData();

  const cv = formData.get("cv") as Blob;
  console.log("cv", cv);
  const jd = formData.get("jd");
  console.log("jd", jd);
  const applicationId = formData.get("applicationId") as string;
  console.log("applicationId", applicationId);

  const loader = new PDFLoader(cv, {
    splitPages: false,
  });

  const docs = await loader.load();
  console.log(docs[0].pageContent);

  // let text = "";

  const prompt = {
    role: "system",
    content: `AI assistant is a highly knowledgeable and expert system specializing in analyzing job descriptions (JDs) and resumes.
    The traits of AI include expert knowledge, thoroughness, accuracy, and detailed analysis.
    AI assistant is meticulous and objective, providing clear and structured responses.
    AI assistant is designed to analyze job descriptions and resumes, generating JSON responses that include ratings, merits, and demerits of the applicants based on the resume provided.
    
    START CONTEXT BLOCK
    Job Description: ${jd}
    Resume: ${docs[0].pageContent}
    END OF CONTEXT BLOCK
  
    AI assistant will analyze the provided job description and resume, and generate a JSON response with the following structure:
    {
      "ratings": {
        "overallFit": number, // Overall fit score out of 10
        "skillsMatch": number, // Skills match score out of 10
        "experienceMatch": number, // Experience match score out of 10
        "educationMatch": number // Education match score out of 10
      },
      "merits": [
        // List of strengths or positive aspects found in the resume related to the job description
        "string"
      ],
      "demerits": [
        // List of weaknesses or negative aspects found in the resume related to the job description
        "string"
      ]
    }
  
    AI assistant will ensure the JSON response is well-structured, accurate, and based strictly on the provided job description and resume. The analysis will include a breakdown of how well the applicant's skills, experience, and education match the job requirements, along with specific merits and demerits.
    `,
  };

  const res = await model.invoke([{ type: "system", content: prompt.content }]);

  const aiAnalysis = JSON.parse(res?.content as string) as
    | string
    | ListingResponse;
  await addAIOUTPUt({ applicationId, aiAnalysis });

  return NextResponse.json({
    status: 200,
    response: JSON.parse(res?.content as string),
  });
}

const sample = {
  status: 200,
  response: {
    lc: 1,
    type: "constructor",
    id: ["langchain_core", "messages", "AIMessage"],
    kwargs: {
      content:
        '{\n  "ratings": {\n    "overallFit": 8.5,\n    "skillsMatch": 9.0,\n    "experienceMatch": 8.0,\n    "educationMatch": 9.0\n  },\n  "merits": [\n    "Over 3 years of experience as a software engineer.",\n    "Proficient in multiple programming languages including Python, Java, JavaScript, and C++.",\n    "Experience with web development frameworks like React and React Native.",\n    "Strong understanding of software development principles and best practices.",\n    "Excellent problem-solving and analytical skills.",\n    "Bachelor\'s degree in Computer Engineering from a reputable university.",\n    "Familiar with version control systems, such as Git.",\n    "Experience working in a cross-functional team environment.",\n    "Ability to work independently and manage time effectively."\n  ],\n  "demerits": [\n    "Missing experience with cloud platforms like AWS, Azure, or Google Cloud.",\n    "Limited knowledge of containerization technologies.",\n    "No direct experience with CI/CD pipelines.",\n    "No formal certification in Agile/Scrum methodologies."\n  ]\n}',
      tool_calls: [],
      additional_kwargs: {
        finishReason: "STOP",
        index: 0,
        safetyRatings: [
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            probability: "NEGLIGIBLE",
          },
          { category: "HARM_CATEGORY_HATE_SPEECH", probability: "NEGLIGIBLE" },
          { category: "HARM_CATEGORY_HARASSMENT", probability: "NEGLIGIBLE" },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            probability: "NEGLIGIBLE",
          },
        ],
      },
      usage_metadata: {
        input_tokens: 1646,
        output_tokens: 253,
        total_tokens: 1899,
      },
      invalid_tool_calls: [],
      response_metadata: {
        finishReason: "STOP",
        index: 0,
        safetyRatings: [
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            probability: "NEGLIGIBLE",
          },
          { category: "HARM_CATEGORY_HATE_SPEECH", probability: "NEGLIGIBLE" },
          { category: "HARM_CATEGORY_HARASSMENT", probability: "NEGLIGIBLE" },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            probability: "NEGLIGIBLE",
          },
        ],
      },
    },
  },
};
