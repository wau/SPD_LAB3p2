// React imports.
import React, { useEffect } from "react";
import Product from "./Product";
import { useState } from 'react';
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import List from "@material-ui/core/List";

const LoopProducts = ({state}) => {

  const [movies, setMovies] = useState([])

  const awaitMovies = async () => {

    const movie = await state.productsFilm();
    setMovies(movie);
  }
  
  useEffect(() =>{
    awaitMovies();
  },[]);

  return (<div className="containerAllMovies">
      {movies.map((movie) =>{
        return (
            <Product key={movie._id} movie={movie} state={state} />  
        )
      })}
    </div>
  ) 
}; /* WelcomeView. */


export default LoopProducts;