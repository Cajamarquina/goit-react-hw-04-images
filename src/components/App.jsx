import React, { Component } from 'react';
import './App.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import CustomLoader from './Loader/Loader';
import Modal from './Modal/Modal';

const API_KEY = '38986046-b9c5577e52cca94c56fe7a79b';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      images: [],
      page: 1,
      loading: false,
      loadMore: false,
      selectedImage: null,
    };
  }

  fetchImages = async (query, page) => {
    try {
      const response = await fetch(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      if (!response.ok) {
        throw new Error('Not possible to load images');
      }

      const data = await response.json();
      const { hits, totalHits } = data;

      this.setState((prev) => ({
        images: [...prev.images, ...hits],
        loadMore: prev.page < Math.ceil(totalHits / 12),
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ loading: false });
    }
  }

  handleSearch = (query) => {
    this.setState({ query, page: 1, images: [], loading: true }, () => {
      this.fetchImages(query, 1);
    });
  }

  handleLoadMore = () => {
    this.setState(
      (prev) => ({
        page: prev.page + 1,
        loading: true,
      }),
      () => {
        this.fetchImages(this.state.query, this.state.page);
      }
    );
  }

  handleImageClick = (image) => {
    this.setState({ selectedImage: image });
  }

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  }

  render() {
    const { images, loading, loadMore, selectedImage } = this.state;

    return (
      <div className="App">
        <Searchbar onSearch={this.handleSearch} />
        {loading && images.length === 0 && <CustomLoader />}
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {loadMore && <Button onClick={this.handleLoadMore} />}
        {selectedImage && <Modal image={selectedImage} onClose={this.handleCloseModal} />}
      </div>
    );
  }
}

export default App;
