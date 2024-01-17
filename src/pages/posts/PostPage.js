import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefault";
import Post from "./Post";



function PostPage() {
  // Add your logic here
  const {id} = useParams();
  const [post, setPost] = useState({results:[]});

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
        ]);
        setPost({ results: [post] });
        console.log(post);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);


  return (
    <div>
        <Post {...post.results[0]} setPosts={setPost} postPage/>
    </div>
  );
}

export default PostPage;