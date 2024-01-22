import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefault";
import Post from "./Post";
import { Container, Row, Col} from "react-bootstrap";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";



function PostPage() {

  const {id} = useParams();
  const [post, setPost] = useState({results:[]});

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({results: []})

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
      <Col lg={8}>
        <Container>
          <Post {...post.results[0]} setPosts={setPost} postPage/>
        </Container>
        <Container>
          {currentUser? (
          <CommentCreateForm
            profile_id={currentUser.profile_id}
            profile_image={profile_image}
            post={id}
            setPost={setPost}
            setComments={setComments}
          />) : comments.results.length? ("comments"): null}
        </Container>
      </Col>
      <Col lg={4}>
        <Container className="d-none d-md-block">
          popular people to follow
        </Container>
      </Col>
    </Row>
    
  );
}

export default PostPage;