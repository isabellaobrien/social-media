
import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./api/axiosDefault";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostList from "./pages/posts/PostList";
import PostEditForm from "./pages/posts/PostEditForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  return (
    <div className={styles.App}>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" render={() => (
              <PostList message="No results found. Adjust the search keyword." />
            )}
          />
          <Route exact path="/feed" render={() => (
              <PostList
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route exact path="/liked" render={() => (
              <PostList
                message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route exact path="/sign-in" render={() => <SignInForm />}></Route>
          <Route exact path="/sign-up" render={() => <SignUpForm />}></Route>
          <Route exact path="/posts/add" render={() => <PostCreateForm />}></Route>
          <Route exact path="/posts/:id" render={() => <PostPage />}></Route>
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />}></Route>
          <Route render={() => <h1>Page not found</h1>}></Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;