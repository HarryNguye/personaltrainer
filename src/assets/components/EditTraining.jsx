import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
// import TrainingDialog from './TrainingDialog'; // Oletan, että sinulla on tämä komponentti

export default function EditTraining({ fetchTrainings, data }) {
  const [training, setTraining] = useState({
    date: '',
    duration: '',
    activity: '',
    customer: ''
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setTraining({
      date: data.date,
      duration: data.duration,
      activity: data.activity,
      customer: data.customer
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveTraining = () => {
    fetch(data._links.training.href, {
      method: 'PUT',
      headers: { 'Content-type':'application/json' },
      body: JSON.stringify(training) 
    })
    .then(response => {
      if (!response.ok)
        throw new Error("Error when updating training: " + response.statusText);

      fetchTrainings();
    })
    .catch(err => console.error(err));

    handleClose();
  }

  const handleChange = (e) => {
    setTraining({...training, [e.target.name]: e.target.value});
  }

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Training</DialogTitle>
        <TrainingDialog training={training} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveTraining}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
