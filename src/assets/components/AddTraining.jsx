import { useState } from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types'; 

export default function AddTrainings({ fetchTrainings }){
const [newTrainings, setNewTrainings] = useState({
    Date: '',
    Duration: '',
    Activity: '',
    Customer: '',
  });



const handleInputChange = (e) => {
    setNewTrainings({
      ...newTrainings,
      [e.target.name]: e.target.value
    });
  };


const saveTrainings = () => {
    fetch('http://traineeapp.azurewebsites.net/api/trainings', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newTrainings)
  })
    .then(response => {
      if(response.ok)
      fetchTrainings();
        else
        throw new Error("Error in POST: " + response.statusText);

    })
      .catch(err => console.log(err));
  }

  return(
    <div>
      <h2>Add Training</h2>
      <div>
        <input
          type="text"
          name="Date"
          placeholder="Date"
          onChange={handleInputChange}
          value={newTrainings.date}
        />
        <input
          type="text"
          name="Duration"
          placeholder="Duration"
          onChange={handleInputChange}
          value={newTrainings.Duration}
        />
        <input
          type="text"
          name="Activity"
          placeholder="Activity"
          onChange={handleInputChange}
          value={newTrainings.Activity}
        />
        <input
          type="text"
          name="Customer"
          placeholder="Customer"
          onChange={handleInputChange}
          value={newTrainings.Customer}
 
        />
        {/* Add more input fields as needed */}
        <Button size="small" onClick={saveTrainings}>
          Add Customer
        </Button>
      </div>
    </div>
  );
}

AddTrainings.propTypes = {
    fetchCustomer: PropTypes.func.isRequired,
  };
 