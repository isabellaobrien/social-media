
import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./api/axiosDefault";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" render={() => <h1>Home</h1>}></Route>
          <Route exact path="/sign-in" render={() => <SignInForm />}></Route>
          <Route exact path="/sign-up" render={() => <SignUpForm />}></Route>
          <Route exact path="/posts/add" render={() => <PostCreateForm />}></Route>
          <Route exact path="/posts/:id" render={() => <PostPage />}></Route>
          <Route render={() => <h1>Page not found</h1>}></Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;