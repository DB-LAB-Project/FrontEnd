import React, {useState, useEffect} from 'react';
import {Redirect} from "react-router-dom";
import Base from "../../core/Base";
import {editFacultyPost} from "./userapicalls";

const EditPostForm = (props) => {

    const [PostForm, setPostForm] = useState("none");

    const [preLoadedValues, setPreLoadedValues] = useState({
        attachment: null
    });

    const [redirect, setRedirect] = useState(false);

    const [loading, setLoading] = useState(false);

    const [displayMainContent, setDisplayMainContent] = useState("");

    const [errors, setErrors] = useState({});

    const closePostClassForm = () => {

    }

    const handleFormChange = name => event => {
        console.log(event.target.value);
        if(name === 'file') {
            console.log(event.target.files[0]);
            setPreLoadedValues({...preLoadedValues, attachment: event.target.files[0]});
            return;
        }
        setPreLoadedValues({...preLoadedValues, [name]: event.target.value});
    }

    useEffect(() => {
        console.log(props.location.classUpld);
        setLoading(true);
        setPreLoadedValues({...preLoadedValues, ...props.location.classUpld});
        setLoading(false);
    }, []);

    // const {postFormData, handlePostSubmit, error} = useForm({
    //     defaultValues: props.location.classUpld
    // });

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        );
    };
    const postSubmit = (event) => {
        event.preventDefault();
        const {_id, title, description, file, attachment} = preLoadedValues;
        const formData = {_id, title, description, file, attachment};
        console.log(formData);
        editFacultyPost(formData)
            .then(data => console.log(data))
            .catch(err => console.error(err));
        console.log('Function fired!');
        setRedirect(true);

    }


    return (
            <Base>
                <hr/>
                {loading ? loadingMessage() : (
                    <div>
                        <div style={{backgroundColor: '#fff', borderRadius: "50%", width: "49px", height: "49px", display: "inline-block", textAlign: "center"}}>
                            <h3 className="p-1 text-dark text-center d-inline-block">{"He"}</h3>
                        </div>
                        {redirect ? <Redirect to={`/admin/dashboard/my-class/${props.match.params.course_code}`}/> : null}
                        {/*<img src={user} alt="" width="50px" height="50px" style={{backgroundColor: "white", borderRadius: "50%"}}/>*/}
                        <h3 className="text-white d-inline align-self-center pl-3">{"Hello"}</h3>
                        <div className="card w-50 mx-auto border">
                            <form className="m-3 p-4 border border-secondary rounded" onSubmit={postSubmit}>
                                <div className="mb-3">
                                    <label className="form-label text-dark">Title {errors.titleError && <p className="text-danger">{errors.titleError}</p>}</label>
                                    <input type="text" className="form-control rounded" required="required" placeholder="Enter the title" name='title' value={preLoadedValues.title} onChange={handleFormChange('title')}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-dark">Description {errors.descriptionError && <p className="text-danger">{errors.descriptionError}</p>}</label>
                                    <textarea type="text" className="form-control rounded" required="required" placeholder="Enter the description" name='description'  style={{whiteSpace: "pre-line"}} value={preLoadedValues.description} onChange={handleFormChange('description')}/>
                                </div>
                                {/*<div className="mb-3">*/}
                                {/*    <label className="form-label text-dark">Link</label>*/}
                                {/*    <input type="text" className="form-control rounded" required="required" placeholder="Enter the link (if any)..." name='link'  multiline={true} ref={postFormData}/>*/}
                                {/*</div>*/}
                                <div className="mb-3">
                                    <label className="form-label text-dark">File Uploaded: {preLoadedValues.file ? <a href={`http://localhost:5000/${preLoadedValues.file}`} target={"_blank"}>{preLoadedValues.file}</a> : "None"}</label>
                                    <input type="file" className="form-control" placeholder="Choose the file you want to upload" name='file' onChange={handleFormChange('file')}/>
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
                                    <input type='submit'  value='Edit Post' className="btn btn-lg btn-success d-inline-block flex-grow-1 rounded m-2" />
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </Base>
        );
    };


export default EditPostForm;
