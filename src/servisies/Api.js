import axios from 'axios';

const pixabayApi = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    key: '32875962-75e3deeecb029b3447d6e6fc0',
  },
});

export const fetchPhotosData = async (query, currentPage) => {
  const { data } = await pixabayApi.get('', {
    params: { q: query, page: currentPage },
  });
  const photos = data.hits.map(({ id, webformatURL, tags, largeImageURL }) => ({
    id,
    webformatURL,
    tags,
    largeImageURL,
  }));
  const totalPhotos = data.totalHits;
  // console.log(totalImages);
  // console.log(images);
  return { totalPhotos, photos };
};
