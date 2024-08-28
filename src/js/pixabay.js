import axios from "axios";

const API_KEY = '45523262-d0ffc350dbb21d9b3ec29cf8d';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchPhotos = async (searchQuery, page) => {
  const urlParams = new URLSearchParams({
    orientation: 'horizontal',
    image_type: 'photo',
      safesearch: true,
      key: API_KEY,
      q: searchQuery,
      page: page,
      per_page: 15,
  });

    const {data} = await axios.get(`${BASE_URL}?${urlParams}`);
    return data;
};