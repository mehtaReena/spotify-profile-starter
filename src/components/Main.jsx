
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import ProfilePage from './ProfilePage';
import Login from './Login'
import TopArtist from "./TopArtist";
import TopTracks from "./TopTracks";

export default function Main() {
    return (
        <Router>
            <Switch>
                <Route path='/profile'>
                    <ProfilePage />
                </Route>
                <Route path='/topartists'>
                    <TopArtist />
                </Route>
                <Route path='/toptracks'>
                    <TopTracks />
                </Route>
                <Route path='/'>
                    <Login />
                </Route>
            </Switch>
        </Router>
    )
}