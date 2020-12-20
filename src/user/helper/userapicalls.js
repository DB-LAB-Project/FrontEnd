import {API} from "../../backend";
import {isAuthenticated} from "../../auth/helper";


export const getUserClasses = () => {
    const _id = isAuthenticated().user._id;
    const url = `${API}/class/get-my-classes/${_id}`;
    return fetch(url,{
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.error(err);
        })
}

export const enrollIntoClass = (course_code) => {
    const url = `${API}/class/enroll`;
    const _id = isAuthenticated().user._id;
    const details = {
        _id: _id,
        course_code: course_code
    }
    console.log(JSON.stringify(details));
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(details)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}

export const createClass = (subject, course_code) => {
    const url = `${API}/class/create`;
    const details = {
        subject,
        course_code
    }
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(details)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}

export const getClassItems = (course_code) => {
    const url = `${API}/class/`
}
