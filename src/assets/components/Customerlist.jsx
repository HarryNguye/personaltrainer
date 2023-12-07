import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import AddCustomer from "./AddCustomer";

//import EditCustomer from "./EditCustomer"; // Oletan, että sinulla on tämä komponentti

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function CustomerList() {
  const [customer, setCustomer] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
  });


  useEffect(() => {
    fetchCustomer();
  }, []);
  

  const [columnDefs] = useState([
    { field: 'firstname', sortable: true, filter: true },
    { field: 'lastname', sortable: true, filter: true },
    { field: 'streetaddress', sortable: true, filter: true },
    { field: 'postcode', sortable: true, filter: true },
    { field: 'city', sortable: true, filter: true },
    { field: 'email', sortable: true, filter: true },
    { field: 'phone', sortable: true, filter: true },
  ]);

  const fetchCustomer = () => {
    fetch('http://traineeapp.azurewebsites.net/api/customers')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Virhe tietojen hakemisessa");
      }
    })
    .then(data => {
      if (Array.isArray(data.content)) {
        setCustomer(data.content);
        console.log(data)
      } else {
        throw new Error("Haettu data ei ole taulukko");
      }
  })
    .catch(error => {
      console.error("Virhe:", error);
  })}

  const deleteCustomer = (url) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      fetch(url, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            // Päivittää asiakaslistan poiston jälkeen
            fetchCustomer();
          } else {
            throw new Error("Error in DELETE: " + response.statusText);
          }
        })
        .catch(err => console.error(err));
    }
  };

  return (

    <div className="ag-theme-material" style={{ height: 500 }}>
      <h2 style={{ color: 'white' }}>Customerlist</h2>
      <AddCustomer fetchCustomer={fetchCustomer}/>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={customer}
        animateRows={true}>
          
      </AgGridReact>
    </div>
  );
}

export default CustomerList;