import React, { useState, useEffect } from 'react'

import logo from '../assets/images/cytoscape-logo.svg'
import logoDisabled from '../assets/images/cytoscape-logo-mono-light.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

import BootstrapButton from '../BootstrapButton'

import SvgIcon from '@material-ui/core/SvgIcon';



function CytoscapeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path 
        d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" 
      />
    </SvgIcon>
  );
}

const styles = theme => ({
  buttonIcon: {
    //height: '2em'
  },
  button: {
    color: '#EA9123',
    //height: '3em',
    //width: '4.3em',
    //minWidth: '4.3em'
  }
})

const OpenInCytoscapeButton = props => {

  const status = cyRESTPort => {
    const statusUrl = CYREST_BASE_URL + ':' + cyRESTPort + '/v1'
  
    return fetch(statusUrl, {
      method: METHOD_GET
    })
  }

  let pollCyREST = false;
  const [cyRESTAvailable, setCyRESTAvailable] = useState(false);

  function refresh() {
    if (cyRESTPollingActive) {
      status(1234).then(
        response => response.json()
      ).then(data => {
        setCyRESTAvailable(true);
      }).catch((error) => {
        setCyRESTAvailable(false);
      });

      setTimeout(refresh, 5000);
    }
  }

  const defaultPollingStart = () => {
    pollCyREST = true;
    setTimeout(refresh, 5000);
  };

  const defaultPollingStop = () => {
    pollCyREST = false;
  };

  const defaultGetAvailable = () => {
    return cyRESTAvailable
  };

  const defaultGetPollingActive = () => {
    return pollCyREST;
  }

  const CYREST_BASE_URL = 'http://127.0.0.1'
  const METHOD_POST = 'POST';
  const METHOD_GET = 'GET'

  const importNetwork = () => {
    fetchCX().then( cx => {
      const importNetworkUrl =
      CYREST_BASE_URL + ':' + cyRESTPort + '/cyndex2/v1/networks/cx'
    console.log('Calling CyREST POST:', importNetworkUrl)
  
    return fetch(importNetworkUrl, {
      method: METHOD_POST,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cx)
    })}).catch(error => { console.log(error)});
  }

  const { 
    startCyRestPollingFunction = defaultPollingStart,
    stopCyRestPollingFunction = defaultPollingStop,
    getAvailable = defaultGetAvailable,
    cyRESTPollingActive = defaultGetPollingActive,
    cyRESTPort = 1234,
    variant,
    fetchCX
  } = props

  useEffect(() => {
      typeof (startCyRestPollingFunction) === typeof (Function) && startCyRestPollingFunction();
    return () => {
      typeof (stopCyRestPollingFunction) === typeof (Function) && stopCyRestPollingFunction();
    }
  }, [])

  const { classes } = props

  return (
    <React.Fragment>
      <Tooltip
        disableFocusListener
        title="Open this network in Cytoscape Desktop"
        placement="bottom"
      >
        <span>
          <BootstrapButton
            className={classes.button}
            variant={ variant }
            disabled={!getAvailable()}
            onClick={importNetwork}
            //endIcon = {!getAvailable() ? logoDisabled : logo}
            
          > 
            <CytoscapeIcon />
          </BootstrapButton>
          </span>
      </Tooltip>

    </React.Fragment>
  )
}

export default withStyles(styles)(OpenInCytoscapeButton)
