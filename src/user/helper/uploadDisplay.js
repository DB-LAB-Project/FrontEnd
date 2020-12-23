import React from 'react';
import {isAuthenticated} from "../../auth/helper";

const UploadDisplay = (props) => {
    const classUploads = props.uploads;
    const isAssignment = props.isAssignment;
    const isStudent = props.isStudent;
    let submissions = null
    let submitted_assignments = [];
    if(isStudent) {
        submissions = JSON.parse(localStorage.getItem('submissions'));
        submitted_assignments = submissions.map(submission => submission["assignment_id"]);
    }
    if(classUploads.length === 0) {
        return (
            <h1 className="text-white text-center">No uploads found in the class</h1>
        );
    }
    return (
        <div>
            {classUploads.map((classUpload, idx) => {
                return <div className="card rounded m-2" key={idx}>
                    <h5 className="card-header text-left text-dark d-inline-block">{classUpload.title} {isAssignment && <p className="text-left text-dark float-right d-inline-block m-0">Marks: {classUpload.marks}</p>}</h5>
                    <h6 className="card-body text-left text-dark d-1 d-inline-block pb-0" style={{whiteSpace: 'pre-wrap'}}>{classUpload.description} &nbsp;
                        {isAssignment && <p className="d-inline-block float-right text-right">Uploaded on: {classUpload["upload_date"]} {classUpload["upload_time"]} <br/> Due Date: {classUpload["due_date"]} {classUpload["due_date_time"]}</p>}
                        {!isAssignment && <p className="d-inline-block float-right text-right">Uploaded on: {classUpload["uploaded_on"]} {classUpload.time}</p>}
                    </h6>
                    {classUpload.file ?
                        <p className="d-inline-block card-body text-left text-dark py-0">{isAssignment ? 'questions' : 'attachment'}: <a href={`http://localhost:5000/${classUpload.file}`} target="_blank">{classUpload.file}</a>
                            {isAssignment && <button className="btn btn-success rounded d-inline float-right w-25 ">{isStudent ? (submitted_assignments.includes(classUpload._id) ? 'Submitted' : 'Submit Assignment') : 'View Submissions'}</button>}</p>
                        : <p></p>}

                    {/*{isAuthenticated().user._id === classUpload.}*/}
                </div>
            })}
        </div>
    );
};

export default UploadDisplay;

