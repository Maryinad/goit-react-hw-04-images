import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { fetchPhotosData } from '../servisies/Api.js';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Button } from './Button/Button.jsx';
// import { GlobalStyle } from '../utils/GlobalStyles';
import { AppContainer } from './App.styled.js';
import { Loader } from './Loader/Loader.jsx';

export class App extends Component {
  state = {
    searchQuery: '',
    photos: [],
    loading: false,
    error: '',
    currentPage: 1,
    totalPhotos: 0,
  };

  handleSubmit = query => {
    if (query === this.state.searchQuery) {
      alert('Enter new request');
    }
    this.setState({
      searchQuery: query,
      currentPage: 1,
      photos: [],
      totalPhotos: 0,
    });
  };

  handleAddPhotos = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, currentPage } = this.state;
    if (
      prevState.searchQuery !== searchQuery ||
      prevState.currentPage !== currentPage
    ) {
      try {
        //всегда нужна проверка, если что-то изменилось, тогда посылаем запрос

        this.setState({ loading: true, error: '' });

        const { photos, totalPhotos } = await fetchPhotosData(
          searchQuery,
          currentPage
        );
        this.setState(prevState => ({
          photos: [...prevState.photos, ...photos],
          totalPhotos,
        }));

        if (totalPhotos.length < 1) {
          alert('Nothing was found for your request');
          return;
        }
      } catch (error) {
        alert('Ooops, something went wrong');
        this.setState({ error: error.message });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    const { loading, photos, totalPhotos } = this.state;
    return (
      <AppContainer>
        <Searchbar handleSubmit={this.handleSubmit} />
        {loading && <Loader />}
        {photos.length !== 0 && <ImageGallery photosData={photos} />}
        {totalPhotos !== photos.length && !loading && (
          <Button onClick={this.handleAddPhotos} />
        )}
      </AppContainer>
    );
  }
}
