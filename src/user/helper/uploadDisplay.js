import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import Zoom from 'react-reveal/Zoom';
import EditPostForm from "./EditPostForm";
import {isAuthenticated} from "../../auth/helper";
import {Link} from "react-router-dom";
import {deletePost, postMaterial, submitAssignment} from "./userapicalls";

const UploadDisplay = (props) => {

    const [submitDisplay, setSubmitDisplay] = useState("none");

    const [assignId, setAssignId] = useState('');

    const [PostForm, setPostForm] = useState("none");

    const [loading, setLoading] = useState(false);

    const [displayMainContent, setDisplayMainContent] = useState("");

    const [errors, setErrors] = useState({});

    const [upload, setUpload] = useState({
        title: '',
        description: '',
        link: '',
        file: ''
    });

    const [formData, setFormData] = useState({
        assignment_id: '',
        file: null
    });

    const [fileError, setFileError] = useState('');

    const handleSubmitFormChange = (event) => {
        setFormData({...formData, file: event.target.files[0]});
        setFileError('');
    }

    const displaySubmitForm = (assignment_id) => {
        setSubmitDisplay("");
        setAssignId(assignment_id);
    }

    const closeSubmitForm = (assignment_id) => {
        setSubmitDisplay("none");
        setAssignId('');
    }


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

    // const handlePostFormChange = name => event => {
    //     if(name === 'attachment') {
    //         setPostFormData({...postFormData, attachment: event.target.files[0]});
    //     } else {
    //         setPostFormData({...postFormData, [name]: event.target.value});
    //         setErrors({});
    //     }
    // }

    // const handlePostMaterial = (event) => {
    //     event.preventDefault();
    //     if(postFormData.title === '') {
    //         setErrors({...errors, titleError: "Title cannot be empty!"});
    //     }
    //     else if(postFormData.description === '') {
    //         setErrors({...errors, descriptionError: "Description cannot be empty!"});
    //     }
    //     else {
    //         setLoading(true);
    //         postMaterial(postFormData)
    //             .then(data => {
    //                 console.log(data);
    //                 setLoading(false);
    //                 closePostClassForm();
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             });
    //         console.log(formData);
    //         // setPostFormData({title: '', description: '', course_code: props.course_code, link: null, attachment: null});
    //     }
    // }

    // const postClassDialog = (classUpload) => {
    //     return (
    //         <div className="card w-50 mx-auto border" style={{display: PostForm}}>
    //             <form className="m-3 p-4 border border-secondary rounded" onSubmit={handlePostMaterial}>
    //                 <div className="mb-3">
    //                     <label className="form-label text-dark">Title {errors.titleError && <p className="text-danger">{errors.titleError}</p>}</label>
    //                     <input type="text" className="form-control rounded" required="required" placeholder="Enter the title" name='title' />
    //                 </div>
    //                 <div className="mb-3">
    //                     <label className="form-label text-dark">Description {errors.descriptionError && <p className="text-danger">{errors.descriptionError}</p>}</label>
    //                     <textarea type="text" className="form-control rounded" required="required" placeholder="Enter the description" name='description'  style={{whiteSpace: "pre-line"}} />
    //                 </div>
    //                 <div className="mb-3">
    //                     <label className="form-label text-dark">Link</label>
    //                     <input type="text" className="form-control rounded" required="required" placeholder="Enter the link (if any)..." name='link'  multiline={true} />
    //                 </div>
    //                 <div className="mb-3">
    //                     <label className="form-label text-dark">File</label>
    //                     <input type="file" className="form-control" placeholder="Choose the file you want to upload" name='file' />
    //                 </div>
    //                 {/*<div className="mb-3">*/}
    //                 {/*    <label className="form-label text-dark">Course Code</label>*/}
    //                 {/*    <input type="text" className="form-control rounded" reqiured placeholder="Enter the Course Code" onChange={handlePostFormChange('course_code')}/>*/}
    //                 {/*</div>*/}
    //                 {/*<div className="mb-3">*/}
    //                 {/*    <label className="form-label text-dark">Marks</label>*/}
    //                 {/*    <input type="text" className="form-control rounded" reqiured placeholder="Enter the Course Code" onChange={handlePostFormChange('marks')}/>*/}
    //                 {/*</div>*/}
    //                 {/*<div className="mb-3">*/}
    //                 {/*    <label className="form-label text-dark">Due Date</label>*/}
    //                 {/*    <input type="datetime-local" className="form-control rounded" reqiured placeholder="Enter the Course Code" onChange={handlePostFormChange('due_date')}/>*/}
    //                 {/*</div>*/}
    //                 <div className="d-flex">
    //                     <button className="btn btn-lg btn-outline-danger d-inline-block flex-grow-1 rounded m-2" onClick={closePostClassForm}>Exit</button>
    //                     <button className="btn btn-lg btn-success d-inline-block flex-grow-1 rounded m-2" onClick={handlePostMaterial}>Post Material</button>
    //                 </div>
    //             </form>
    //         </div>
    //     );
    // };

    const classUploads = props.uploads;
    const isAssignment = props.isAssignment;
    const isStudent = props.isStudent;
    let submissions = null
    let submitted_assignments = [];
    if(isStudent && isAssignment) {
        submissions = JSON.parse(localStorage.getItem('submissions'));
        console.log(submissions);
        submitted_assignments = submissions.map(submission => submission["assignment_id"]);
    }
    if(classUploads.length === 0) {
        return (
            <h1 className="text-white text-center">No uploads found in the class</h1>
        );
    }

    // const handleEdit = (classUpload) => {
    //     setUpload({...upload, ...classUpload});
    //     displayPostClassForm();
    //     console.log(upload);
    // }

    const handleSubmit = (assignment_id) => {

        // setFormData({...formData, assignment_id: assignment_id});
        if(!formData.file) {
            setFileError('Please select a file before submitting the assignment!');
            return;
        }
        // console.log(formData);
        const data = {
            user_id: formData.user_id,
            assignment_id: assignment_id,
            submission: formData.file
        }
        submitAssignment(data)
            .then(data => {
                console.log(data);
                window.location.reload(false);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const deletePostHandler = (_id) => {
        console.log(_id);
        deletePost(_id)
            .then(data => {
                window.location.reload(false);
            });
    }

    return (
                <div style={{display: displayMainContent}}>

                        {classUploads.map((classUpload, idx) => {
                            return <div className="card rounded m-2" key={idx} style={{display: displayMainContent}}>
                                <h5 className="card-header text-left text-dark d-inline-block">{classUpload.title} {isAssignment && <p className="text-left text-dark float-right d-inline-block m-0">Marks: {classUpload.marks}</p>}</h5>
                                <h6 className="card-body text-left text-dark d-1 d-inline-block pb-0" style={{whiteSpace: 'pre-wrap'}}>{classUpload.description} &nbsp;
                                    {isAssignment && <p className="d-inline-block float-right text-right">Uploaded on: {classUpload["upload_date"]} {classUpload["upload_time"]} <br/> Due Date: {classUpload["due_date"]} {classUpload["due_date_time"]}</p>}
                                    {!isAssignment && <p className="d-inline-block float-right text-right">Uploaded on: {classUpload["uploaded_on"]} {classUpload.time}</p>}
                                </h6>
                                {classUpload.file ?
                                    <p className="d-inline-block card-body text-left text-dark py-0">{isAssignment ? 'questions' : 'attachment'}: <a href={`http://localhost:5000/${classUpload.file}`} target="_blank">{classUpload.file}</a>
                                        {isAssignment && isStudent && <button className="btn btn-success rounded d-inline float-right w-25" onClick={() => {displaySubmitForm(classUpload._id)}}>{(submitted_assignments.includes(classUpload._id) ? 'Submitted' : 'Submit Assignment')}</button>}
                                        {isAssignment && !isStudent && <Link to={`/admin/dashboard/my-class/${classUpload.course_code}/assignments/view-submissions/${classUpload._id}`}><button className="btn btn-success rounded d-inline float-right w-25" onClick={() => {displaySubmitForm(classUpload._id)}}>View Submissions</button></Link>}</p>
                                    : <p></p>}

                                {!isStudent && <span className='float-right pl-4'>
                                    <Link to={{pathname: `/admin/dashboard/my-class/${props.course_code}/edit-post`, classUpld: classUpload}}>
                                        <button className="btn btn-warning m-1 rounded">Edit</button>
                                    </Link>
                                    <button className="btn btn-danger m-1 rounded" onClick={() => deletePostHandler(classUpload._id)}>Delete</button>
                                </span>}

                                {/*{isAuthenticated().user._id === classUpload.}*/}
                                <hr/>
                                {isStudent && <div className="card-body text-dark" style={{display: (classUpload._id === assignId) ? submitDisplay : "none"}}>
                                    {submitted_assignments.includes(classUpload._id) && <p className="d-inline-block float-right">{submissions.filter(sub => sub["assignment_id"] === classUpload._id)[0].submitted_late === 0 ? <span className="text-success">Submitted</span> : <span className="text-danger">Submitted Late</span>}</p>}
                                    {submitted_assignments.includes(classUpload._id) && <p>Marks: {submissions.filter(sub => sub["assignment_id"] === classUpload._id)[0].marks ? <span className='text-dark'>{submissions.filter(sub => sub["assignment_id"] === classUpload._id)[0].marks}</span>  : 'Not Graded'}</p>}
                                    {submitted_assignments.includes(classUpload._id) && <p>Submission: <a href={`http://localhost:5000/${submissions.filter(sub => sub["assignment_id"] === classUpload._id)[0].file}`}>{submissions.filter(sub => sub["assignment_id"] === classUpload._id)[0].file ? submissions.filter(sub => sub["assignment_id"] === classUpload._id)[0].file : 'Could not find File upload'}</a></p>}
                                    {submitted_assignments.includes(classUpload._id) && <button className="btn btn-primary btn-md float-right d-inline-block rounded" onClick={() => {closeSubmitForm(classUpload._id)}}>Close</button>}
                                    {!submitted_assignments.includes(classUpload._id) && <><p>Select File: <input type="file" className="form-control" onChange={handleSubmitFormChange}/></p> {fileError && <p className='text-danger'>This field cannot be empty!</p>}</>}
                                    {!submitted_assignments.includes(classUpload._id) && <button className="btn btn-primary btn-md float-right d-inline-block rounded m-2" onClick={() => {closeSubmitForm(classUpload._id)}}>Close</button>}
                                    {!submitted_assignments.includes(classUpload._id) && <button className="btn btn-primary btn-md float-right d-inline-block rounded m-2" onClick={() => {handleSubmit(classUpload._id)}}>Submit Assignment</button>}
                                </div>}
                            </div>
                        })}
            </div>
    );
};

export default UploadDisplay;

