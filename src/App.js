import MovieList from "./components/MoviesList";
import React,{useState} from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  async function handleFetch (){ 
    setIsLoading(true);
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
    setIsLoading(false);
  }  
  
  
  return (
    <div>
     <center><button onClick={handleFetch}>Show Movies</button></center>
      {!isloading && movies.length>0 && <MovieList movies={movies}/>}
      {!isloading && movies.length === 0 && <center><p>No Movies Found...</p></center>}
      {isloading && <center><p>loading....</p></center>}
    </div>
  );
}

export default App;
