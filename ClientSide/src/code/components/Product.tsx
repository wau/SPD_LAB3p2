// React imports.
import React, { useEffect, useRef } from "react";
import Rating from '@mui/material/Rating';
import Button from "@material-ui/core/Button";
import Stack from "@mui/material/Stack";
import { useState } from 'react';
import * as Users from "../Users"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import ReviewContent from "./ReviewContent";


const Product = ({ movie, state }) => {


  const [toggle, setToggle] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState();

  const submitPost = async () => {
    const review = {
      userId: state.userId,
      movieId: movie._id,
      description: comment,
      rating: starvalue, // 0 to 5
    }
    await state.postReview(review);
    handleClose();

    redo();
    
  };

  const seila = () => {

    awaitReviews();
    setToggle(!toggle);
  };


  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [user, setUser] = useState<Users.IUser>();

  const awaitReviews = async () => {
    const awaitreview = await state.reviews(movie._id);
    setReviews(awaitreview);
  }

  const awaitAverage = async () => {
    const awaitaverage = await state.averageRating(movie._id);
    setAverage(awaitaverage);
  }

  const redo = async () => {
    awaitAverage();
    awaitReviews();
  }

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    }
    else {
      awaitReviews();
      awaitAverage();
    }


  }, [toggle]);

  const [comment, setComment] = useState<string>('');
  const [starvalue, setValueStar] = useState<number>(0);
  return (
    <div className="movie1">

      <img className="imageFilm" src={`${movie.imageuRL}`} />
      <h4 style={{ color: 'white', paddingTop: '10px', width: '400px' }}>{`${movie.name}`} </h4>
      {average &&
        <Rating key={average} name="read-only" value={average} precision={0.5} readOnly />  
      }
      <p style={{ color: 'white', width: 'auto', marginLeft: '247.38px', marginRight: '10px' }}>Description: <br />{`${movie.description}`}</p>

      {state.userName == null &&
        <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Login first!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please login first to post a review
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
        ||
        <div>
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
            <DialogTitle>Review</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter your review
              </DialogContentText>
              <Rating
                name="simple-controlled"
                value={starvalue}
                onChange={(event, newValue) => {
                  setValueStar(newValue);
                }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="comment"
                label="Comment"
                type="text"
                fullWidth
                variant="standard"
                onChange={(event) => {
                  setComment(event.target.value);
                }}
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={submitPost}>Post</Button>
            </DialogActions>
          </Dialog>
        </div>
      }
      {/* comentSection */}
      {(toggle &&
        <Stack>
          {reviews.map((review) => {
            return (
              <ReviewContent key={review._id} review={review} state={state} movie={movie} callbackFn={redo}></ReviewContent>
            )
          })
          }
        </Stack>
      )}
      {(toggle &&
        <Button onClick={() => setToggle(!toggle)} style={{ background: '#ffde59', float: 'right', marginBottom: '10px', marginRight: '10px' }} >Show less</Button>
        ||
        <Button onClick={() => setToggle(!toggle)} style={{ background: '#ffde59', float: 'right', marginBottom: '10px', marginRight: '10px' }} >Show more</Button>
      )}
      <Button onClick={handleClickOpen} style={{ background: '#ffde59', float: 'right', marginBottom: '10px', marginRight: '10px' }} >Add review</Button>

      <div className="clear"></div>
    </div>
  )
};


export default Product;