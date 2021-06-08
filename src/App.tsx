import { Router, Switch, Route} from 'react-router';
import { createBrowserHistory } from 'history';
import Main from './components/MainPage';
import Anime from './components/AnimePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

function App() {
    const customHistory = createBrowserHistory();

    return (
        <Router history={customHistory}>
            <Switch>
                <Route exact path="/">
                    <Main/>
                </Route>
                <Route path="/anime">
                    <Anime/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
