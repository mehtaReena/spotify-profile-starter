import axios from "axios";
import {
  PROFILE_SUCCESS,
  THROW_ERROR,
  TOKEN_SUCCESS,
  TOPARTISTS_SUCCESS,
  TOPTRACKS_SUCCESS,
  REMOVE_TOKEN
} from "./action_types";

const TracksURL = "https://api.spotify.com/v1/me/top/tracks?time_range=";
const ArtistURL = "https://api.spotify.com/v1/me/top/artists?time_range=";
const ProfileURL = "https://api.spotify.com/v1/me";
const tokenURL = "https://accounts.spotify.com/api/token";




const Client =
  "M2RiZjFhOTE0NmM2NDFlMGI2MjliZWY1YmE3MTFkODQ6OWYzMTIyM2QyZTNmNDg3NGJlMTFhZGY3ODhmNjQ1YjM=";

//localhost redirect for local testing
// const redirect = "&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fprofile";

//netlify redirect after deploying
 const redirect = '&redirect_uri=https://nostalgic-goldstine-cb30ce.netlify.app/profile'

export let throwError = (e) => ({
  type: THROW_ERROR,
  payload: e,
});

export let tokenSuccess = (token, refresh) => ({
  type: TOKEN_SUCCESS,
  payload: { token, refresh },
});

export let removeToken = () => ({
  type: REMOVE_TOKEN,

});

export let profileSuccess = (object) => ({
  type: PROFILE_SUCCESS,
  payload: object,
});

export let topTracksSuccess = (list, term) => ({
  type: TOPTRACKS_SUCCESS,
  payload: { list, term }
});

export let topArtistsSuccess = (list, term) => ({
  type: TOPARTISTS_SUCCESS,
  payload: { list, term }
});


// If there are no stored token in local storage, this is called to get token from the code in the url
export let getToken = (code) => {
  return async (dispatch) => {
    const body = "grant_type=authorization_code&code=" + code + redirect;
    try {
      let response = await axios.post(tokenURL, body, {
        headers: {
          Authorization: "Basic " + Client,
        },
      });
      // It gives token and refresh token, we store both in state and localstorage
      // This response also shows the scopes we got but we're not storing it
      dispatch(tokenSuccess(response.data.access_token, response.data.refresh_token));
      localStorage.setItem("Token", response.data.access_token);
      localStorage.setItem("Refresh", response.data.refresh_token);

    } catch (e) {
      dispatch(throwError(e));
    }
  };
};

// Getting the initial info to show in the profile page
export let getInfo = () => {
  return async (dispatch, getState) => {
    try {
      //This gives your name, picture, and number of followers
      let profile = await axios.get(ProfileURL, {
        headers: { Authorization: "Bearer " + getState().auth.token },
      });
      //This gives the number of your followed artists
      let following = await axios.get(ProfileURL + "/following?type=artist", {
        headers: { Authorization: "Bearer " + getState().auth.token },
      });
      //This gives the number of playlist you have
      let playlists = await axios.get(ProfileURL + "/playlists", {
        headers: { Authorization: "Bearer " + getState().auth.token },
      });

        dispatch(profileSuccess({ ...profile.data, following: following.data.artists.total, playlists: playlists.data.total, }));

    } catch (e) {
      // Error 401 is given when the token expires. another POST request is made using refresh token to get some new fresh access token
      if (e.request.status === 401) {
        try {
          const body = "grant_type=refresh_token&refresh_token=" + getState().auth.refresh;
          let refresh = await axios.post(tokenURL, body, {
            headers: { Authorization: "Basic " + Client },
          });
          //This request only returns a new access token, and not a new refresh token
          dispatch(tokenSuccess(refresh.data.access_token, getState().auth.refresh));
        } catch (err) {
          dispatch(throwError(err));
        }
      }
      else dispatch(throwError(e));
    }
  };
};

// Request to get top tracks ------ not applied/tested yet
export let getTopTracks = (term) => {
  return async (dispatch, getState) => {
    try {
      let response = await axios.get(TracksURL + term, {
        headers: { Authorization: "Bearer " + getState().auth.token },
      });
      dispatch(topTracksSuccess(response.data.items, term));
    }
    catch (e) {
      dispatch(throwError(e));
    }
  };
};

// Request to get top artists, term parameter stands for the time range (long_term, medium_term, short_term)
export let getTopArtists = (term) => {
  return async (dispatch, getState) => {
    try {
      let response = await axios.get(ArtistURL + term, {
        headers: { Authorization: "Bearer " + getState().auth.token },
      });
        console.log("ARTISTS", response);
      // response.data.items is an array of the top 20 artists
      // we're saving the term in the state too just so the buttons on top of the topartist page knows which of them is active
      dispatch(topArtistsSuccess(response.data.items, term));
    }
    catch (e) {
      dispatch(throwError(e));
    }
  };
};
