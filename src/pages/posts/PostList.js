import React, {  useEffect,useState } from 'react'
import {Row, Col, Container} from "react-bootstrap"
import { useLocation } from 'react-router';
import { axiosReq } from '../../api/axiosDefault';
import Post from './Post';
import Asset from '../../components/Asset';
import NoResults from "../../assets/no-results.png";


const PostList = ({ message, filter = "" }) => {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const { data } = await axiosReq.get(`/posts/?${filter}`);
          setPosts(data);
          setHasLoaded(true);
        } catch (err) {
          console.log(err);
        }
      };
  
      setHasLoaded(false);
      fetchPosts();
    }, [filter, pathname]);
  
  return (
    <Row>
        <Col className="py-2 p-0 p-lg-2" lg={8}>
            <p>popular profiles to follow on mobile</p>
            <Container>
                {hasLoaded? (
                <>
                {posts.results.length? posts.results.map((post) => (
                    <Post key={post.id} {...post} setPosts={setPosts} />
                )) : (
                    <Container>
                         <Asset src={NoResults} message={message} />
                    </Container>
                )}
                </>) : (
                    <Container>
                        <Asset spinner />
                    </Container>
                )}

            </Container>
        </Col>
        <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
            <p>popular profiles to follow on desktop</p>
        </Col>
    </Row>
  )
}

export default PostList