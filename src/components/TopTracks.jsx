import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import styled from "styled-components"
import { getInfo, getTopTracks, tokenSuccess } from "../redux/actions/actions"
import SideBar from "./SideBar"

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
    padding: 4em 2em 2em 2em;
    width: 100%;
    max-width: 1000px;
    display: flex;
    gap: 2.5em;
    flex-direction: column;
`

const Track = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1em;

    img {
        width: 60px;
        height: 60px;
        object-position: center;
        object-fit: cover;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: .2em;
    }

    a {
        color: white;
        font-size: .9rem;
        font-weight: 500;
        cursor: pointer;
        text-decoration-line: none;

        &:hover {
            text-decoration-line: underline;
        }
    }

    .artist {
        font-size: 0.8rem;
        font-weight: 500;
        color: #a0a0a0;
    }

    .duration {
        margin-left: auto;
        font-size: 0.8rem;
        font-weight: 500;
        color: #a0a0a0;
    }
`

export default function TopTracks() {

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
            dispatch(getInfo())
            dispatch(getTopTracks('long_term'))
        }
    },
        // eslint-disable-next-line
        [token])

    let filterList = (term) => {
        if (user.tracksTerm === term) return
        dispatch(getTopTracks(term))
    }

    let minute = (ms) => {
        let min = Math.floor(ms / 60000).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
        let sec = Math.floor((ms % 60000) / 1000).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
        return min + ':' + sec
    }

    return (
        <Wrapper>
            <SideBar />
            {user && user.topTracks &&
                <Content>
                    <Head>
                        <p>Top Tracks</p>
                        <div className="filters">
                            <button className={user.tracksTerm === 'long_term' ? 'active' : null} onClick={() => filterList('long_term')}>All Time</button>
                            <button className={user.tracksTerm === 'medium_term' ? 'active' : null} onClick={() => filterList('medium_term')}>Last 6 Months</button>
                            <button className={user.tracksTerm === 'short_term' ? 'active' : null} onClick={() => filterList('short_term')}>Last 4 Weeks</button>
                        </div>
                    </Head>
                    <Items>
                        {user.topTracks.map(el => <Track>
                            <img src={el.album.images[0].url} alt="artist" />
                            <div className="info">
                                <a href={el.external_urls.spotify}>{el.name}</a>
                                <div className="artist">{el.artists.map(el => el.name).join(' • ')}</div>
                            </div>
                            <div className="duration">
                                {minute(el.duration_ms)}
                            </div>
                        </Track>)}
                    </Items>
                </Content>
            }
        </Wrapper>
    )

}