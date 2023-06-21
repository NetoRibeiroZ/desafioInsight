import axios from "axios";

export const getIdsFromObject = (data) =>
  axios({
    url: "/collection/v1/search",
    method: "GET",
    params: {
      q: data.query,
      artistOrCulture: data?.artistOrCulture,
      geoLocation: data?.geoLocation,
      title: data?.title,
    },
  })
    .then((response) => {
      return { kind: "ok", data: response.data };
    })
    .catch((error) => {
      return { kind: "error", data: error.response?.data };
    });
export const getObjectById = (objectID) =>
  axios({
    url: `/collection/v1/objects/${objectID}`,
    method: "GET",
  })
    .then((response) => {
      return { kind: "ok", data: response.data };
    })
    .catch((error) => {
      return { kind: "error", data: error.response?.data };
    });
