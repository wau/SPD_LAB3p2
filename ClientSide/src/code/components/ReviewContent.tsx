//imports
import React, { useEffect, useState } from "react";

import Rating from '@mui/material/Rating';
import Button from "@material-ui/core/Button";
import { Link, List } from "@material-ui/core";
import * as Users from "../Users"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const Review = ({ review, state, movie, callbackFn }) => {
  
  
  const [open, setOpen] = useState<boolean>(false);
  const [openDel, setDel] = useState<boolean>(false);
  const [user, setUser] = useState<Users.IUser>();
  const [toggle, setToggle] = useState(false);
  const [comment, setComment] = useState<string>('');
  const [starvalue, setValueStar] = useState<number>(0);

  const awaitUser = async () => {
    const awaituser = await state.getUser(review.userId);
    setUser(awaituser);
  }


  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDelete = () => {
    setDel(false);
  };

  useEffect(() => {
    awaitUser();
  }, []);

  const deleteReview = async () => {
    await state.delReview(movie._id,user._id);
    setDel(false);
    callbackFn();
  };

  const editReview = async () => {
    const review = {
      userId: state.userId,
      movieId: movie._id,
      description: comment,
      rating: starvalue, // 0 to 5
    }
    
    await state.editReview(review);
    handleClose();
    callbackFn();
  }

  return (

    <List key={review._id} >
      <div className="uiComments" >
        <div className="comment">
          <a className="avatar">
            <img style={{ float: 'left', marginRight: 5, marginTop: "7px" }} className="pfp" src={require(`../../images/${state.profilepic}`)} />
          </a>
          <div className="content">
            {user != undefined &&
              <div className="author" style={{ marginBottom: '10px', padding: '10px' }}>{`${user.name}`}</div>
            }

            <Rating name="read-only" value={review.rating} readOnly precision={0.5} />
            <div className="text" style={{ marginLeft: '5px', paddingBottom: '10px' }}>{`${review.description}`}</div>
            
            {state.userId == review.userId &&
                <div>
                    <div>
                        <Link id="link" onClick={() =>  setOpen(true)} style={{ marginBottom: '10px', marginRight: '10px', marginLeft: '10px' }} >Edit</Link>
                        <Link id="link" onClick={() =>  setDel(true)} style={{ marginBottom: '10px', marginRight: '10px' }} >Delete</Link>
                    </div>
                </div>
            }
          </div>
        </div>
      </div>

      <div>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
          <DialogTitle>Edit review</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit your review
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
            <Button onClick={editReview}>Post</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog open={openDel} onClose={handleClose} fullWidth maxWidth="lg">
          <DialogTitle>Delete review</DialogTitle>
          <DialogContent>
              Are you sure you want to delete this review!!
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete}>Cancel</Button>
            <Button onClick={deleteReview}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>


    </List>
  )

}; /* WelcomeView. */


export default Review;