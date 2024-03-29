import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefault";
import Post from "./Post";
import { Container, Row, Col} from "react-bootstrap";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";
import styles from '../../styles/PostPage.module.css'
import PopularProfiles from "../profiles/PopularProfiles";



function PostPage() {

  const {id} = useParams();
  const [post, setPost] = useState({results:[]});

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({results: []})

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, {data: comments}] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        
        setPost({ results: [post] });
        setComments(comments)
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
        <Container className={styles.section}>
          <p className={styles.title}>comments</p>
          {currentUser? (
          <CommentCreateForm
            profile_id={currentUser.profile_id}
            profile_image={profile_image}
            post={id}
            setPost={setPost}
            setComments={setComments}
          />) : null}
          {comments.results.length? (
            comments.results.map((comment) => (
              <Comment 
                key={comment.id} 
                {...comment}
                setPost={setPost}
                setComments={setComments}
              />
            ))
          ) : currentUser ? (
            <p>no comments yet, make one!</p>
          ) : (
            <p>no comments yet.</p>
          )}
        </Container>
      </Col>
      <Col lg={4}>
        <Container className={`${styles.container} d-none d-md-block`}>
          <PopularProfiles />
        </Container>
      </Col>
    </Row>
    
  );
}

export default PostPage;