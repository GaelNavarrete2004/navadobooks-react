import React, { useState, useContext, useEffect, useCallback } from 'react';

const URL = "https://www.googleapis.com/books/v1/volumes?q="; // Nueva URL para Google Books API
const API_KEY = 'AIzaSyDzfiCMdEHjMAQL3KOzXd-7T989k5h6Tes'; // Asegúrate de incluir tu API key de Google Books
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("harry potter");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState("");

const fetchBooks = useCallback(async () => {
  setLoading(true);
  try {
    const response = await fetch(`${URL}${searchTerm}&key=${API_KEY}&maxResults=20`);
    const data = await response.json();
    const { items } = data; // La API de Google Books devuelve un array llamado 'items'

    if (items) {
      const newBooks = items.slice(0, 20).map((bookSingle) => {
        const { id, volumeInfo } = bookSingle;
        const {
          authors,
          imageLinks,
          title,
          publishedDate,
          pageCount,
          ratingsCount,
          averageRating // Agregamos el averageRating desde volumeInfo
        } = volumeInfo;

        return {
          id: id,
          author: authors ? authors.join(', ') : 'N/A',
          cover_id: imageLinks?.thumbnail, // URL de la imagen del libro
          title: title,
          first_publish_year: publishedDate,
          page_count: pageCount || "N/A",
          rating_count: ratingsCount || "N/A", // Valor por defecto si no hay rating
          averageRating: averageRating || "N/A", // Valor por defecto si no hay rating
        };
      });

      setBooks(newBooks);

      if (newBooks.length > 1) {
        setResultTitle("Your Search Result");
      } else {
        setResultTitle("No Search Result Found!");
      }
    } else {
      setBooks([]);
      setResultTitle("No Search Result Found!");
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
}, [searchTerm]);

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, fetchBooks]);

  return (
    <AppContext.Provider value={{
      loading, books, setSearchTerm, resultTitle, setResultTitle,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
