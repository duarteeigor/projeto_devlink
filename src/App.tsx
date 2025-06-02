import { createBrowserRouter} from "react-router-dom";
import {Private} from "./routes/Private"

import {Home} from "./pages/home"
import {Login} from "./pages/login"
import {SocialMedia} from "./pages/social-media"
import {Admin} from "./pages/admin"
import { NotFound } from "./pages/notFound";

const router = createBrowserRouter([
    {
        element: <Home/>,
        path:"/"
    },
    {
        element: <Login/>,
        path:"/login"
    },
    {
        element: <Private><Admin/></Private>,
        path:"/admin"
    },
    {
        element: <Private><SocialMedia/></Private>,
        path:"/admin/social"
    },
    {
        element: <NotFound/>,
        path:"*"
    }
]);

export {router};