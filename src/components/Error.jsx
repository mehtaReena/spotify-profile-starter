import { useSelector } from "react-redux"
import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    max-width: 500px;
    padding: 2em 0em;
    border-radius: 20px;
    border: 5px solid #ffffff96;
    background-color: #3f3f3f;
    color: #ffffffae;
    text-align: center;
`

export default function Error() {
    let error = useSelector(state => state.auth.error)
    return (
        <Wrapper>
            <h1>Error {error.request.status}</h1>
        </Wrapper>
    )
}