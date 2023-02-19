import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { fetchPhotosData } from '../servisies/Api.js';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Button } from './Button/Button.jsx';
// import { GlobalStyle } from '../utils/GlobalStyles';
import { AppContainer } from './App.styled.js';
import { Loader } from './Loader/Loader.jsx';
import { pixabayApi } from '../servisies/Api.js';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPhotos, setTotalPhotos] = useState(0);

  // state = {
  //   searchQuery: '',
  //   photos: [],
  //   loading: false,
  //   error: '',
  //   currentPage: 1,
  //   totalPhotos: 0,
  // };

  const handleSubmit = query => {
    if (query === searchQuery) {
      alert('Enter new request');
    }

    setSearchQuery(query);
    setCurrentPage(1);
    setPhotos([]);
    setTotalPhotos(0);
  };

  const handleAddPhotos = () => {
    setCurrentPage(prevState => prevState + 1);

    // this.setState(prevState => ({
    //   currentPage: prevState.currentPage + 1,
    // }));
  };

  useEffect(() => {
    if (searchQuery === '' && currentPage === 1) return;
    async function takePhotos() {
      setLoading(true);
      setError('');

      try {
        const { photos, totalPhotos } = await fetchPhotosData(
          searchQuery,
          currentPage
        );
        setPhotos(prevState => [...prevState, ...photos]);
        setTotalPhotos(totalPhotos);
        if (totalPhotos.length < 1) {
          alert('Nothing was found for your request');
          return;
        }
      } catch (error) {
        alert('Ooops, something went wrong');
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    takePhotos();
  }, [searchQuery, currentPage]);

  // async componentDidUpdate(_, prevState) {
  //   // const { searchQuery, currentPage } = this.state;
  //   if (
  //     prevState.searchQuery !== searchQuery ||
  //     prevState.currentPage !== currentPage
  //   ) {
  //     try {
  //       //всегда нужна проверка, если что-то изменилось, тогда посылаем запрос

  //       this.setState({ loading: true, error: '' });

  //       const { photos, totalPhotos } = await fetchPhotosData(
  //         searchQuery,
  //         currentPage
  //       );
  //       this.setState(prevState => ({
  //         photos: [...prevState.photos, ...photos],
  //         totalPhotos,
  //       }));

  //       if (totalPhotos.length < 1) {
  //         alert('Nothing was found for your request');
  //         return;
  //       }
  //     } catch (error) {
  //       alert('Ooops, something went wrong');
  //       this.setState({ error: error.message });
  //     } finally {
  //       this.setState({ loading: false });
  //     }
  //   }
  // }

  return (
    <AppContainer>
      <Searchbar handleSubmit={handleSubmit} />
      {loading && <Loader />}
      {photos.length !== 0 && <ImageGallery photosData={photos} />}
      {totalPhotos !== photos.length && !loading && (
        <Button onClick={handleAddPhotos} />
      )}
    </AppContainer>
  );
}
