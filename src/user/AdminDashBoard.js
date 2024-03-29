import React, {useEffect, useState} from 'react';
import Base from "../core/Base";
import {getUserClasses, createClass, enrollIntoClass, getUnSubmittedAssignments} from "./helper/userapicalls";
import {ClassList} from "./helper/ClassList";

const AdminDashBoard = () => {

    const [userInfo, setUserInfo] = useState({
        name: "",
        _id: "",
        email: "",
        role: 1
    });

    const [cls, setCls] = useState([]);

    const [loading, setLoading] = useState(true);

    const [createClassCode, setCreateClassCode] = useState('');

    const [createSubjectName, setCreateSubjectName] = useState('');

    const [displayClassForm, setDisplayClassForm] = useState("none");

    const [displayMainContent, setDisplayMainContent] = useState("");

    const [err, setErr] = useState({
        subjectError: '',
        codeError: ''
    })

    const [logoColor, setLogoColor] = useState('')

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
            getUserClasses(userInfo._id).then(data => {
                setCls([...data]);
                if(typeof window !== "undefined") {
                    localStorage.setItem("classes", JSON.stringify(data));
                }
            });
            setLogoColor(backgroundColorPicker());
            setLoading(false);
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

    const handleClassFrom = name => event => {
        name === 'course_code' ? setCreateClassCode(event.target.value) : setCreateSubjectName(event.target.value);
        setErr({
            subjectError: '',
            codeError: ''
        });
    }

    const handleCreateClass = () => {
        if(createSubjectName === '') {
            setErr({...err, subjectError: 'This field cannot be empty!'});
            return;
        }
        if(createClassCode === '') {
            setErr({...err, codeError: 'This field cannot be empty!'});
            return;
        }
        setLoading(true);
        createClass(createSubjectName, createClassCode)
            .then(data => {
                console.log(data);
                enrollIntoClass(createClassCode)
                    .then(data => {
                        console.log(data);
                        setLoading(false);
                        closeForm();
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
               console.log(err);
            });
    }

    const classCreateForm = () => {
        return (
            <div className="card w-25 mx-auto border" style={{display: displayClassForm}}>
                <form className="m-3 p-4 border border-secondary rounded">
                    <div className="mb-3">
                        <label className="form-label text-dark">Subject Name {err.subjectError && <span className='text-danger'>{err.subjectError}</span>}</label>
                        <input type="text" className="form-control rounded" reqiured placeholder="Enter the subject name" onChange={handleClassFrom('subject')}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-dark">Course Code {err.codeError && <span className="text-danger">{err.codeError}</span>}</label>
                        <input type="text" className="form-control rounded" reqiured placeholder="Enter the Course Code" onChange={handleClassFrom('course_code')}/>
                    </div>
                    <div className="d-flex">
                        <button className="btn btn-lg btn-outline-danger d-inline-block flex-grow-1 rounded m-2" onClick={closeForm}>Exit</button>
                        <button className="btn btn-lg btn-success d-inline-block flex-grow-1 rounded m-2" onClick={handleCreateClass}>Create Class</button>
                    </div>
                </form>
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
        window.location.reload(false);
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
                        <button className="btn btn-lg btn-outline-success float-right rounded" onClick={displayForm}>Create Class</button>
                    </div>
                    <hr/>
                    <div className="row align-items-start" style={{display: displayMainContent}}>
                        <ClassList cls={cls} isAdmin={true}/>
                    </div>
                    {classCreateForm()}
                </div>
            )}
        </Base>
    );
};

export default AdminDashBoard;
