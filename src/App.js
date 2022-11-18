import "./App.css";
import Search from "./Search.svg";
import MovieCard from "./MovieCard";

import { useEffect, useState } from "react";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=faf14392";

// const movie1 = {
//   Title: "The Amazing Spiderman T4 Premiere Special",
//   Year: "2012",
//   imdbID: "tt2233044",
//   Type: "movie",
//   Poster: "N/A",
// };

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");

  const searchMovies = async (title) => {
    const responce = await fetch(`${API_URL}&s=${title}`);
    const data = await responce.json();
    setMovies(data.Search);
    setsearchTerm("");
  };

  useEffect(() => {
    searchMovies("avenger");
  }, []);
  return (
    <div className="app">
      <h1>Movie Land</h1>
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
          placeholder="search for movies"
          type="text"
        />
        <img
          src={Search}
          onClick={() => searchMovies(searchTerm)}
          alt="search"
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};
export default App;
