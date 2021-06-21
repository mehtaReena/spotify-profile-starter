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




const Client = "M2RiZjFhOTE0NmM2NDFlMGI2MjliZWY1YmE3MTFkODQ6OWYzMTIyM2QyZTNmNDg3NGJlMTFhZGY3ODhmNjQ1YjM=";


  //let redirect = "&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fprofile";

  //netlify redirect
  const redirect = '&redirect_uri=https://festive-hopper-6d822d.netlify.app/profile '




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



export let getToken = (code) => {
  return async (dispatch) => {
    const body = "grant_type=authorization_code&code=" + code + redirect;
    console.log( " get Token .."+ body)
    try {
      let response = await axios.post(tokenURL, body, {
        headers: {
          Authorization: "Basic " + Client,
        },
      });
      console.log( "getToken response .." , response)

      dispatch(tokenSuccess(response.data.access_token, response.data.refresh_token));
      localStorage.setItem("Token", response.data.access_token);
      localStorage.setItem("Refresh", response.data.refresh_token);

    } catch (e) {
      dispatch(throwError(e));
    }
  };
};


export let getInfo = () => {
  return async (dispatch, getState) => {
    try {

      let profile = await axios.get(ProfileURL, {
        headers: { Authorization: "Bearer " + getState().auth.token },
      });

      let following = await axios.get(ProfileURL + "/following?type=artist", {
        headers: { Authorization: "Bearer " + getState().auth.token },
      });

      let playlists = await axios.get(ProfileURL + "/playlists", {
        headers: { Authorization: "Bearer " + getState().auth.token },
      });

        dispatch(profileSuccess({ ...profile.data, following: following.data.artists.total, playlists: playlists.data.total, }));

    } catch (e) {

      if (e.request.status === 401) {
        try {
          const body = "grant_type=refresh_token&refresh_token=" + getState().auth.refresh;
          let refresh = await axios.post(tokenURL, body, {
            headers: { Authorization: "Basic " + Client },
          });

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


export let getTopArtists = (term) => {
  return async (dispatch, getState) => {
    try {
      let response = await axios.get(ArtistURL + term, {
        headers: { Authorization: "Bearer " + getState().auth.token },
      });
        console.log("ARTISTS", response);

      dispatch(topArtistsSuccess(response.data.items, term));
    }
    catch (e) {
      dispatch(throwError(e));
    }
  };
};
