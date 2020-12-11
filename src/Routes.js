import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./core/Home"
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AdminRoute from "./auth/helper/AdminRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/signin' exact component={Signin}/>
                <Route path='/signup' exact component={Signup}/>
                <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;