import axios from 'axios';

const BASE_URL = 'https://api.bitechx.com';

export const categoriesAPI = {
  getAll: async (token, offset = 0, limit = 20) => {
    const res = await axios.get(`${BASE_URL}/categories?offset=${offset}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  search: async (token, searchedText) => {
    const res = await axios.get(`${BASE_URL}/categories/search?searchedText=${searchedText}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};
