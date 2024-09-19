import { Router, Route } from "wouter"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

export default function RouterConfig() {
    return (
        <Router>
            <Route path={"/login"} key={"login"} component={Login} />
            <Route path={"/signup"} key={"signup"} component={Signup} />
        </Router>
    )
}