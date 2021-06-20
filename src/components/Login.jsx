import { useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components'

const LoginContainer = styled.div`
display: flex;
align-items: center;
flex-direction: column;
gap: 1.2em;
justify-content: center;
height: 100vh;
background-color: #181818;
`
const H1Tag = styled.h1`
font-size: 2rem;
color: white;
`
const LogInBtn = styled.a`
background-color: #1FBA57;
color: white;
padding: .8em 1.3em;
border-radius: 50px;
text-decoration: none;
font-weight: bold;
display: inline-block;
letter-spacing: 1.5px;
`;

export default function Login() {

    //implicit grant
    // const URL = 'https://accounts.spotify.com/authorize?client_id=b6b96f827f584079959eae2bd104c04f&response_type=token&scope=user-top-read%20user-read-private%20user-read-email&redirect_uri=http://localhost:3000/profile'

    //auth code - aivee app
    // const URL = 'https://accounts.spotify.com/authorize?client_id=b6b96f827f584079959eae2bd104c04f&response_type=code&scope=user-top-read%20user-read-private%20user-read-email&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fprofile'


    const endpoint = 'https://accounts.spotify.com/authorize?'
    const clientID = 'client_id=3dbf1a9146c641e0b629bef5ba711d84'
    const response = '&response_type=code'
    const scopes = '&scope=user-read-private%20user-read-email%20playlist-read-private%20user-follow-read%20user-top-read'

    // localhost redirect
     const redirect = '&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fprofile'

    //netlify redirect
    // const redirect = '&redirect_uri=https%3A%2F%2Fquizzical-poitras-057011.netlify.app%2Fprofile'

    const LocalToken = localStorage.getItem('Token')
    let history = useHistory()

    useEffect(() => {
        if (LocalToken) history.push('/profile')
    }
        // eslint-disable-next-line
        , [])

    return (
        <LoginContainer>
            <H1Tag>Spotify Profile</H1Tag>
            <LogInBtn href={endpoint + clientID + response + scopes + redirect}>
                LOG IN TO SPOTIFY </LogInBtn>
        </LoginContainer>
    )
}