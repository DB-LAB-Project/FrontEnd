import React, {useState, useEffect} from 'react';
import Zoom from 'react-reveal/Zoom'
import {getAllUsersInClass, getAssignmentSubmissions} from "./userapicalls";
import Base from "../../core/Base";
import UploadDisplay from "./uploadDisplay";
import {scoreAssignment} from "./userapicalls";

const AdminSubmissionView = (props) => {

    const [userInfo, setUserInfo] = useState({
        name: "",
        _id: "",
        email: "",
        role: 1
    });

    const [loading, setLoading] = useState(true);

    const [submitDisplay, setSubmitDisplay] = useState("none");

    const [assignId, setAssignId] = useState('');

    const [assignSubmissions, setAssignSubmissions] = useState([]);

    const [usersInClass, setUsersInClass] = useState([]);

    const [assignemnts, setAssignments] = useState([]);

    const [logoColor, setLogoColor] = useState('');

    const [marks, setMarks] = useState(null);

    const [errId, setErrId] = useState(null);

    const [marksError, setMarksError] = useState('');

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
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("jwt")).user;
        let {name, _id, email, role} = user;
        setUserInfo({...userInfo, name: name, _id: _id, email: email, role: role});
        setAssignId(props.match.params._id);
        console.log(props.match.params._id);
        getAllUsersInClass(props.match.params.course_code)
            .then(data => {
                data = data.filter(ele => ele.role !== 1)
                setUsersInClass(data);
                getAssignmentSubmissions(props.match.params._id)
                    .then(data => {
                        setAssignSubmissions(data);
                        console.log(data);
                        setLoading(false);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });

        setAssignments(JSON.parse(localStorage.getItem('assignments')));
        setLogoColor(backgroundColorPicker());
    }, []);

    const handleSubmitFormChange = (event) => {
        setMarks(event.target.value);
        setMarksError('');
        setErrId('');
    }

    const displaySubmitForm = (assignment_id) => {
        setSubmitDisplay("");
        setAssignId(assignment_id);
    }

    const closeSubmitForm = (assignment_id) => {
        setSubmitDisplay("none");
        setAssignId('');
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

    const handleSubmit = (event, submission_user_id) => {
        event.preventDefault();
        const max_marks = assignemnts.filter(assignment => assignment._id === props.match.params._id)[0].marks;
        const assignedMarks = marks;
        if(assignedMarks > max_marks) {
            setMarksError('The assigned marks is more than the maximum marks to be awarded for this assignment! Please verify it!');
            setErrId(submission_user_id);
            return;
        }
        else if(marks === null) {
            setMarksError('This field cannot br empty!');
            setErrId(submission_user_id);
            return;
        }
        const data = {
            user_id: submission_user_id,
            assignment_id: props.match.params._id,
            marks: marks
        }
        console.log(data);
        scoreAssignment(data)
            .then(data => {
                console.log(data);
                window.location.reload(false);
                setMarks(null);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Base className="bg-dark text-white px-3 container-fluid mt-3 p-4">
            <hr/>
            {loading ? loadingMessage() : <div>
                <div>
                    <div style={{backgroundColor: logoColor, borderRadius: "50%", width: "49px", height: "49px", display: "inline-block", textAlign: "center"}}>
                        <h3 className="p-1 text-dark text-center d-inline-block">{userInfo.name.slice(0,2)}</h3>
                    </div>
                    {/*<img src={user} alt="" width="50px" height="50px" style={{backgroundColor: "white", borderRadius: "50%"}}/>*/}
                    <h3 className="text-white d-inline align-self-center pl-3">{userInfo.name}</h3>
                </div>
                <hr/>
                <div className='container'>
                    <h2 className="text-white">
                        {assignemnts.filter(assignment => assignment._id === props.match.params._id)[0].title}
                        <span className="float-right text-white">
                            Marks: {assignemnts.filter(assignment => assignment._id === props.match.params._id)[0].marks}
                        </span>
                        <br/>
                        <p className="float-right text-white pt-2">Submitted: {assignSubmissions.length}/{usersInClass.length}</p>
                    </h2>
                    <h6 className="text-white pt-3" style={{whiteSpace: "pre-line"}}>{assignemnts.filter(assignment => assignment._id === props.match.params._id)[0].description}</h6>
                    <p className="text-white pt-3">Due Date: {`${assignemnts.filter(assignment => assignment._id === props.match.params._id)[0].due_date} ${assignemnts.filter(assignment => assignment._id === props.match.params._id)[0].due_date_time}`}</p>
                    <p>Questions: <a href={`http://localhost:5000/${assignemnts.filter(assignment => assignment._id === props.match.params._id)[0].file}`} className='pt-3'>{assignemnts.filter(assignment => assignment._id === props.match.params._id)[0].file}</a></p>
                </div>

                <div className='container mt-3 pt-3'>
                    <h3 className='text-white'>Submissions: </h3>
                    <hr/>
                    {
                        assignSubmissions.length === 0 ? <h3 className='text-center text-white'>No Submissions yet</h3> : ''
                    }
                    {assignSubmissions && assignSubmissions.map((submission, idx) => {
                        return <div className="card rounded m-2">
                            <h5 className="card-header text-left text-dark d-inline-block">{submission.name}</h5>
                            <h6 className="card-body text-left text-dark d-1 d-inline-block pb-2 w-auto" style={{whiteSpace: 'pre-wrap'}}>Submission: <a href={`http://localhost:5000/${submission.file}`} target="_blank">{submission.file}</a> </h6>
                            <p className='text-dark p-4'>
                                Submitted on: {`${submission.submitted_on} ${submission.time}`}
                                {submission.submitted_late === 0 ? <span className='text-success float-right'>Submitted</span> : <span className='text-danger float-right'>Submitted Late</span>}
                            </p>
                            {submission.marks !== null ?
                                <p className='d-inline-block float-right card-body text-dark w-auto'>Marks: {submission.marks}
                                    <span className='input-group float-right w-25'>
                                        <input type="text" placeholder='Enter marks...' className='form-control' onChange={handleSubmitFormChange}/>
                                        <button className='btn btn-outline-success rounded' onClick={(event) => {handleSubmit(event, submission._id)}}>Update Score</button>
                                        {(submission._id === errId) ? (marksError ? <span className='text-danger'>{marksError}</span> : '') : ''}
                                    </span>
                                </p>
                                : <p className='d-inline-block float-right card-body text-dark w-auto'>
                                    Marks: Not Graded
                                    <span className='input-group float-right w-25'>
                                        <input type="text" placeholder='Enter marks...' className='form-control' onChange={handleSubmitFormChange}/>
                                        <button className='btn btn-outline-success rounded' onClick={(event) => {handleSubmit(event, submission._id)}}>Score</button>
                                        {(submission._id === errId) ? (marksError ? <span className='text-danger'>{marksError}</span> : '') : ''}
                                    </span>
                                </p>}
                        </div>
                    })}

                    <h3 className='text-white'>Not Yet Submitted: </h3>
                    <hr/>
                    {usersInClass && usersInClass.map(user => {
                        const submitted_users_list = assignSubmissions.map(sub => sub.usn);
                        console.log(submitted_users_list);
                        return !submitted_users_list.includes(user.usn) &&
                            <div className="card rounded m-2">
                                <h5 className="card-header text-dark p-3">
                                    {user.name}
                                </h5>
                                <p className="card-body text-dark">{user.usn}</p>
                            </div>

                    })}
                </div>
            </div>}
        </Base>

    );
};

export default AdminSubmissionView;

