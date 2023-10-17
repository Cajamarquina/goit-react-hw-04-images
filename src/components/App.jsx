import React, { useState, useEffect } from 'react';
import './App.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import CustomLoader from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchImagesFromAPI } from './API';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      const { images: newImages, loadMore: newLoadMore } = await fetchImagesFromAPI(query, page);
      setImages((prevImages) => [...prevImages, ...newImages]);
      setLoadMore(newLoadMore);
      setLoading(false);
    };

    fetchData();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <Searchbar onSearch={handleSearch} />
      {loading && images.length === 0 && <CustomLoader />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loadMore && <Button onClick={handleLoadMore} />}
      {selectedImage && <Modal image={selectedImage} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
