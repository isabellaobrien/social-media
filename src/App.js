
import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./api/axiosDefault";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" render={() => <h1>Home</h1>}></Route>
          <Route exact path="/sign-in" render={() => <h1>sign in</h1>}></Route>
          <Route exact path="/sign-up" render={() => <h1>sign up</h1>}></Route>
          <Route render={() => <h1>Page not found</h1>}></Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;