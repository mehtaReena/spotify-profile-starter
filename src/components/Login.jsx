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
const Heading = styled.h1`
font-size: 2rem;
color: white;
`
const LogInBtn = styled.a`
background-color: #1FBA57;
color: white;
padding: .8em 1.4em;
border-radius: 50px;
text-decoration: none;
font-weight: bold;
display: inline-block;
letter-spacing: 1.5px;
`;

export default function Login() {


    const endpoint = 'https://accounts.spotify.com/authorize?'
    const clientID = 'client_id=3dbf1a9146c641e0b629bef5ba711d84'
    const response = '&response_type=code'
    const scopes = '&scope=user-read-private%20user-read-email%20playlist-read-private%20user-follow-read%20user-top-read'

    //let redirect = "&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fprofile";
    const redirect = '&redirect_uri=https://festive-hopper-6d822d.netlify.app/profile '


    const LocalToken = localStorage.getItem('Token')
    let history = useHistory()

    useEffect(() => {
        if (LocalToken) history.push('/profile')
    }
        // eslint-disable-next-line
        , [])

    return (
        <LoginContainer>
            <Heading>Spotify Profile</Heading>
            <LogInBtn href={endpoint + clientID + response + scopes + redirect}>
                LOG IN TO SPOTIFY </LogInBtn>
        </LoginContainer>
    )
}