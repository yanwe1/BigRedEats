//import { HeaderSimple } from "../components/Header";
//import { PATHS } from "../constants/Navigation";
import { Outlet } from "react-router-dom";

const RootLayout = () => (
    <div>
        <div>
            <Outlet />
        </div>
    </div>
);

export default RootLayout;
