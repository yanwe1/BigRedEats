import { auth } from "./firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FirebaseError } from "firebase/app";

const provider = new GoogleAuthProvider();

export const signIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    console.log(user);

    return { token, user };
  } catch (error: unknown) {
    if (error instanceof Error) {
      const firebaseError = error as FirebaseError;
      const code = firebaseError.code;
      const message = firebaseError.message;
      const email = firebaseError.customData?.email;

      console.log(
        `An error ${code} occurred when logging user with email: ${email} with message: ${message}`
      );
    } else {
      console.error("An unknown error occurred", error);
    }

    return null;
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
};