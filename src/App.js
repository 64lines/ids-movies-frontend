import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MoviesPage from './pages/MoviesPage';
import AuthContextProvider from './context/AuthContextProvider';
import SingleMoviePage from './pages/SingleMoviePage';
function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Switch>
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/" component={MoviesPage} />
          <Route exact path="/movies/:id" component={SingleMoviePage} />
        </Switch>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
