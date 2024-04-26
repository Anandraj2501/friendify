import "./Main.css"
import { CiCamera } from "react-icons/ci";
import SinglePost from "./SinglePost";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../utils/Context";
import PostModal from "./PostModal";
import StoryContainer from "./StoryContainer";
import { BACKENDURL } from "../utils/BACKENDURL";
import { useSelector } from "react-redux";
import { ShimmerSocialPost } from "react-shimmer-effects";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBarContainer from "./SearchBarContainer";

const PostsContainer = () => {
    const { showModal, setShowModal } = useContext(ModalContext);
    const {token} = useSelector(state=>state.userDetails);
    const {profilePic} = useSelector(state=>state.userDetails);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    const getPosts = async () => {
        try {
            const { data } = await axios.get(`${BACKENDURL}/allposts?pages=${page}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            if (data.data.length === 0) {
                setHasMore(false);
            }
            if (page === 1) {
                setPosts(data.data);
            } else {
                setPosts(prevPosts => [...prevPosts, ...data.data]);
            }
            setPage(page + 1);

        } catch (error) {
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {

        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [showModal]);

    useEffect(() => {
        getPosts();
    }, [])

    const loadMorePosts = () => {
        getPosts();
    };

    return (
        <>
            <div className="Posts-Container">
                <SearchBarContainer/>
                <StoryContainer />
                <div className="create-new-post-container" >
                    <div className="new-post-wrapper">
                        <div className="profile-pic">
                            <div className="profile-icon">
                                <img className="profile-img" src={profilePic} alt="logo" />
                            </div>
                            <span className="post-write" onClick={() => setShowModal(true)}>What are you Thinking...</span>
                        </div>
                        <div className="multiple-inputs">
                            <div className="cameras-container">
                                <CiCamera className="camera" onClick={() => setShowModal(true)} />
                                {/* <GoDeviceCameraVideo className="camera" onClick={() => setShowModal(true)} /> */}
                            </div>
                            <div className="share-button">
                                <button>Share</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="infinitescroll">
                    <InfiniteScroll
                        dataLength={posts?.length}
                        next={loadMorePosts}
                        hasMore={hasMore}
                        loader={
                            <div className="shimmer-posts">
                                <ShimmerSocialPost type="both" className="each-posts" />
                                <ShimmerSocialPost type="both" className="each-posts" />
                                <ShimmerSocialPost type="both" className="each-posts" />
                                <ShimmerSocialPost type="both" className="each-posts" />
                                <ShimmerSocialPost type="both" className="each-posts" />
                            </div>
                        }
                        endMessage={!hasMore ? (<p className="noMore">No more posts</p>) : ("")}
                    >
                        {posts.length > 0 &&
                            posts?.map((each) => <SinglePost post={each} key={each._id} token={token} />)}
                    </InfiniteScroll>
                </div>
            </div>
            {showModal &&
                <PostModal />}
            <ToastContainer />
        </>
    )
}

export default PostsContainer;