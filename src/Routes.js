import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./core/Home"
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AdminRoute from "./auth/helper/AdminRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AdminClass from "./user/adminClass";
import AdminAssignment from "./user/adminAssignment";
import UserClass from "./user/userClass";
import UserAssignment from "./user/userAssignment";
import DiscussionGroup from "./user/discussionGroup";
import AdminSubmissionView from "./user/helper/adminSubmissionView";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/signin' exact component={Signin}/>
                <Route path='/signup' exact component={Signup}/>
                <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
                <PrivateRoute path="/user/dashboard/my-class/:course_code" exact component={UserClass} />
                <PrivateRoute path="/user/dashboard/my-class/:course_code/assignments" exact component={UserAssignment} />
                <PrivateRoute path="/discussion-group/:course_code" exact component={DiscussionGroup} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
                <AdminRoute path="/admin/dashboard/my-class/:course_code" exact component={AdminClass} />
                <AdminRoute path="/admin/dashboard/my-class/:course_code/assignments" exact component={AdminAssignment} />
                <AdminRoute path="/admin/dashboard/my-class/:course_code/assignments/view-submissions/:_id" exact component={AdminSubmissionView} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
