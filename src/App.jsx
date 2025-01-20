import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import fetchImages from './services/api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Loader from './components/Loader/Loader';
import { Toaster } from 'react-hot-toast';
import LoaderMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query) return;
    const getData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchImages(query, page);
        setImage(prev => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
        console.log(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleSetQuery = searchValue => {
    setQuery(searchValue);
    setImage([]);
    setPage(1);
  };

  const handleChangePage = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      <SearchBar setQuery={handleSetQuery} />
      <Toaster position="top-right" />
      {isError && <ErrorMessage />}
      <ImageGallery images={image} />
      {isLoading && <Loader />}
      {image.length > 0 && page < totalPages && (
        <LoaderMoreBtn changePage={handleChangePage} />
      )}
    </>
  );
}

export default App;
