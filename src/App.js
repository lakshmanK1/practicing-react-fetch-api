import MovieList from "./components/MoviesList";
import React,{useState} from "react";

function App() {
  const [movies, setMovies] = useState([]);

  async function handleFetch (){ 
    const response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json();
 
    const transformedMovies = data.results.map((item)=>{
      return {
        id:item.episode_id,
        title:item.title,
        openingText:item.opening_crawl,
        releaseDate:item.release_date
      }
    })
    setMovies(transformedMovies);
  }  
  
  
  return (
    <div>
     <center><button onClick={handleFetch}>Show Movies</button></center>
      <MovieList movies={movies}/>
    </div>
  );
}

export default App;
