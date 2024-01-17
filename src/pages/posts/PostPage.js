import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefault";
import Post from "./Post";
import { Container, Row, Col} from "react-bootstrap";



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
    <Row>
      <Col md={6}>
        <Container>
          <Post {...post.results[0]} setPosts={setPost} postPage/>
        </Container>
      </Col>
      <Col md={6}>
        <Container className="d-none d-md-block">
          popular people to follow
        </Container>
      </Col>
    </Row>
    
  );
}

export default PostPage;