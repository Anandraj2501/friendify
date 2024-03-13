import React, { useContext } from 'react'
import { ModalContext } from '../utils/Context'
import { MdOutlineClose } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import { GoDeviceCameraVideo } from "react-icons/go";

export default function PostModal() {
    const { showModal, setShowModal } = useContext(ModalContext);

    const handleImageUpload = (e) => {
        // Handle image upload here
        const imageFile = e.target.files[0];
        console.log('Uploaded image:', imageFile);
        // You can perform further actions like uploading the image to your server
    };

    const handleVideoUpload = (e) => {
        // Handle video upload here
        const videoFile = e.target.files[0];
        console.log('Uploaded video:', videoFile);
        // You can perform further actions like uploading the video to your server
    };

    return (
        showModal && (
            <div className="modal-container">
                <div className="create-new-post-container modal">
                    <div className="close-btn"><MdOutlineClose className='close-btn-icon' onClick={() => setShowModal(false)} /></div>
                    <div className="modal-post-wrapper">
                        <div className="profile-pic">
                            <div className="profile-icon">
                                <img className="profile-img" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="logo" />
                            </div>

                        </div>
                        <div className="input-text-container">
                            <textarea placeholder="What do you want to talk about?" className="modal-input"></textarea>
                        </div>
                        <div className="modal-multiple-inputs">
                            <div className="cameras-container">
                                {/* Hidden video input */}
                                <input type="file" id="imageInput" style={{ display: 'none' }} onChange={handleImageUpload} accept="image/*" />
                                {/* Hidden video input */}
                                <input type="file" id="videoInput" style={{ display: 'none' }} onChange={handleVideoUpload} accept="video/*" />
                                <CiCamera className="camera" onClick={() => document.getElementById('imageInput').click()}/>
                                <GoDeviceCameraVideo className="camera" onClick={() => document.getElementById('videoInput').click()}/>
                            </div>
                            <div className="share-button">
                                <button>Share</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    )
}
