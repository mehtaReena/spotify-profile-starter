import { Link } from "react-router-dom";
import styled from "styled-components";


const Container = styled.div`
    flex: 1;
    min-width: 300px;
    color: white;
    padding: 2em;
    display: flex;
    flex-direction: column;
`

const Head = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2em;

    p {
        font-weight: 600;
    }

    button {
        letter-spacing: 1.5px;
        text-transform: uppercase;
        font-size: 0.6rem;
        font-weight: 600;
        color: white;
        background-color: transparent;
        border: 2px solid white;
        padding: .8em 2em;
        border-radius: 20px;
        cursor: pointer;

        &:hover {
            background-color: #ffffff1d;
        }
    }
`
const Items = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`
const Entry = styled.div`
    display: flex;
    align-items: center;
    gap: 1em;

    img {
        width: 50px;
        height: 50px;
        object-position: center;
        object-fit: cover;
        border-radius: ${props => props.artist ? '50%' : 'auto'}
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: .2em;
    }

    .artist {
        font-size: 0.7rem;
        font-weight: 500;
        color: #a0a0a0;
    }

    .duration {
        margin-left: auto;
        font-size: 0.7rem;
        font-weight: 500;
        color: #a0a0a0;
    }
`

let ItemLink = styled.a`
    color: white;
    font-size: .8rem;
    font-weight: 500;
    cursor: pointer;
    text-decoration-line: none;

    &:hover {
        text-decoration-line: underline;
    }
`

export default function Card({ type, data }) {

    let minute = (ms) => {
        let min = Math.floor(ms / 60000).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
        let sec = Math.floor((ms % 60000) / 1000).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
        return min+':'+sec
    }

    return (
        <Container>
            <Head>
                <p>{type} of All Time</p>
                <Link to={type === 'Top Artists' ? '/topartists' : '/toptracks'}><button>See More</button></Link>
            </Head>
            <Items>
                {data.slice(0, 5).map(item => type === 'Top Artists' ? <Entry key={item.id} artist>
                    <img src={item.images[0].url} alt="artist/track" />
                    <ItemLink href={item.external_urls.spotify}>{item.name}</ItemLink>
                </Entry>
                    : <Entry key={item.id} track>
                        <img src={item.album.images[0].url} alt="artist/track" />
                        <div className="info">
                            <ItemLink href={item.external_urls.spotify}>{item.name}</ItemLink>
                            <div className="artist">
                                {item.artists.map(el => el.name).join(' • ')}
                            </div>
                        </div>
                        <div className="duration">
                            {minute(item.duration_ms)}
                        </div>
                    </Entry>
                )}
            </Items>
        </Container>
    )
}