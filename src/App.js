import MovieList from "./components/MoviesList";
import React,{useCallback, useEffect, useState} from "react";
import MoviesForm from "./components/MoviesForm";
import MoviesList from "./components/MoviesList";

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

    const response = await fetch('https://my-react-fetch-default-rtdb.firebaseio.com/movies.json');
    
    if(!response.ok){
      throw new Error("Something went wrong...retrying");
    }

    const data = await response.json();

    const loadedData = [];

    for(const key in data){
      loadedData.push({
        id:key,
        title:data[key].title,
        openingText:data[key].openingText,
        releaseDate:data[key].releaseDate
      });
    }
 
    setMovies(loadedData);
    
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

  // useEffect(()=>{
  //   handleFetch();
  // },[handleFetch])
  
  const handleCancelRetry = () => {
    clearTimeout(retryTimer);
    setCheck(false);
  }

  async function moviesAddFormHandle (dataMovies) {
    const response = await fetch('https://my-react-fetch-default-rtdb.firebaseio.com/movies.json',{
      method:'POST',
      body:JSON.stringify(dataMovies),
      headers:{
        'content-type' : 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  const deleteMovieHandler = async (id) => {
    console.log({ id });
    await fetch(
      "https://my-react-fetch-default-rtdb.firebaseio.com/movies/${id}",
      {
        method: "DELETE",
        body: JSON.stringify(movies),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    handleFetch();
  };
  
  return (
    <div>
      <MoviesForm handleMoviesForm={moviesAddFormHandle}/>
      <MoviesList movies={movies} deleteRequestApp={deleteMovieHandler} />
     <center><button onClick={handleFetch}>Show Movies</button></center>
      {isloading && <center><p>loading....</p></center>}
      {/* {!isloading && movies.length>0 && <MovieList movies={movies}/>} */}
      {!isloading && movies.length === 0 && !error && <center><p>No Movies Found...</p></center>}
      {check && !isloading && error && <center><p>{error}</p><br/>
      <button onClick={handleCancelRetry}>STOP RETRYING</button> </center>}
      {!check && !isloading && error && <center><p>Nothing to show...</p></center>}
    </div>
  );
}

export default App;
