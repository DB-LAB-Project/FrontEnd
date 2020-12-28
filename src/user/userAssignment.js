import React, {useEffect, useState} from 'react';
import Base from "../core/Base";
import {getClassAssignments, getUserSubmissionsInClass, postAssignment} from "./helper/userapicalls";
import {Link, Redirect} from "react-router-dom";
import UploadDisplay from "./helper/uploadDisplay";

const UserAssignment = (props) => {

    const [userInfo, setUserInfo] = useState({
        name: "",
        _id: "",
        email: "",
        role: 1
    });

    const [loading, setLoading] = useState(true);

    const [assignmentUploads, setAssignmentUploads] = useState([]);

    const [logoColor, setLogoColor] = useState('');

    // const [displayMainContent, setDisplayMainContent] = useState("");
    //
    // const [formData, setFormData] = useState({
    //     title: '',
    //     description: '',
    //     course_code: props.match.params.course_code,
    //     marks: null,
    //     due_date: '',
    //     questions: null
    // });

    const [PostForm, setPostForm] = useState("none");

    const [errors, setErrors] = useState({});

    const colors = [
        "#ade8f4",
        "#e6b8a2",
        "#01CBC6",
        "#b7e4c7",
        "#faedcd",
        "#fefae0",
        "#80ffdb",
        "#f3c4fb",
        "#F5BCBA"
    ];

    useEffect(() => {
        if(typeof window !== 'undefined') {
            const user = JSON.parse(localStorage.getItem("jwt")).user;
            let {name, _id, email, role} = user;
            setUserInfo({...userInfo, name: name, _id: _id, email: email, role: role});
            getClassAssignments(props.match.params.course_code)
                .then(data => {
                    setAssignmentUploads(data);
                    localStorage.setItem('assignments', JSON.stringify(data));
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                })
            getUserSubmissionsInClass(props.match.params.course_code)
                .then(data => {
                    if(typeof window !== 'undefined') {
                        localStorage.setItem('submissions', JSON.stringify(data));
                    }
                    console.log(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
            setLogoColor(backgroundColorPicker());

        }
    }, []);


    const backgroundColorPicker = () => {
        const num = Math.floor(Math.random() * 9);
        return colors[num];
    }

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        );
    };

    // const handlePostFormChange = name => event => {
    //     if(name === 'questions') {
    //         setFormData({...formData, questions: event.target.files[0]});
    //     } else {
    //         setFormData({...formData, [name]: event.target.value});
    //         setErrors({});
    //     }
    // }

    // const handlePostAssignment = (event) => {
    //     event.preventDefault();
    //     if(formData.title === '') {
    //         setErrors({...errors, titleError: "Title cannot be empty!"})
    //     }
    //     else if(formData.description === '') {
    //         setErrors({...errors, descriptionError: "Description cannot be empty!"})
    //     }
    //     else if(formData.marks === null) {
    //         setErrors({...errors, marksError: "Marks cannot be empty!"})
    //     }
    //     else if(formData.due_date === '') {
    //         setErrors({...errors, due_dateError: "Due Date cannot be empty!"})
    //     }
    //     else {
    //         setLoading(true);
    //         postAssignment(formData)
    //             .then(data => {
    //                 console.log(data);
    //                 setLoading(false);
    //                 closePostClassForm();
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             });
    //     }
    //     // console.log(formData);
    // }

    // const displayPostClassForm = () => {
    //     setPostForm("");
    //     setDisplayMainContent("none");
    // }
    //
    // const closePostClassForm = () => {
    //     setPostForm("none");
    //     setDisplayMainContent("");
    //     window.location.reload(false);
    // }

    // const postAssignmentDialog = () => {
    //     return (
    //         <div className="card w-25 mx-auto border" style={{display: PostForm}}>
    //             <form className="m-3 p-4 border border-secondary rounded">
    //                 <div className="mb-3">
    //                     <label className="form-label text-dark">Title {errors.titleError && <p className="text-danger">{errors.titleError}</p>}</label>
    //                     <input type="text" className="form-control rounded" placeholder="Enter the title of the assignment" onChange={handlePostFormChange('title')}/>
    //                 </div>
    //                 <div className="mb-3">
    //                     <label className="form-label text-dark">Description {errors.descriptionError && <p className="text-danger">{errors.descriptionError}</p>}</label>
    //                     <input type="text" className="form-control rounded" placeholder="Enter assignment description" onChange={handlePostFormChange('description')}/>
    //                 </div>
    //                 <div className="mb-3">
    //                     <label className="form-label text-dark">Questions</label>
    //                     <input type="file" className="form-control rounded" placeholder="upload questions file" onChange={handlePostFormChange('questions')}/>
    //                 </div>
    //                 <div className="mb-3">
    //                     <label className="form-label text-dark">Marks {errors.marksError && <p className="text-danger">{errors.marksError}</p>}</label>
    //                     <input type="text" className="form-control rounded" placeholder="Enter the maximum marks for the assignment" onChange={handlePostFormChange('marks')}/>
    //                 </div>
    //                 <div className="mb-3">
    //                     <label className="form-label text-dark">Due Date {errors.due_dateError && <p className="text-danger">{errors.due_dateError}</p>}</label>
    //                     <input type="datetime-local" className="form-control rounded" placeholder="Enter the due date for the assignment submission" onChange={handlePostFormChange('due_date')}/>
    //                 </div>
    //                 <div className="d-flex">
    //                     <button className="btn btn-lg btn-outline-danger d-inline-block flex-grow-1 rounded m-2" onClick={closePostClassForm}>Exit</button>
    //                     <button className="btn btn-lg btn-success d-inline-block flex-grow-1 rounded m-2" onClick={handlePostAssignment}>Post Material</button>
    //                 </div>
    //             </form>
    //         </div>
    //     );
    // };


    return (
        <Base className="bg-dark text-white px-3 container-fluid mt-3 p-4">
            <hr/>
            {loading ? loadingMessage() : (
                <div>
                    <div>
                        <div style={{backgroundColor: logoColor, borderRadius: "50%", width: "49px", height: "49px", display: "inline-block", textAlign: "center"}}>
                            <h3 className="p-1 text-dark text-center d-inline-block">{userInfo.name.slice(0,2)}</h3>
                        </div>
                        <h3 className="text-white d-inline align-self-center pl-3">{userInfo.name}</h3>
                        {/*<button className="btn btn-lg btn-outline-success float-right rounded mx-2" onClick={displayPostClassForm}>Post Assignment</button>*/}
                    </div>
                    <hr/>
                    <div className="container">
                        <h2 className="text-white text-center mb-3">{JSON.parse(localStorage.getItem('classes')).filter(cls => cls.course_code === props.match.params.course_code)[0].subject}:&nbsp; Assignments </h2>
                        <UploadDisplay uploads={assignmentUploads} isAssignment={true} isStudent={true}/>
                    </div>
                </div>
            )}
        </Base>
    );
};

// style={{display: displayMainContent}}

export default UserAssignment;
