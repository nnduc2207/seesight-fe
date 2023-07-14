import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Switch } from "react-router"
import Login from "./components/Login/Login"
import Home from "./components/Home/Home"
import Layout from "./components/hoc/Layout/Layout"
import AuthRequired from "./components/hoc/AuthRequired"
import UserProfile from "./components/UserProfile/UserProfile"

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/userprofile" component={AuthRequired(Layout(UserProfile))} />
                <Route path="/" component={AuthRequired(Layout(Home))} />
            </Switch>
        </div>
    )
}

export default App
