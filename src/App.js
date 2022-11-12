import MovieList from "./components/MoviesList";
import React,{useCallback, useEffect, useState} from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryTimer, setRetryTimer] = useState();
  const [check, setCheck] = useState(false);

  //For Handleing form
  const [title, setTitle] = useState('');
  const [openText, setOpenText] = useState('');
  const [releaseDate, setReleaseDate] = useState();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  }
  const handleOpentext = (e) => {
    setOpenText(e.target.value);
  }
  const handleReleaseDate = (e) => {
    setReleaseDate(e.target.value);
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const UserData = {
      Title : title,
      OpenText : openText,
      ReleaseDate : new Date (releaseDate)
    }

    console.log(UserData);

    setTitle('');
    setOpenText('');
    setReleaseDate('');


  }


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
      <center>
      <form onSubmit={handleSubmitForm}>
        <label>Title:</label>
        <input type='text'value={title} onChange={handleTitle}/><br/>
        <label>Opening Text:</label>
        <input type='text' value={openText} onChange={handleOpentext}/><br/>
        <label>Release Date:</label>
        <input type='date' value={releaseDate} onChange={handleReleaseDate}/><br/>
        <button type="submit">Add Movie</button>
      </form>
      </center>
      
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
