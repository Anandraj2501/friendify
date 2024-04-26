import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import { IoIosShareAlt } from "react-icons/io";
import PostTitle from "./PostTitle";
import CommentsContainer from "./CommentsContainer";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import calculateTime from "../utils/calculateTime";
import handleLike from "../utils/handleLike";
import { useSelector } from "react-redux";
import handleunlike from "../utils/handleunlike";
import { CiPaperplane } from "react-icons/ci";
import axios from "axios";
import { BACKENDURL } from "../utils/BACKENDURL";
import { ToastContainer, toast } from "react-toastify";

const SinglePost = ({ post, token }) => {
    const [showComment, setShowComment] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likes);
    const [comment, setComment] = useState("");
    const {userId} = useSelector(state=>state.userDetails);


    useEffect(() => {
        // Check if userId is in likedBy array
        if (post.likedBy.includes(userId)) {
            setIsLiked(true);
        }
    }, [post.likedBy, userId]);

    const postComment = async () => {
        try {
            const response = await axios.post(`${BACKENDURL}/comment`, { "postId": post._id, "comment": comment }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            console.log(response);
            if(response.status===200){
                toast.success("Commented")
            }
        }catch(error){
            toast.error(error.message);
        }
    }


    return (
        <div className="each-posts" key={post?._id}>
            <div className="profile-pic">
                <div className="profile-icon">
                    <img className="profile-img" src={post?.postedBy.profilePic} alt="logo" />
                </div>
                <div className="profile-info">
                    <span className="profile-name">{post.postedBy.name}</span>
                    <span className="post-time">{calculateTime(post.postTime)}</span>
                </div>
                <div className="option">
                    <BsThreeDotsVertical className="three-dots" />
                </div>
            </div>

            <PostTitle title={post.title} />

            <div className="post-info-container">
                <div className="post-image-contaienr">
                    <img className="post-img" src={post.image} alt="" />
                </div>
                <div className="post-like-share-container">
                    <div className="like-comment-container">
                        {
                            !isLiked ?
                                (<FaRegHeart className="like-logo" onClick={() => handleLike(post._id, setIsLiked, token, setLikesCount)} />) :
                                (<FaHeart className="like-logo liked" onClick={() => handleunlike(post._id, setIsLiked, token, setLikesCount)} />)
                        }
                        <span className="likes">{likesCount}</span>
                        <LuMessageSquare className="comment-logo" onClick={() => setShowComment(!showComment)} />
                        <span className="comments">{post.comments.length}</span>
                    </div>
                    <div className="share-container">
                        <span className="share">Share<IoIosShareAlt className="share-logo" /></span>
                    </div>
                </div>
            </div>
            {showComment && <div className="comment-type-box">
                <input type="text" placeholder="Comment..." className="comment-input" name="comment" value={comment} onChange={e => setComment(e.target.value)} />
                <CiPaperplane className="share-comment" onClick={postComment} />
            </div>}
            {
                post?.comments?.map((comment) => (
                    <CommentsContainer showComment={showComment} key={post?._id} comment={comment} postId={post._id} />
                ))
            }
        <ToastContainer/>
        </div>
    )
}
export default SinglePost;