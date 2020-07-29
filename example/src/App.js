import React from 'react'

import Button from '@material-ui/core/Button'

import { OpenInCytoscapeButton } from 'cytoscape-explore-ui'
import 'cytoscape-explore-ui/dist/index.css'



const App = () => {

  const fetchCX = () => {
    return fetch('./example.cx')
      .then(function (response) {
        return response.json();
      })}

  return <div>
      
      <Button
        variant="outlined"
        color="primary"
        size="small"
      >
        Save
      </Button>
      <OpenInCytoscapeButton variant="outlined" size="small" fetchCX={ fetchCX }/>
       <Button
        variant="outlined"
        color="primary"
        size="medium"
      >
        Save
      </Button>
      <OpenInCytoscapeButton variant="outlined"  size="medium" fetchCX={ fetchCX }/>
      <Button
        variant="outlined"
        color="primary"
        size="large"
      >
        Save
      </Button>
      <OpenInCytoscapeButton variant="outlined" size="large" fetchCX={ fetchCX }/>
      </div>
}
export default App