import { useState, useEffect } from 'react';
import { searchImages } from '../api/api';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState(null);


  useEffect(() => {
    const getImages = async () => {
      if (!query) {
        return;
      }
      try {
        setIsLoading(true);
        const { images: newImages, totalHits: newTotalHits } = await searchImages(query, page);
        if (newImages.length === 0) {
          setError('There are no images matching your request...');
          return;
        }
        // додавання нових зображень до списку `images`
        setImages(prevImages => [...prevImages, ...newImages]);
        setError(null);
        setTotalHits(newTotalHits);
      } catch (error) {
        setError('😫Oops... Something went wrong, try again');
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const handleQuerySubmit = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setTotalHits(0);
  };


  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

    return (
      <div>
      <Searchbar onSubmit={handleQuerySubmit} />
      {images.length !== 0 && (
        <ImageGallery images={images}/>
      )}
      {error && <p>{error}</p>}
      {!isLoading && totalHits !== images.length && (
        <Button type="button" onClick={handleLoadMore} />
      )}
      {isLoading && <Loader />}
    </div>
    );
}