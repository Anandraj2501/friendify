
import { CiPaperplane } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";


const CommentsContainer = ({ showComment }) => {
    
    return (
        showComment && (
            <div className="comments-container">
                <div className="comment-type-box">
                    <input type="text" placeholder="Comment..." className="comment-input" />
                    <CiPaperplane className="share-comment" />
                </div>

                <div className="user-comments-container">

                    <div className="user-comment-info">
                        <div className="user-comment-img-container">
                            <img className="user-comment-img" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="logo" />

                        </div>
                        <div className="user-comment-name-container">
                            <span className="user-comment-name">Anand Raj</span>
                        </div>
                        <div className="comment-time-container">
                            <span className="comment-time">5 mins ago</span>
                        </div>
                    </div>


                    <div className="user-comment-text">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, qui!</p>
                    </div>


                    <div className="user-like-comment-container">
                        <FaRegHeart className="user-like-logo" />
                        <LuMessageSquare className="user-comment-logo" />
                    </div>
                </div>
            </div>)
    )
}
export default CommentsContainer