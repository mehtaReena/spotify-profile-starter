import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getInfo, getTopArtists, tokenSuccess } from "../redux/actions/actions";
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
    padding: 5em 1em;
    height: 100vh;
    overflow-y: scroll;
    flex: 1;

    &::-webkit-scrollbar {
        display: none;
    }
`

const Head = styled.div`
    width: 100%;
    max-width: 1000px;
    display: flex;
    justify-content: space-between;
    color: white;

    p {
        font-size: 1.5rem;
        font-weight: 700;
    }

    .filters {
        display: flex;
        gap: 1em;
    }

    button {
        color: white;
        background-color: transparent;
        border: none;
        font-weight: 500;
        cursor: pointer;

        &:hover {
            text-decoration-line: underline;
        }

        &.active {
            text-decoration-line: underline;
            font-weight: 700;
        }
    }
`

const Items = styled.div`
    padding: 4em 0em 2em 0em;
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 2.5em;
`

const Artist = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: center;

    img {
        width: 150px;
        height: 150px;
        object-position: center;
        object-fit: cover;
        border-radius: 50%;
    }

    a {
        font-size: 0.9rem;
        color: white;
        text-decoration-line: none;
        font-weight: 600;

        &:hover {
            text-decoration-line: underline;
        }
    }
`

export default function TopArtist() {

    let history = useHistory()
    const LocalToken = localStorage.getItem('Token')
    const RefreshToken = localStorage.getItem('Refresh')
    let dispatch = useDispatch()
    let user = useSelector(state => state.user)
    let token = useSelector(state => state.auth.token)

    useEffect(() => {
        if (!token) {
            if (LocalToken) dispatch(tokenSuccess(LocalToken, RefreshToken))
            else history.push('/')
        }
    }
        // eslint-disable-next-line
        , [])

    useEffect(() => {
        if (token) {
            //getting info too because token refresh catch is in this dispatch :D and it's giving error when i use expired token to get artists
            dispatch(getInfo())
            dispatch(getTopArtists('long_term'))
        }
    },
        // eslint-disable-next-line
        [token])

    let filterList = (term) => {
        if (user.artistTerm === term) return
        dispatch(getTopArtists(term))
    }

    return (
        <Wrapper>
            <SideBar />
            {user && user.topArtists &&
                <Content>
                    <Head>
                        <p>Top Artists</p>
                        <div className="filters">
                            <button className={user.artistTerm === 'long_term' ? 'active' : null} onClick={() => filterList('long_term')}>All Time</button>
                            <button className={user.artistTerm === 'medium_term' ? 'active' : null} onClick={() => filterList('medium_term')}>Last 6 Months</button>
                            <button className={user.artistTerm === 'short_term' ? 'active' : null} onClick={() => filterList('short_term')}>Last 4 Weeks</button>
                        </div>
                    </Head>
                    <Items>
                        {user.topArtists.map(el => <Artist>
                            <img src={el.images[0].url} alt="artist" />
                            <a href={el.external_urls.spotify}>{el.name}</a>
                        </Artist>)}
                    </Items>
                </Content>
            }
        </Wrapper>
    )
}