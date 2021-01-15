import {API} from "../../backend";
import {isAuthenticated} from "../../auth/helper";
import axios from 'axios';

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
    const url = `${API}/class//get-faculty-uploads/${course_code}`;
    return fetch(url, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}

export const leaveClass = (course_code) => {
    const url = `${API}/class/leave-class`;
    const details = {
        _id: isAuthenticated().user._id,
        course_code: course_code
    };
    return fetch(url, {
        method: "DELETE",
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

export const getClassAssignments = (course_code) => {
    const url = `${API}/assignment/my-assignments/${course_code}`;
    return fetch(url, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err);
        });
}

export const deleteClass = (course_code) => {
    const url = `${API}/class/delete-class/${course_code}`;
    return fetch(url, {
        method: "DELETE"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });

}

export const postMaterial = (formData) => {
    const url = `${API}/class/post`;
    const classes = JSON.parse(localStorage.getItem("classes"));
    const cur_class = classes.filter(cls => cls.course_code === formData.course_code);
    console.log(cur_class);
    let fd = new FormData();
    fd.append('faculty_id', isAuthenticated().user._id);
    fd.append('class_id', cur_class[0]._id);
    fd.append('course_code', formData.course_code);
    fd.append('title', formData.title);
    fd.append('description', formData.description);
    fd.append('links', formData.link);
    if(formData.attachment) {
        fd.append('attachment', formData.attachment, formData.attachment.name);
    }
    return axios.post(url, fd)
        .then(response => {
            console.log(response);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
    console.log(fd);
}

export const postAssignment = (formData) => {
    const url = `${API}/assignment/post/new`;
    const fd = new FormData();
    fd.append('title', formData.title);
    fd.append('description', formData.description);
    fd.append('course_code', formData.course_code);
    fd.append('marks', formData.marks);
    fd.append('due_date', formData.due_date);
    if(formData.questions) {
        fd.append('questions', formData.questions, formData.questions.name);
    }
    console.log(fd);
    return axios.post(url, fd)
        .then(response => {
            console.log(response);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
}

export const getUserSubmissionsInClass = (course_code) => {
    const _id = isAuthenticated().user._id;
    console.log(course_code);
    const url = `${API}/assignment/get-all-user-submissions/${course_code}/${_id}`;
    console.log(url);
    return fetch(url, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err);
        });
}

export const getAllChatsInClass = (course_code) => {
    const url = `${API}/discussion/class/${course_code}`;
    return fetch(url, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
}

export const getAllUsersInClass = (course_code) => {
    const url = `${API}/user/get_all_in_class/${course_code}`;
    return fetch(url, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}

export const postChat = (course_code, message) => {
    const url = `${API}/discussion/post/${course_code}`;
    const msgData = {
        _id: isAuthenticated().user._id,
        message: message
    }
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(msgData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}

export const getAssignmentSubmissions = (assignment_id) => {
    const url = `${API}/assignment/get-submissions/${assignment_id}`;
    return fetch(url, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}

export const submitAssignment = (formData) => {
    const url = `${API}/assignment/submit`;
    const user_id = isAuthenticated().user._id;
    const fd = new FormData();
    fd.append('user_id', user_id);
    fd.append('assignment_id', formData.assignment_id);
    if(formData.submission) {
        fd.append('submission', formData.submission, formData.submission.name);
    }
    return axios.post(url, fd)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
        })
}

export const scoreAssignment = (data) => {
    const url = `${API}/assignment/evaluate`;
    console.log(JSON.stringify(data));
    return axios.put(url, data)
        .then(response => {
            return response.data;
        })
        .catch(err => console.log(err));

}

export const editFacultyPost = (formData) => {
    const url = `${API}/class/edit-post`;
    let fd = new FormData();
    fd.append('_id', formData._id);
    fd.append('title', formData.title);
    fd.append('description', formData.description);
    if(formData.attachment) {
        fd.append('attachment', formData.attachment, formData.attachment.name);
    } else {
        fd.append('file', formData.file);
    }
    return axios.put(url, fd)
        .then(response => {
            console.log(response);
            return response.data;
        })
        .catch(err => {
            console.error(err);
        });
}

export const deletePost = (_id) => {
    const url = `${API}/class/delete-post/${_id}`;
    return axios.delete(url)
        .then(response => {
            return response.data;
        })
        .catch(err => console.error(err));
}

export const getUnSubmittedAssignments = () => {
    const user_id = isAuthenticated().user._id;
    const classList = JSON.parse(localStorage.getItem('classes')).map(cls => cls.course_code).join(',');
    const url = `${API}/assignment/get-unsubmitted-count?array=${classList}&user_id=${user_id}`;
    return axios.get(url)
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(err => {
            console.error(err);
        })
}

export const getUnreadNotifications = () => {
    const user_id = isAuthenticated().user._id;
    const classList = JSON.parse(localStorage.getItem('classes')).map(cls => cls.course_code).join(',');
    const url = `${API}/class/get-unread-notifications?array=${classList}&user_id=${user_id}`;
    return axios.get(url)
        .then(response => response.data)
        .catch(err => console.error(err));
}
