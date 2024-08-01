import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { NextResponse } from "next/server";

import { addAIOUTPUt } from "@/lib/firebase/jobs";

import { ListingResponse } from "@/app/dashboard/[adminId]/page";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  maxOutputTokens: 2048,
  apiKey: "AIzaSyDbE7e2C0QNq93QsW6giNg-hpPopmM3Ay8",
});
export async function POST(req: Request) {
  const formData = await req.formData();

  const cv = formData.get("cv");
  const jd = formData.get("jd");
  const applicationId = formData.get("applicationId") as string;

  const prompt = {
    role: "system",
    content: `AI assistant is a highly knowledgeable and expert system specializing in analyzing job descriptions (JDs) and resumes.
    The traits of AI include expert knowledge, thoroughness, accuracy, and detailed analysis.
    AI assistant is meticulous and objective, providing clear and structured responses.
    AI assistant is designed to analyze job descriptions and resumes, generating JSON responses that include ratings, merits, and demerits of the applicants based on the resume provided.
    
    START CONTEXT BLOCK
    Job Description: ${jd}
    Resume: ${resume}
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

const jd = `
Job Title: Software Engineer

Location: Remote

Job Description:

We are seeking a talented and motivated Software Engineer to join our dynamic team. As a Software Engineer, you will play a key role in designing, developing, and maintaining our software solutions. This position offers an excellent opportunity to work with cutting-edge technologies and contribute to the success of our innovative products.

Responsibilities:

Develop and maintain high-quality software applications.
Collaborate with cross-functional teams to define, design, and ship new features.
Write clean, scalable, and efficient code.
Perform code reviews and provide constructive feedback to team members.
Troubleshoot, debug, and resolve software defects.
Stay updated with the latest industry trends and technologies.
Participate in the entire software development lifecycle, from planning to deployment and maintenance.
Requirements:

Bachelor’s degree in Computer Science, Software Engineering, or a related field.
3+ years of professional software development experience.
Proficiency in one or more programming languages such as Java, Python, JavaScript, or C#.
Experience with web development frameworks like React, Angular, or Vue.js.
Strong understanding of software development principles and best practices.
Familiarity with version control systems, such as Git.
Excellent problem-solving and analytical skills.
Strong communication and teamwork abilities.
Ability to work independently and manage time effectively.
Preferred Qualifications:

Master’s degree in Computer Science or a related field.
Experience with cloud platforms like AWS, Azure, or Google Cloud.
Knowledge of containerization technologies such as Docker and Kubernetes.
Experience with CI/CD pipelines.
Familiarity with Agile/Scrum methodologies.
Benefits:

Competitive salary and performance bonuses.
Flexible working hours and remote work options.
Health, dental, and vision insurance.
Professional development opportunities.
Friendly and collaborative work environment.
How to Apply:

Interested candidates should submit their resume and a cover letter outlining their qualifications and experience. We look forward to reviewing your application and potentially welcoming you to our team!


`;

const resume = `
    SUMMARY
Divine Korankye Quansah
divquan@gmail.com | +233 24 935 2628 | linkedin.com/in/divine-quansah
 I'm Divine! I’m a full-stack developer with over 3 years of experience as a software engineer and a founder. I build things at scale and have strong technical foundations. But, I'm a designer at heart — I love getting my hands dirty, prototyping and listening to users.
EXPERIENCE
Tap & Hop On-site React Native Developer Dec 2023 - Present At Tap & Hop, I develop a cross-platform mobile app for digitizing fare payments in Ghana. Responsibilities include:
● Utilizing React Native for efficient iOS and Android compatibility .
● Integrating Google Maps API for seamless navigation.
● Implementing AWS Amplify for scalable backend management.
● Collaborating with stakeholders for effective solution delivery.
Bismuth Technologies
Lead Product Engineer(Seasonal)
At Bismuth, I lead a team developing tech-based solutions aligned with the Sustainable Development Goals (SDGs). Responsibilities include:
  ● Guiding the design, development, and deployment of SDG-focused products.
● Implementing cutting-edge technologies for scalability and reliability.
● Collaborating cross-functionally to define project requirements and technical roadmaps.
● Mentoring team members and promoting best practices in software engineering.
VModel
Frontend Developer(Contract)
At VModel, a UK startup revolutionizing talent discovery and booking in photography, I:
● Developing and maintaining web applications using React.js and Redux.
● Ensuring responsive designs and cross-browser compatibility with HTML5 and CSS3.
● Collaborating with UX/UI designers and backend developers for seamless integration.
AFBR
FullStack Developer
At The African Bully Registry, I contribute to building Africa's premier platform for registering and showcasing bully breeds. Key responsibilities include:
● Developingandmaintainingthedigitalinfrastructuretosupporttheregistry'soperationsanduserinterface.
● Implementingfeaturesforshowcasingfeatureddogsthroughdynamicimagedisplaysandbreedcategorization.
● Collaboratingwithdesignersandstakeholderstoensureavisuallyappealinganduser-friendlyexperiencefor
visitors.
EDUCATION
Kwame Nkrumah University of Science and Technology Kumasi, Ghana
Major: Computer Engineering Expected May 2025 Relevant Coursework: Object-Oriented Programming (C++), Data Structures and Algorithms, Discrete Mathematics, Programming and Problem-solving with C, Intro to Web Development (HTML & CSS)
SKILLS
Languages: Python, C, C++, HTML, CSS, JavaScript, Java
Frameworks and Platforms: React, React Native, NextJS, Node.js, MySQL, Firebase, Postgres, Electron Tools: Git, GitHub, Figma, Canva
Hybrid May 2023 - Present
 Remote Nov 2023 - Jan 2024
 Remote Sep 2022- April 2023
   
 PROJECTS & LEADERSHIP
kakerabi kakerabi.com As the Co-Founder and Lead Software Engineer at Kakerabi, I spearhead the development of a fundraising platform supporting donations via traditional and digital channels in Ghana, including mobile money. Key responsibilities include:
● Conceptualizing and overseeing the development of Kakerabi, a pioneering platform revolutionizing fundraising in Ghana.
● Leading the software engineering team in designing and implementing robust solutions to facilitate seamless donations through traditional and digital platforms, notably mobile money.
● Collaborating with financial institutions and mobile money providers to ensure secure and efficient payment processing.
● Driving user engagement through intuitive user interfaces and streamlined donation processes.
LiinkApp liinkapp.vercel.app
● BuiltaSaaSplatformakintoLinktree,enablinguserstocuratepersonalizedonlineprofilesshowcasingtheir
various online activities and interests.
● Facilitatedeasyaccesstoimportantlinks,products,andpromotions,fosteringenhancedengagementwith
audiences.
● Implementeduser-friendlyfeaturesforcustomization,allowingindividualstotailortheironlineprofilesto
reflect their unique identities.
   `;

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
