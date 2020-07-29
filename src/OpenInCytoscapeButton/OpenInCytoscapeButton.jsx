import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import logo from '../assets/images/cytoscape-logo.svg'
import logoDisabled from '../assets/images/cytoscape-logo-mono-light.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import ndexClient from 'ndex-client';


import { fade } from '@material-ui/core/styles/colorManipulator'

const styles = theme => ({
  button: {
    color: '#EA9123',
    borderColor: '#EA9123',
    '&:active': {
      borderColor: '#EA9123'
    },
    'line-height': 0
  },
  buttonIcon: {
    height: '100%',
    width: '100%',
  }
})

const OpenInCytoscapeButton = props => {

  

  let pollCyREST = false;
  const [cyRESTAvailable, setCyRESTAvailable] = useState(false);

  function refresh() {
    if (cyRESTPollingActive) {
      cyndex.getCyNDExStatus().then(
        response => {  
          setCyRESTAvailable(true);
        }, 
        err => {
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
    fetchCX().then(cx => {
      return cyndex.postCXNetworkToCytoscape(cx);
    },error => { console.log(error) });
  }

  const {
    startCyRestPollingFunction = defaultPollingStart,
    stopCyRestPollingFunction = defaultPollingStop,
    getAvailable = defaultGetAvailable,
    cyRESTPollingActive = defaultGetPollingActive,
    cyRESTPort = 1234,
    variant,
    size,
    fetchCX
  } = props

  const cyndex = new ndexClient.CyNDEx();

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
        <Button
          className={classes.button}
          variant={variant}
          disabled={!getAvailable()}
          onClick={importNetwork}
          size={size}
        >
          <Icon >
            <img className={classes.buttonIcon} src={!getAvailable() ? logoDisabled : logo} />
          </Icon>
        </Button>
      </Tooltip>

    </React.Fragment>
  )
}

export default withStyles(styles)(OpenInCytoscapeButton)
