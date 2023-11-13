import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from '@mui/material/Button';
// import EditTraining from "./EditTraining"; // Oletan, että sinulla on vastaava komponentti harjoituksille

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function TrainingList() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings(); // Tämä funktio lataa harjoitustiedot
  }, []);

  const [columnDefs] = useState([
    { field: 'date', sortable: true, filter: true }, // Esimerkiks harjoituksen päivämäärä
    { field: 'duration', sortable: true, filter: true }, 
    { field: 'activity', sortable: true, filter: true },
    { field: 'customer', sortable: true, filter: true },
    
    // Lisää harjoitusten tietoja tarvittaessa
   /* {
      cellRenderer: params => <EditTraining fetchTrainings={fetchTrainings} data={params.data} />,
      width: 120
    },
    {
      cellRenderer: params => 
        <Button size="small" onClick={() => deleteTraining(params.data._links.training.href)}>
          Delete
        </Button>,
      width: 120
    }*/
  ]);

  const fetchTrainings = () => {
    fetch("http://traineeapp.azurewebsites.net/api/trainings")
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Virhe tietojen hakemisessa");
      }
    })
    .then(data => {
      if (Array.isArray(data.content)) {
        setTrainings(data.content);
        console.log(data)
      } else {
        throw new Error("Haettu data ei ole taulukko");
      }
  })
    .catch(error => {
      console.error("Virhe:", error);
  })}

  const deleteTraining = (url) => {
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: 'DELETE' })
        .then(response => {
          if (response.ok)
            fetchTrainings();
          else
            throw new Error("Error in DELETE: " + response.statusText);
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="ag-theme-material" style={{ height: 500 }}>
      <h2>Harjoituslista</h2>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={trainings}
        animateRows={true}>
      </AgGridReact>
    </div>
  );
}

export default TrainingList;
