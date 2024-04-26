
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import { CiPaperplane } from "react-icons/ci";
import { BACKENDURL } from "../utils/BACKENDURL";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import calculateTime from "../utils/calculateTime";

const CommentsContainer = ({ showComment, comment, postId }) => {
    const [showreply, setShowReply] = useState(false);
    const {token,profilePic} = useSelector(state=>state.userDetails);

    const [reply, setReply] = useState("");
    const postCommentReply = async () => {
        try {
            const response = await axios.post(`${BACKENDURL}/reply`, { "postId": postId, "commentId": comment._id, "replyText": reply }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            console.log(response);
            if(response.status===200){
                toast.success("Successfully Commented");
            }
        }catch(error){
            toast.error(error.message);
        }
    }
    return (
        showComment && (
            <div className="comments-container">


                <div className="user-comments-container">

                    <div className="user-comment-info">
                        <div className="user-comment-img-container">
                            <img className="user-comment-img" src={profilePic} alt="logo" />

                        </div>
                        <div className="user-comment-name-container">
                            <span className="user-comment-name">Anand Raj</span>
                        </div>
                        <div className="comment-time-container">
                            <span className="comment-time">{calculateTime(comment.time)}</span>
                        </div>
                    </div>


                    <div className="user-comment-text">
                        <p>{comment?.text}</p>
                    </div>


                    <div className="user-like-comment-container">
                        <FaRegHeart className="user-like-logo" />
                        <LuMessageSquare className="user-comment-logo" onClick={() => setShowReply(!showreply)} />
                    </div>
                </div>

                {showreply &&
                    <>
                        <div className="comment-type-box">
                            <input type="text" placeholder="Reply..." className="comment-input" value={reply} onChange={e => setReply(e.target.value)} />
                            <CiPaperplane className="share-comment" onClick={postCommentReply} />
                        </div>
                        <div className="reply-container">{
                            comment?.replies?.map((reply,index) => (
                                <CommentsContainer showComment={showreply} comment={reply} key={index}/>
                            ))}
                        </div>

                    </>
                }
                <ToastContainer/>
            </div>)
    )
}
export default CommentsContainer