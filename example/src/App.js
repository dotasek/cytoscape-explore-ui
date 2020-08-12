import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { OpenInCytoscapeButton } from 'cytoscape-explore-ui'
import { NDExSignInButton } from 'cytoscape-explore-ui'
import { CyNDExProvider } from 'cytoscape-explore-ui'
import Typography from '@material-ui/core/Typography'
import 'cytoscape-explore-ui/dist/index.css'
import { NDExAccountProvider } from 'cytoscape-explore-ui'



const App = () => {

  let DEFAULT_NETWORK_PROPERTIES = {
    ndexServer: 'http://public.ndexbio.org/',
    uuid: 'b1e9a489-bbe7-11ea-aaef-0ac135e8bacf',
    username: 'ismbdemo',
    password: 'ismbdemo2020'
  };

  const loginStateUpdated = loginState => {
    console.log("Update in login state: " + JSON.stringify(loginState));
  }

  const [ndexNetworkProperties, setNdexNetworkProperties] = useState(DEFAULT_NETWORK_PROPERTIES);

  const handleChange = (event) => {
    const newProperties = Object.assign({}, ndexNetworkProperties);
    switch (event.target.id) {
      case 'uuid': newProperties['uuid'] = event.target.value; break;
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

  return <CyNDExProvider port='1234' >
    <NDExAccountProvider ndexServerURL='http://public.ndexbio.org/' >
    <Typography variant="h6" gutterBottom>
      OpenInCytoscapeButton
      </Typography>
    <Button
      variant="outlined"
      color="primary"
      size="small"
    >
      SML
      </Button>
    <OpenInCytoscapeButton variant="outlined" size="small" fetchCX={fetchCX} />
    &nbsp;
    <Button
      variant="outlined"
      color="primary"
      size="medium"
    >
      MED
      </Button>
    <OpenInCytoscapeButton variant="outlined" size="medium" fetchCX={fetchCX} />
    &nbsp;
    <Button
      variant="outlined"
      color="primary"
      size="large"
    >
      LRG
      </Button>
    <OpenInCytoscapeButton variant="outlined" size="large" fetchCX={fetchCX} /><br />

    <br />
    <Typography variant="h6" gutterBottom>
      OpenInCytoscapeButton with Context Authentication
      </Typography>

    <TextField
      id="uuid"
      label="UUID"
      autoComplete="uuid"
      onChange={handleChange}
      value={ndexNetworkProperties.uuid}
    /><br />
    <br />
    <OpenInCytoscapeButton variant="outlined" ndexNetworkProperties={ndexNetworkProperties}></OpenInCytoscapeButton>
    <br /><br />
    <Typography variant="h6" gutterBottom>
      NDEx Login Button
      </Typography>
    <Button
      variant="outlined"
      color="primary"
      size="small"
    >SML
    </Button>
    <NDExSignInButton variant="outlined" size="small" onLoginStateUpdated={loginStateUpdated} />
    &nbsp;
    <Button
      variant="outlined"
      color="primary"
      size="medium"
    >MED
    </Button>
    <NDExSignInButton variant="outlined" size="medium" onLoginStateUpdated={loginStateUpdated} />
    &nbsp;
    <Button
      variant="outlined"
      color="primary"
      size="large"
    >LRG
    </Button>
    <NDExSignInButton variant="outlined" size="large" onLoginStateUpdated={loginStateUpdated} />
    </NDExAccountProvider>
  </CyNDExProvider>

}
export default App