import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import fetchImages from './services/api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [image, setImage] = useState([]);

  useEffect(() => {
    if (!query) return;
    const getData = async () => {
      try {
        setIsError(false);
        const data = await fetchImages(query, page);
        setImage(prev => [...prev, ...data.results]);
      } catch {
        setIsError(true);
      } finally {
        console.log(getData);
      }
    };
    getData();
  }, [query, page]);

  const handleSetQuery = searchValue => {
    setQuery(searchValue);
    setImage([]);
    setPage(1);
  };

  return (
    <>
      <SearchBar setQuery={handleSetQuery} />
      <Toaster />
      {isError}
      <ImageGallery images={image} />
    </>
  );
}

export default App;
