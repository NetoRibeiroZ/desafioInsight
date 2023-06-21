import axios from 'axios';

const API_BASE_URL = 'https://collectionapi.metmuseum.org/public';

export async function searchArtworksByArtist(artistName) {
  try {
    const response = await axios.get(`${API_BASE_URL}/collection/v1/search`, {
      params: {
        artistOrCulture: true,
        q: artistName,
      },
    });
    const objectIDs = response.data.objectIDs;
    return fetchArtworksDetails(objectIDs);
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function searchArtworksByLocation(location) {
  try {
    const response = await axios.get(`${API_BASE_URL}/collection/v1/search`, {
      params: {
        geoLocation: location,
        q: location,
      },
    });
    const objectIDs = response.data.objectIDs;
    return fetchArtworksDetails(objectIDs);
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function searchArtworksByTitle(title) {
  try {
    const response = await axios.get(`${API_BASE_URL}/collection/v1/search`, {
      params: {
        title: true,
        q: title,
      },
    });
    const objectIDs = response.data.objectIDs;
    return fetchArtworksDetails(objectIDs);
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchArtworksDetails(objectIDs) {
  try {
    const promises = objectIDs.map((objectID) =>
      axios.get(`${API_BASE_URL}/collection/v1/objects/${objectID}`)
    );
    const responses = await Promise.allSettled(promises);
    const artworks = responses
      .filter((response) => response.status === 'fulfilled' && response.value.data)
      .map((response) => response.value.data);
    return artworks;
  } catch (error) {
    console.log(error);
    return [];
  }
}