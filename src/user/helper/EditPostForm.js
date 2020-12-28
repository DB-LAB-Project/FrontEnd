import React, {useState} from 'react';
import {useForm} from "react-hook-form";

const EditPostForm = ({preloadedValues, display}) => {

    const [PostForm, setPostForm] = useState("none");

    const [loading, setLoading] = useState(false);

    const [displayMainContent, setDisplayMainContent] = useState("");

    const [errors, setErrors] = useState({});

    const closePostClassForm = () => {
        setPostForm("none");
        setDisplayMainContent("");
        window.location.reload(false);
    }

    const {postFormData, handlePostSubmit, error} = useForm({
        defaultValues: preloadedValues
    });

    return (
            <div className="card w-50 mx-auto border" style={{display: display}}>
                <form className="m-3 p-4 border border-secondary rounded" >
                    <div className="mb-3">
                        <label className="form-label text-dark">Title {errors.titleError && <p className="text-danger">{errors.titleError}</p>}</label>
                        <input type="text" className="form-control rounded" required="required" placeholder="Enter the title" name='title' ref={postFormData}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-dark">Description {errors.descriptionError && <p className="text-danger">{errors.descriptionError}</p>}</label>
                        <textarea type="text" className="form-control rounded" required="required" placeholder="Enter the description" name='description'  style={{whiteSpace: "pre-line"}} ref={postFormData}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-dark">Link</label>
                        <input type="text" className="form-control rounded" required="required" placeholder="Enter the link (if any)..." name='link'  multiline={true} ref={postFormData}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-dark">File</label>
                        <input type="file" className="form-control" placeholder="Choose the file you want to upload" name='file' ref={postFormData}/>
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
                        <input type='submit'  value='Post Material' className="btn btn-lg btn-success d-inline-block flex-grow-1 rounded m-2" />
                    </div>
                </form>
            </div>
        );
    };


export default EditPostForm;
