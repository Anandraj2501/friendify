import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from '../utils/Context'
import { MdOutlineClose } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import useCreatePost from '../utils/useCreatePost';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PostModal() {
    const { showModal, setShowModal } = useContext(ModalContext);
    const [dateTimeValue, setDateTimeValue] = useState('');

    const [formData, setFormData] = useState({
        title: "",
        image: null
    });
    const Data = new FormData();
    const { error, loading, createPost } = useCreatePost();


    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files && files.length > 0) {
            const selectedFile = files[0];
            setFormData((prevVal) => ({
                ...prevVal,
                [name]: selectedFile,
            }));
        } else {
            setFormData((prevVal) => ({
                ...prevVal,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        try {

            Data.append('title', formData.title);
            Data.append('image', formData.image);
            Data.append('scheduledTime', dateTimeValue);

            for (var [key, value] of Data.entries()) {
                console.log(key, value);
            }
            const response = await createPost(Data);
            toast.success("Post Uploaded", {
                onClose: () => {
                    setShowModal(false); // Close the modal after success notification is closed
                }
            });
            //   setShowModal(false);
        } catch (error) {
            console.error('Error creating post:', error);
            // Handle error, maybe show an error message
            toast.error('Failed to create post. Please try again.');
        }
    };
    
    useEffect(() => {
        if (error) {
            toast(error);
        }
    }, [error])

    return (
        showModal && (
            <div className="modal-container">
                <div className="modal">
                    <div className="close-btn"><MdOutlineClose className='close-btn-icon' onClick={() => setShowModal(false)} /></div>
                    <div className="modal-post-wrapper">
                        <div className="profile-pic">
                            <div className="profile-icon">
                                <img className="profile-img" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="logo" />
                            </div>

                        </div>
                        <div className="input-text-container">
                            <textarea placeholder="What do you want to talk about?" className="modal-input" value={formData.title} onChange={(e) => handleChange(e)} name='title'></textarea>
                        </div>
                        <div className="uploaded-image-container">
                            {formData.image && <img src={URL.createObjectURL(formData.image)} alt="Uploaded" id='uploadedImage' />}
                        </div>
                        <form className="modal-multiple-inputs" onSubmit={(e) => e.preventDefault()}>
                            <div className="cameras-container">
                                {/* Hidden video input */}
                                <input type="file" id="imageInput" name='image' style={{ display: 'none' }} onChange={(e) => handleChange(e)} accept="image/*" />
                                {/* Hidden video input */}
                                {/* <input type="file" id="videoInput" name='video' style={{ display: 'none' }} onChange={(e) => handleChange(e)} accept="video/*" /> */}
                                <CiCamera className="camera" name='image' onClick={() => document.getElementById('imageInput').click()} />
                                {/* <GoDeviceCameraVideo className="camera" onClick={() => document.getElementById('videoInput').click()} /> */}
                                <input type="datetime-local" name="data-time" value={dateTimeValue} onChange={e=>setDateTimeValue(e.target.value)} />
                            </div>
                            <div className="share-button">
                                <button onClick={handleSubmit}>{loading?<span>loading... </span> : <span>Share</span>}</button>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>)
    )
}
