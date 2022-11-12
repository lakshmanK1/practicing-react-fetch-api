import MovieList from "./components/MoviesList";
import React,{useCallback, useEffect, useState} from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryTimer, setRetryTimer] = useState();
  const [check, setCheck] = useState(false);


  const handleFetch = useCallback(async () => { 
    try{
      setIsLoading(true);
    setError(null);
    const response = await fetch('https://swapi.dev/api/films/');
    
    if(!response.ok){
      throw new Error("Something went wrong...retrying");
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
      setCheck(true);

      const retry_timer = setTimeout(()=>{
        handleFetch();
      },5000);
      setRetryTimer(retry_timer);
    }
    setIsLoading(false);
  },[]) 

  useEffect(()=>{
    handleFetch();
  },[handleFetch])
  
  const handleCancelRetry = () => {
    clearTimeout(retryTimer);
    setCheck(false);
  }
  
  return (
    <div>
     <center><button onClick={handleFetch}>Show Movies</button></center>
      {isloading && <center><p>loading....</p></center>}
      {!isloading && movies.length>0 && <MovieList movies={movies}/>}
      {!isloading && movies.length === 0 && !error && <center><p>No Movies Found...</p></center>}
      {check && !isloading && error && <center><p>{error}</p><br/>
      <button onClick={handleCancelRetry}>STOP RETRYING</button> </center>}
      {!check && !isloading && error && <center><p>Nothing to show...</p></center>}
    </div>
  );
}

export default App;
