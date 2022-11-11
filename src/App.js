import MovieList from "./components/MoviesList";
import React,{useState} from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState()

  async function handleFetch (){ 
    try{
      setIsLoading(true);
    setError(null);
    const response = await fetch('https://swapi.dev/api/film/');
    
    if(!response.ok){
      throw new Error("Something went wrong!");
    }

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
    
    }catch(error){
      setError(error.message)
    }
    setIsLoading(false);

    

  }  
  
  
  return (
    <div>
     <center><button onClick={handleFetch}>Show Movies</button></center>
      {!isloading && movies.length>0 && <MovieList movies={movies}/>}
      {!isloading && movies.length === 0 && !error && <center><p>No Movies Found...</p></center>}
      {!isloading && error && <center><p>Something went wrong..</p></center>}
      {isloading && <center><p>loading....</p></center>}
      
    </div>
  );
}

export default App;
