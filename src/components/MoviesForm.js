import React ,{useState}from 'react'

function MoviesForm(props) {

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
      title : title,
      openingText : openText,
      releaseDate : new Date (releaseDate)
    }

    props.handleMoviesForm(UserData);

    setTitle('');
    setOpenText('');
    setReleaseDate('');
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
    </div>
  )
}

export default MoviesForm