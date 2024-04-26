import React, { useContext } from 'react'
import { CiCamera } from "react-icons/ci";
import { ModalContext } from "../utils/Context";
import TableContainer from './TableContainer';
import PostModal from './PostModal';

const SchedulePostsContainer = () => {
    const { showModal, setShowModal } = useContext(ModalContext);

    return (
        <>
            <div className='schedulePosts-Container'>
                <div className="create-new-post-container" >
                    <div className="new-post-wrapper">
                        <div className="profile-pic">
                            <div className="profile-icon">
                                <img className="profile-img" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="logo" />
                            </div>
                            <span className="post-write" onClick={() => setShowModal(true)}>What are you Thinking...</span>

                        </div>
                        <div className="multiple-inputs">
                            <div className="cameras-container">
                                <CiCamera className="camera" onClick={() => setShowModal(true)} />


                            </div>
                            <div className="share-button">
                                <button>Share</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="scheduled-post-table-container">
                    <TableContainer />
                </div>
            </div>
            {showModal &&
                <PostModal />}

        </>
    )
}

export default SchedulePostsContainer

