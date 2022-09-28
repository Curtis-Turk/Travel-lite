// import { useEffect } from “react”;

//  <form>
//  <label>
//    Name:
//    <input type="text" name="name" />
//  </label>
//  <input type="submit" value="Submit" />
// </form>
 

 import React from 'react';

  function Home(props) {
    const handleSubmit= (e) => {
      e.preventDefault();
      // ???
    }
  
    return (
      <form onSubmit={e => {handleSubmit(e)}}>
        <label>From: </label>
        <br />
        <input 
          name='choreDesc' 
          type='text'
        />
        <br/>
        <label>To: </label>
        <br />
        <input 
          name='userName' 
          type='text' 
        />
        <br />
        <label>Date</label>
        <br />
        <input
          name='dt' 
          type='date'
        />
        <br/>
        <input 
          className='submitButton'
          type='submit' 
          value='Submit' 
        />
      </form>
    )
  }

  export default Home;