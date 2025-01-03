import Review from "../pages/Review";  // Review page still included
import MorrisonDining from "../pages/MorrisonDining";  // MorrisonDining page
import NorthStar from "../pages/NorthStar";  // NorthStar page
import HomePage from "../pages/Home";

/**
 * TODO: Modify this constant to point to the URL of your backend.
 * It should be of the format "https://<app-name>.fly.dev/api"
 *
 * Most of the time, the name of your app is the name of the folder you're in
 * right now, and the name of your Git repository.
 * For instance, if that name is "my-app", then you should set this to:
 * "https://my-app.fly.dev/api"
 *
 * If you've already deployed your app (using `fly launch` or `fly deploy`),
 * you can find the name by running `flyctl status`, under App > Name.
 */
export const BACKEND_BASE_PATH = 'https://BigRedEats.fly.dev/api';

export const PATHS: {
    link: string;
    label: string;
    element?: JSX.Element;
}[] = [
    {
        link: "/",
        label: "Home",
        element: <HomePage />,
    },
    {
        link: "/morrison",
        label: "Morrison Dining",
        element: <MorrisonDining />,
    },
    {
        link: "/northstar",
        label: "NorthStar Dining",
        element: <NorthStar />,
    },
    {
        link: "/review/:eateryId",  // Dynamic link for Review page
        label: "Review",
        element: <Review onReviewSubmit={() => { console.log('Review submitted'); }} />,
    },
];
