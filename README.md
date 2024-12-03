# Cornell North Campus Eateries

This is a web app that allows Cornell University students to view and submit reviews for North Campus dining locations. Users can sign in using their Google account and explore different eateries on North Campus, such as **Morrison Dining** and **North Star Dining**. Reviews are stored in a Firebase Firestore database.

---

## Features

- **Google Sign-In**: Securely sign in with your Google account.
- **Dining Locations**: Explore eateries on Cornell's North Campus, including Morrison Dining and North Star Dining.
- **Reviews**: View, search, and submit reviews for the dining locations.
- **Responsive Design**: The app is optimized for mobile and desktop devices.

---

## Tech Stack

- **Frontend**:
  - React
  - React Router 
  - Mantine 
- **Backend**:
  - Firebase Authentication 
  - Firebase Firestore 

---

## Project Structure

The project has two primary parts:

- **Frontend**:
  - The frontend is built with React and uses Mantine for UI components. It is responsible for rendering the app's user interface and interacting with the backend (Firebase).
  - The frontend is located in the `/src` folder of the repository.

- **Backend**:
  - The backend is managed by Firebase, specifically using Firebase Authentication and Firestore.
  - Firebase is used for authenticating users (via Google sign-in) and storing/retrieving reviews from the Firestore database.

---

## Setup and Running Locally

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/yanwe1/BigRedEats.git
cd BigRedEats

### 2. Install Dependencies

After cloning the repository, run the following command to install all the required dependencies for the project:

```bash
npm install

### Firebase Setup

To connect your project to Firebase, follow these steps:

#### 1. Create a Firebase Project

- Go to [Firebase Console](https://console.firebase.google.com/), click on **"Add Project"** and follow the setup instructions.

#### 2. Enable Google Authentication

- In the Firebase console, go to **Authentication > Sign-in method**, and enable **Google sign-in**.

#### 3. Set Up Firestore

- Go to **Firestore Database > Create Database** and set it to **Test mode**.

#### 4. Get Firebase Config

- Go to **Project Settings > General > Firebase SDK Setup and Configuration**.
- Copy the Firebase config and create a `.env` file at the root of your project with the following variables:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id

## 3. Starting the App Locally

After setting up the dependencies and Firebase configuration, run the following command to start the development server:

```bash
# Start the app locally
npm start

