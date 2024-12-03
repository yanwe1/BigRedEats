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



