import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { fetchImages } from '../services/images-api';
import Button from './Button';
import Loader from './Loader';


export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHandler = () => {
      setIsLoading(true);
      fetchImages(searchQuery, page)
        .then(result => {
          if (result.hits.length === 0) {
            setSearchResult([]);
            setPage(1);
            return toast(
              `There are no images by search request "${searchQuery}"`,
              { theme: 'dark' }
            );
          }
          setSearchResult([...searchResult, ...result.hits]);
        })
        .catch(error => setError(error))
        .finally(() => {
          setIsLoading(false);
        });
    };

    searchQuery !== '' && fetchHandler();
  }, [searchQuery, page]);

  const onLoadMoreClick = () => {
      setPage(page + 1);
  };
  
  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setSearchResult([]);
  };

  return (
    <div className="app">
      <Searchbar onSubmit={handleFormSubmit} />
      {searchResult.length > 0 && <ImageGallery searchResult={searchResult} />}
      {isLoading && <Loader />}
      {searchResult.length > 0 && !isLoading && (
        <Button onClick={onLoadMoreClick} />
      )}
      <ToastContainer theme="dark" />
    </div>
  );
};
