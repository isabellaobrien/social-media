import React, { useEffect, useState } from "react";
import Asset from "../../components/Asset";
import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefault";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataCotext";
import { Button, Image,Col, Row, Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from '../posts/Post';
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import ProfileEditDropdown from "./ProfileEditDropdown";
import styles from '../../styles/ProfilePage.module.css'


function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const {setProfileData, handleFollow, handleUnfollow}= useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;
  const [profilePosts, setProfilePosts] = useState({results: []})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/posts/?owner__profile=${id}`),
          
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <div className={styles.box}>
            <h3 className="m-2">{profile?.owner}</h3>
            {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
          </div>   
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.post_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <button className={styles.btn}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </button>
            ) : (
              <button className={styles.btn}
                onClick={() => handleFollow(profile)}
              >
                follow
              </button>
            ))}
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );
  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s posts</p>
      <hr />
      {profilePosts.results.length? (
        <InfiniteScroll
        children={profilePosts.results.map((post) => (
          <Post key={post.id} {...post} setPosts={setProfilePosts} />
        ))}
        dataLength={profilePosts.results.length}
        loader={<Asset spinner />}
        hasMore={!!profilePosts.next}
        next={() => fetchMoreData(profilePosts, setProfilePosts)}
      />
      ): (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );



  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container >
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <div className={styles.container}>
          <PopularProfiles />
        </div>
      </Col>
    </Row>
  );
}

export default ProfilePage;