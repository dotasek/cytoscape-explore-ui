import React from 'react'

import Button from '@material-ui/core/Button'

import { OpenInCytoscapeButton } from 'cytoscape-explore-ui'
import 'cytoscape-explore-ui/dist/index.css'


const App = () => {
  return <div>
      
      <Button
        variant="outlined"
        color="primary"
        size="small"
      >
        Save
      </Button>
      <OpenInCytoscapeButton variant="outlined" size="small" />
       <Button
        variant="outlined"
        color="primary"
        size="medium"
      >
        Save
      </Button>
      <OpenInCytoscapeButton variant="outlined"  size="medium"/>
      <Button
        variant="outlined"
        color="primary"
        size="large"
      >
        Save
      </Button>
      <OpenInCytoscapeButton variant="outlined" size="large" />
      </div>
}
export default App
