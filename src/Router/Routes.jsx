import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import RegisterComponent from '../components/register/RegisterComponent';
import DashboardPage from '../Pages/Dashboard/DashboardPage';
import LoginComponent from './../components/Login/LoginComponent'
function Routes() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <LoginComponent />
                    </Route>
                    <Route path="/login">
                        <LoginComponent />
                    </Route>
                    <Route path="/signUp">
                        <RegisterComponent />
                    </Route>
                    <Route path="/dashboard">
                        <DashboardPage />
                    </Route>
                    <Route path="/archive">
                        <DashboardPage />
                    </Route>
                    <Route path="/trash">
                        <DashboardPage />
                    </Route>
                </Switch>
            </Router>
        </>
    )
}

export default Routes