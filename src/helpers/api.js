import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '38526354-71390ec20934c98ef5a24eda8',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const fetchImages = async (q, page) => {
  const { data } = await axios({ params: { q, page } });
  return data;
};
