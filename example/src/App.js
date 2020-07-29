import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { OpenInCytoscapeButton } from 'cytoscape-explore-ui'
import 'cytoscape-explore-ui/dist/index.css'



const App = () => {

  let DEFAULT_NETWORK_PROPERTIES = {
    ndexServer: 'http://public.ndexbio.org/', 
    uuid: 'b1e9a489-bbe7-11ea-aaef-0ac135e8bacf',
    username: 'ismbdemo',
    password: 'ismbdemo2020'
  };

  const [ndexNetworkProperties, setNdexNetworkProperties] = useState(DEFAULT_NETWORK_PROPERTIES);

  const handleChange = (event) => {
    const newProperties = Object.assign({}, ndexNetworkProperties);
    switch(event.target.id) {
      case 'uuid' : newProperties['uuid'] = event.target.value; break;
      case 'username' : newProperties['username'] = event.target.value; break;
      case 'password' : newProperties['password'] = event.target.value; break;
      default: break;
    }
    setNdexNetworkProperties(
      newProperties
    );
  
  }

  const fetchCX = () => {
    return fetch('./example.cx')
      .then(function (response) {
        return response.json();
      })
  }

  return <div>

    <Button
      variant="outlined"
      color="primary"
      size="small"
    >
      Save
      </Button>
    <OpenInCytoscapeButton variant="outlined" size="small" fetchCX={fetchCX} />
    <Button
      variant="outlined"
      color="primary"
      size="medium"
    >
      Save
      </Button>
    <OpenInCytoscapeButton variant="outlined" size="medium" fetchCX={fetchCX} />
    <Button
      variant="outlined"
      color="primary"
      size="large"
    >
      Save
      </Button>
    <OpenInCytoscapeButton variant="outlined" size="large" fetchCX={fetchCX} />
    <br />
    <TextField
          id="uuid"
          label="UUID"
          autoComplete="uuid"
          onChange= {handleChange}
          value= {ndexNetworkProperties.uuid}
    /><br />
    <TextField
          id="username"
          label="User Name"
          autoComplete="username"
          onChange= {handleChange}
          value= {ndexNetworkProperties.username}
    /><br />
    <TextField
          id="password"
          label="Password"
          autoComplete=""
          onChange= {handleChange}
          type="password"
          value= {ndexNetworkProperties.password}
    /><br />
    <OpenInCytoscapeButton ndexNetworkProperties={ndexNetworkProperties}></OpenInCytoscapeButton>
  </div>
}
export default App