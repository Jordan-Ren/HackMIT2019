import React, {Component} from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LocationMenu from './LocationMenu';

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
    const foodLocation = document.getElementById('food_location').value
    const foodType = document.getElementById('food_type').value

    const stationNumberToName = {
      1: "Donnelly Field",
      2: "Cooper Square",
      3: "Sennott Park",
      4: "Corporal Burns Playground",
      5: "Green-Rose Heritage Park",
      6: "Clement Morgan Park",
      7: "Dana Park",
      8: "University Park Commons",
      9: "Old Morse Park",
      10: "Fort Washington Park"
      }
    alert("Donation Form Submitted!\nLocation: " + stationNumberToName[foodLocation] + "\nType of Food: " + foodType + "\nThank You!");

    axios({
      method: 'get',
      url: 'http://127.0.0.1:5000/donate?foodtype='+foodType+'&location='+stationNumberToName[foodLocation],
    })
      .then(function (response) {
        window.location.reload()
      });
    axios({
      method: 'get',
      url: 'http://172.16.152.86/add/'+foodLocation,
    })
      .then(function (response) {
        console.log('It worked!')
      });
  }

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        Donate
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Donate Form</DialogTitle>
        <DialogContent>
            <LocationMenu />
            <TextField
            autoFocus
            margin="dense"
            id="food_type"
            label="Type of Food"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
