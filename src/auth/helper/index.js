import {API} from '../../backend';

export const signup = user => {
    return fetch(`${API}/auth/signup`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}

export const signin = user => {
    return fetch(`${API}/auth/signin`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}

export const storeCredentials = (data, next) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}

export const signout = next => {
    if(typeof window !== "undefined") {
        const _id = isAuthenticated().user._id;
        localStorage.clear();
        fetch(`${API}/auth/signout/${_id}`, {
            method: "GET"
        })
            .then(response => console.log('Signout Success'))
            .catch(err => console.log(err));
        next();
    }
}

export const isAuthenticated = () => {
    if(typeof window === "undefined") {
        return false;
    }
    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
}
