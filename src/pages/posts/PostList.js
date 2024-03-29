import React, {  useEffect,useState } from 'react'
import {Row, Col, Container, Form} from "react-bootstrap"
import { useLocation } from 'react-router';
import { axiosReq } from '../../api/axiosDefault';
import Post from './Post';
import Asset from '../../components/Asset';
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';
import PopularProfiles from '../profiles/PopularProfiles';
import styles from '../../styles/PostPage.module.css'


const PostList = ({ message, filter = "" }) => {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    
    const [query, setQuery] = useState("")
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
          setPosts(data);
          setHasLoaded(true);
        } catch (err) {
          console.log(err);
        }
      };
  
      setHasLoaded(false);
      const timer = setTimeout(() => {
        fetchPosts();
      }, 1000)

      return () => {
        fetchPosts();
        clearTimeout(timer);
      }
      
    }, [filter, query, pathname]);
  
  return (
    <Row>
        <Col className="py-2 p-0 p-lg-2" lg={8}>
            <PopularProfiles mobile/>
            <Form onSubmit={(event) => event.preventDefault()} className={styles.search_box}>
              <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              placeholder='search posts'
              className={styles.search}
              />
            </Form>
            <Container>
                {hasLoaded? (
                <>
                {posts.results.length ? (
                  <InfiniteScroll
                    children={posts.results.map((post) => (
                      <Post key={post.id} {...post} setPosts={setPosts} />
                    ))}
                    dataLength={posts.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!posts.next}
                    next={() => fetchMoreData(posts, setPosts)}
                  />
            ) : (
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
            <div className={styles.container}>
              <PopularProfiles />
            </div>

        </Col>
    </Row>
  )
}

export default PostList