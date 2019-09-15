import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  function handleSubmit(event) {
    event.preventDefault()
    const company = document.getElementById('company').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    axios({
      method: 'get',
      url: 'http://127.0.0.1:5000/login?&company='+company+'&email='+email+'&password='+password,
    })
    .then(function(response) {
      if (response.data[0]['created'] == 'True') {
        alert("Account Created!")
      } else {
        alert("The email is already in use.")
      }
      window.location.reload()
      setOpen(false);
    })
  }

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        Sign Up
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
        <DialogContent>
            <TextField
            autoFocus
            margin="dense"
            id="company"
            label="Company"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
