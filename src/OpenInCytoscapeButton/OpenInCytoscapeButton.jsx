import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import logo from '../assets/images/cytoscape-logo.svg'
import logoDisabled from '../assets/images/cytoscape-logo-mono-light.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

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
    fetchCX().then(cx => {
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
      })
    }).catch(error => { console.log(error) });
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
