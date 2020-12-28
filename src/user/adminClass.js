import React, {useEffect, useState} from 'react';
import Base from "../core/Base";
import {getClassItems, leaveClass, deleteClass, postMaterial, getAllUsersInClass} from "./helper/userapicalls";
import {Redirect, Link} from 'react-router-dom'
import UploadDisplay from "./helper/uploadDisplay";

const AdminClass = (props) => {

    const [userInfo, setUserInfo] = useState({
        name: "",
        _id: "",
        email: "",
        role: 1
    });

    const [loading, setLoading] = useState(true);

    const [classUploads, setClassUploads] = useState([]);

    const [errors, setErrors] = useState({});

    const [logoColor, setLogoColor] = useState('');

    const [displayClassForm, setDisplayClassForm] = useState("none");

    const [DeleteForm, setDeleteForm] = useState("none");

    const [PostForm, setPostForm] = useState("none");

    const [redirect, setRedirect] = useState(false);

    const [displayMainContent, setDisplayMainContent] = useState("");

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        course_code: props.match.params.course_code,
        link: null,
        attachment: null
    });

    const colors = [
        "#ade8f4",
        "#e6b8a2",
        "#01CBC6",
        "#b7e4c7",
        "#faedcd",
        "#fefae0",
        "#80ffdb",
        "#00CCCD",
        "#F5BCBA"
    ];

    const backgroundColorPicker = () => {
        const num = Math.floor(Math.random() * 9);
        return colors[num];
    }

    useEffect(() => {
        if(typeof window !== 'undefined') {
            const user = JSON.parse(localStorage.getItem("jwt")).user;
            let {name, _id, email, role} = user;
            setUserInfo({...userInfo, name: name, _id: _id, email: email, role: role});
            getClassItems(props.match.params.course_code)
                .then(data => {
                    setClassUploads(data);
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                })
            setLogoColor(backgroundColorPicker());
            getAllUsersInClass(props.match.params.course_code)
                .then(data => {
                    localStorage.setItem('class_users', JSON.stringify(data));
                    console.log(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, []);

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        );
    };

    // Leave Class
    const handleLeaveClass = () => {
        const course_code = props.match.params.course_code;
        setLoading(true);
        leaveClass(course_code)
            .then(data => {
                console.log(data);
                setLoading(false);
                setRedirect(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const leaveClassDialog = () => {
        return (
            <div className="card w-25 mx-auto border pt-4 mt-4" style={{display: displayClassForm}}>
                <div className="mb-3">
                    <p className='text-dark px-2'>Do you really want to leave the class? If you just want to exit to the dashboard, press the back arrow in the browser!</p>
                </div>
                <div className="d-flex">
                    <button className="btn btn-lg btn-outline-danger d-inline-block flex-grow-1 rounded m-2" onClick={closeForm}>Exit</button>
                    <button className="btn btn-lg btn-success d-inline-block flex-grow-1 rounded m-2" onClick={handleLeaveClass}>Leave Class</button>
                </div>
            </div>
        )
    };

    const displayForm = () => {
        setDisplayClassForm("");
        setDisplayMainContent("none");
    }

    const closeForm = () => {
        setDisplayClassForm("none");
        setDisplayMainContent("");
    }

    // Delete Class
    const handleDeleteClass = () => {
        const course_code = props.match.params.course_code;
        setLoading(true);
        deleteClass(course_code)
            .then(data => {
                console.log(data);
                setLoading(false);
                setRedirect(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const deleteClassDialog = () => {
        return (
            <div className="card w-25 mx-auto border pt-4 mt-4" style={{display: DeleteForm}}>
                <div className="mb-3">
                    <p className='text-dark px-2'>Do you really want to delete the class?</p>
                </div>
                <div className="d-flex">
                    <button className="btn btn-lg btn-outline-primary d-inline-block flex-grow-1 rounded m-2" onClick={closeDeleteForm}>No</button>
                    <button className="btn btn-lg btn-outline-danger d-inline-block flex-grow-1 rounded m-2" onClick={handleDeleteClass}>Delete Class</button>
                </div>
            </div>
        )
    };

    const displayDeleteForm = () => {
        setDeleteForm("");
        setDisplayMainContent("none");
    }

    const closeDeleteForm = () => {
        setDeleteForm("none");
        setDisplayMainContent("");
    }

    // Post Class Material
    const handlePostFormChange = name => event => {
        if(name === 'attachment') {
            setFormData({...formData, attachment: event.target.files[0]});
        } else {
            setFormData({...formData, [name]: event.target.value});
            setErrors({});
        }
    }

    const handlePostMaterial = (event) => {
        event.preventDefault();
        if(formData.title === '') {
            setErrors({...errors, titleError: "Title cannot be empty!"});
        }
        else if(formData.description === '') {
            setErrors({...errors, descriptionError: "Description cannot be empty!"});
        }
        else {
            setLoading(true);
            postMaterial(formData)
                .then(data => {
                    console.log(data);
                    setLoading(false);
                    closePostClassForm();
                })
                .catch(err => {
                    console.log(err)
                });
            console.log(formData);
            setFormData({title: '', description: '', course_code: props.match.params.course_code, link: null, attachment: null});
        }
    }

    const displayPostClassForm = () => {
        setPostForm("");
        setDisplayMainContent("none");
    }

    const closePostClassForm = () => {
        setPostForm("none");
        setDisplayMainContent("");
        window.location.reload(false);
    }

    const postClassDialog = () => {
        return (
            <div className="card w-25 mx-auto border" style={{display: PostForm}}>
                <form className="m-3 p-4 border border-secondary rounded" onSubmit={handlePostMaterial}>
                    <div className="mb-3">
                        <label className="form-label text-dark">Title {errors.titleError && <p className="text-danger">{errors.titleError}</p>}</label>
                        <input type="text" className="form-control rounded" required="required" placeholder="Enter the title" onChange={handlePostFormChange('title')}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-dark">Description {errors.descriptionError && <p className="text-danger">{errors.descriptionError}</p>}</label>
                        <textarea type="text" className="form-control rounded" required="required" placeholder="Enter the description" onChange={handlePostFormChange('description')} style={{whiteSpace: "pre-line"}}/>
                    </div>
                    {/*<div className="mb-3">*/}
                    {/*    <label className="form-label text-dark">Link</label>*/}
                    {/*    <input type="text" className="form-control rounded" required="required" placeholder="Enter the link (if any)..." onChange={handlePostFormChange('link')} style={{whiteSpace: "pre-line"}} multiline={true}/>*/}
                    {/*</div>*/}
                    <div className="mb-3">
                        <label className="form-label text-dark">File</label>
                        <input type="file" className="form-control" placeholder="Choose the file you want to upload" onChange={handlePostFormChange('attachment')}/>
                    </div>
                    {/*<div className="mb-3">*/}
                    {/*    <label className="form-label text-dark">Course Code</label>*/}
                    {/*    <input type="text" className="form-control rounded" reqiured placeholder="Enter the Course Code" onChange={handlePostFormChange('course_code')}/>*/}
                    {/*</div>*/}
                    {/*<div className="mb-3">*/}
                    {/*    <label className="form-label text-dark">Marks</label>*/}
                    {/*    <input type="text" className="form-control rounded" reqiured placeholder="Enter the Course Code" onChange={handlePostFormChange('marks')}/>*/}
                    {/*</div>*/}
                    {/*<div className="mb-3">*/}
                    {/*    <label className="form-label text-dark">Due Date</label>*/}
                    {/*    <input type="datetime-local" className="form-control rounded" reqiured placeholder="Enter the Course Code" onChange={handlePostFormChange('due_date')}/>*/}
                    {/*</div>*/}
                    <div className="d-flex">
                        <button className="btn btn-lg btn-outline-danger d-inline-block flex-grow-1 rounded m-2" onClick={closePostClassForm}>Exit</button>
                        <button className="btn btn-lg btn-success d-inline-block flex-grow-1 rounded m-2" onClick={handlePostMaterial}>Post Material</button>
                    </div>
                </form>
            </div>
        );
    };

    const displayPostForm = () => {
        setDeleteForm("");
        setDisplayMainContent("none");
    }

    const closePostForm = () => {
        setDeleteForm("none");
        setDisplayMainContent("");
    }


    return (
        <Base className="bg-dark text-white px-3 container-fluid mt-3 p-4">
            <hr/>
            {loading ? loadingMessage() : (
                <div>
                    <div>
                        <div style={{backgroundColor: logoColor, borderRadius: "50%", width: "49px", height: "49px", display: "inline-block", textAlign: "center"}}>
                            <h3 className="p-1 text-dark text-center d-inline-block">{userInfo.name.slice(0,2)}</h3>
                        </div>
                        {/*<img src={user} alt="" width="50px" height="50px" style={{backgroundColor: "white", borderRadius: "50%"}}/>*/}
                        <h3 className="text-white d-inline align-self-center pl-3">{userInfo.name}</h3>
                        {redirect ? <Redirect to='/admin/dashboard'/> : <> </>}
                        <button className="btn btn-lg btn-outline-danger float-right rounded mx-2" onClick={displayDeleteForm}>Delete Class</button>
                        <button className="btn btn-lg btn-outline-warning float-right rounded mx-2" onClick={displayForm}>Leave Class</button>
                        <Link to={`/admin/dashboard/my-class/${props.match.params.course_code}/assignments`}>
                            <button className="btn btn-lg btn-outline-primary float-right rounded mx-2">Assignments</button>
                        </Link>
                        <button className="btn btn-lg btn-outline-success float-right rounded mx-2" onClick={displayPostClassForm}>Post Class Material</button>
                        <Link to={`/discussion-group/${props.match.params.course_code}`}>
                            <button className="btn btn-lg btn-outline-info float-right rounded mx-2">Discussion Group</button>
                        </Link>
                    </div>
                    <hr/>
                    <div className="container" style={{display: displayMainContent}}>
                        <h2 className="text-white text-center mb-3">{JSON.parse(localStorage.getItem('classes')).filter(cls => cls.course_code === props.match.params.course_code)[0].subject}:&nbsp; Course Material </h2>
                        <UploadDisplay uploads={classUploads} isAssignment={false} course_code={props.match.params.course_code}/>
                    </div>
                    {leaveClassDialog()}
                    {deleteClassDialog()}
                    {postClassDialog()}
                </div>
            )}
        </Base>
    );
};

export default AdminClass;
