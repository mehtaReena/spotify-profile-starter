import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom"
import styled from "styled-components";
import { getInfo, getToken, getTopArtists, getTopTracks, tokenSuccess ,removeToken} from "../redux/actions/actions";

import List from "./List";
import SideBar from "./SideBar";

const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    background-color: rgb(24,24,24);
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3em 1em;
    height: 100vh;
    overflow-y: scroll;
    flex: 1;

    &::-webkit-scrollbar {
        display: none;
    }
`

const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5em;
    color: white;
    width: 100%;
    max-width: 800px;

`
const Pic = styled.div`
    width: 150px;
    height: 150px;
    border: 3px solid white;
    border-radius: 50%;

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .default {
        padding: 2em;
        filter: invert();
    }
`
const Status = styled.div`
    display: flex;
    max-width: 300px;
    width: 100%;
    justify-content: space-between;

    .links {
        text-transform: uppercase;
        font-size: 0.6rem;
        font-weight: 600;
        color: #bbbbbb;
        letter-spacing: 1.5px;
        display: flex;
        flex-direction: column;
        gap: .4em;
        align-items: center;

        & > p:first-of-type {
        font-size: 1rem;
        color: #1FBA57;
        }
    }
`

const Logout = styled.button`
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-size: 0.7rem;
    font-weight: 600;
    color: white;
    background-color: transparent;
    border: 2px solid white;
    padding: .8em 2em;
    border-radius: 20px;
    margin-top: 1em;
    cursor: pointer;

    &:hover {
        background-color: #ffffff1d;
    }
`
const TopArtists = styled.div`
    padding: 3em 0em 2em 0em;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1000px;
`

export default function ProfilePage() {

    const location = useLocation();
    const history = useHistory();
    const LocalToken = localStorage.getItem('Token')
    const RefreshToken = localStorage.getItem('Refresh')
    let dispatch = useDispatch()
    let token = useSelector(state => state.auth.token)
    let user = useSelector(state => state.user)
    let error = useSelector(state => state.auth.error)


    useEffect(() => {
        if (!token) {
            if (LocalToken) dispatch(tokenSuccess(LocalToken, RefreshToken))
            else if (location.search) dispatch(getToken(location.search.replace('?code=', '')))
            else history.push('/')
        }
    }
        // eslint-disable-next-line
        , [])


    useEffect(() => {
        if (token) {
            dispatch(getInfo())
            dispatch(getTopArtists('long_term'))
            dispatch(getTopTracks('long_term'))
        }
    },
        // eslint-disable-next-line
        [token])

        const clickhandler = () => {
            alert("logout")
            localStorage.setItem("Token", null);
            dispatch(removeToken());
            history.push("/");
        };


    return (
        <Wrapper>
            <SideBar />
            <Content>

                {user && user.profile && !error &&
                    <Profile>
                        <Pic>
                            <img className={user.profile.images[0] ? null : 'default'} src={user.profile.images[0] ? user.profile.images[0].url : "/images/person.svg"} alt="" />
                        </Pic>
                        <h1 className="name">{user.profile.display_name}</h1>
                        <Status>
                            <div className="links">
                                <p>{user.profile.followers.total}</p>
                                <p>followers</p>
                            </div>
                            <div className="links">
                                <p>{user.profile.following}</p>
                                <p>following</p>
                            </div>
                            <div className="links">
                                <p>{user.profile.playlists}</p>
                                <p>playlists</p>
                            </div>
                    </Status>
                    <Logout onClick={clickhandler}>Logout</Logout>
                    </Profile>
                }
                <TopArtists>
                    {user && user.topArtists &&
                        <List type='Top Artists' data={user.topArtists} />
                    }
                    {user && user.topTracks &&
                        <List type='Top Tracks' data={user.topTracks} />
                    }
                </TopArtists>
            </Content>
        </Wrapper>
    )
}
