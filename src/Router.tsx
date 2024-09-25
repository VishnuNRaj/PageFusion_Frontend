import { Router, Route } from "wouter"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Verify from "./pages/Verify"
import Dashboard from "./pages/Dashboard"
import Create from "./pages/Create"
import Edit from "./pages/Edit"
import Canvas from "./pages/Canvas"
import Upload from "./pages/Upload"
import View from "./pages/Viewer"

export default function RouterConfig() {
    return (
        <Router>
            <Route path={"/login"} key={"login"} component={Login} />
            <Route path={"/signup"} key={"signup"} component={Signup} />
            <Route path={"/verify/:token"} key={"verify"} component={Verify} />
            <Route path={"/dashboard"} key={"dashboard"} component={Dashboard} />
            <Route path={"/create"} key={"create"} component={Create} />
            <Route path={"/edit"} key={"edit"} component={Edit} />
            <Route path={"/page"} key={"canvas"} component={Canvas} />
            <Route path={"/upload"} key={"upload"} component={Upload} />
            <Route path={"/pdf/:key"} key={"view"} component={View} />
        </Router>
    )
}