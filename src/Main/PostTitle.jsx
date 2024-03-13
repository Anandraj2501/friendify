import { useState } from "react";


const PostTitle = ({title})=>{
    const [isTruncated,setIstruncated] = useState(true);
    return (
        <span className="Post-title" onClick={()=>setIstruncated(!isTruncated)}>
            {
                isTruncated ?  (`${title.slice(0,100)}.........`) : (title)
            }
        </span>
    )
}

export default PostTitle;