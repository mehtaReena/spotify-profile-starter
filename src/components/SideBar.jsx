import { useLocation } from "react-router"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"


const Wrapper = styled.div`
    height: 100vh;
    width: 90px;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: .5em 0em 1em 0em;
    box-shadow: 1px 1px 10px #0000007b;
`

const Logo = styled.img`
    width: 70px;
    height: 70px;
    cursor: pointer;

    ${props => props.github && css`
        width: 50px;
        height: 50px;
        filter: invert();
    `}
`

const Icon = styled.img`
    width: 25px;
    height: 25px;
    filter: invert() brightness(.7);
    margin-bottom: ${props => props.up ? '.3em' : 'auto'};

`

const Pages = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: .5em;

    a:active {
        text-decoration-line: none;
    }
`

const Page = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    font-size: .7rem;
    font-weight: 400;
    gap: .2em;
    cursor: pointer;
    width: 100%;
    padding: 1em .3em 1em 0em;
    border-left: 4px solid transparent;

    &.active {
        background-color: rgb(24,24,24);
        border-left: 4px solid #1FBA57;
    }

    &.active > ${Icon} {
        filter: invert() brightness(1);
    }

    &:hover > ${Icon} {
        filter: invert() brightness(1);
    }
`

export default function SideBar() {
    let location = useLocation()
    return (
        <Wrapper>
            <a href='https://open.spotify.com/'><Logo src="/images/spotify-logo.svg" alt="spotify link" /></a>
            <Pages>
                <Link to='/profile'>
                    <Page className={location.pathname === '/profile' ? 'active' : null}>
                        <Icon up src='/images/person.svg' alt='profile page' />
                        <p>Profile</p>
                    </Page>
                </Link>
                <Link to='/topartists'>
                    <Page className={location.pathname === '/topartists' ? 'active' : null} >
                        <Icon src='/images/mic.svg' alt='Top artists page' />
                        <p>Top Artists</p>
                    </Page>
                </Link>
                <Link to='/toptracks'>
                    <Page className={location.pathname === '/toptracks' ? 'active' : null}>
                        <Icon up src='/images/musical-notes.svg' alt='Top tracks page' />
                        <p>Top Tracks</p>
                    </Page>
                </Link>
                <Page>
                    <Icon src='/images/recent.svg' alt='Recent page' />
                    <p>Recent</p>
                </Page>
                <Page>
                    <Icon src='/images/playlist.svg' alt='Playlist page' />
                    <p>Playlists</p>
                </Page>
            </Pages>
            <a href='https://github.com/aiveeKeiSoriano/spotify-profile-starter'><Logo github src='/images/github-logo.svg' alt='github link' /></a>
        </Wrapper>
    )
}