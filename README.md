# Applicant Tracking System (ATS) with Job Posting

Welcome to the Applicant Tracking System (ATS) with Job Posting! This project is built using Next.js, resume reader, Large Language Model and Firebase, designed to help companies streamline their recruitment process by managing job postings and applicant tracking. The system also integrates AI features requiring a Google API key.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Job Posting Management**: Create, update, and delete job postings easily.
- **Applicant Ranking**: Ranks applicants based on the job description through.
- **AI Integration**: Utilize AI for resume parsing, candidate matching, and more.
- **Secure Authentication**: User authentication and authorization using Firebase.
- **Real-time Updates**: Real-time data updates with Firebase Firestore.
- **Responsive Design**: Mobile-friendly and accessible user interface.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Imagine-hackathon/trestle-hackathon.git
    cd trestle-hackathon
    ```

2. **Install dependencies**:
    Make sure you have Node.js and npm installed. Then, run:
    ```bash
    npm install
    ```

3. **Set up Firebase**:
    - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/).
    - Add a new web app to your Firebase project.
    - Copy the Firebase config object and add it to your `.env.local` file (you may need to create this file).
    
    ```
    NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=measurment-id

 
    ```

4. **Set up Google API Key**:
    - Go to [Google Cloud Console](https://console.cloud.google.com/).
    - Create a new project or select an existing project.
    - Enable the necessary APIs for AI functionalities (e.g., Cloud Natural Language, Cloud Vision).
    - Create an API key and add it to your `.env.local` file:
    
    ```
    NEXT_PUBLIC_GOOGLE_API_KEY=your-google-api-key
    ```

## Getting Started

To start the development server, run:
```bash
npm run dev
