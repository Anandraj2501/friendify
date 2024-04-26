import { useState } from "react";


const PostTitle = ({ title }) => {
    const [isTruncated, setIstruncated] = useState(true);
    if (title.length > 60) {
        return (
            <span className="Post-title" onClick={() => setIstruncated(!isTruncated)}>
                {
                    isTruncated ? (`${title.slice(0, 100)}.........`) : (title)
                }
            </span>
        )
    }
    return (
        <span className="Post-title" onClick={() => setIstruncated(!isTruncated)}>
                {title}
            </span>
    )
}

export default PostTitle;