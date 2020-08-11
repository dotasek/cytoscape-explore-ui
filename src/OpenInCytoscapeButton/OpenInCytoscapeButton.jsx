import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import logo from '../assets/images/cytoscape-logo.svg'
import logoDisabled from '../assets/images/cytoscape-logo-mono-light.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import ndexClient from 'ndex-client';

import { useCyNDExValue } from '../CyNDExContext'

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
  iconSmall: {
    height: '22px'
  },
  iconMedium: {
    height: '24px'
  },
  iconLarge: {
    height: '26px'
  },
  buttonIcon: {
    height: '100%',
    width: '100%'
  }

})

const OpenInCytoscapeButton = props => {

   
  const cyNDExValue = useCyNDExValue();
  const cyRESTAvailable = cyNDExValue.state.available;
  const cyRESTPort = cyNDExValue.state.port;

  const importNetwork = () => {
    const cyndex = new ndexClient.CyNDEx(cyRESTPort);
    if (ndexNetworkProperties) {
      const ndexCredentials = getNDExCredentials();
      console.log("import network ndex credentials: " + JSON.stringify(ndexCredentials));
      const username = ndexNetworkProperties.accessKey || ndexNetworkProperties.idToken ? undefined : ndexNetworkProperties.username;
      const password = ndexNetworkProperties.accessKey || ndexNetworkProperties.idToken ? undefined : ndexNetworkProperties.password;
      if (username && password) {
        cyndex.setBasicAuth(username, password);
      }
      const accessKey = ndexNetworkProperties.accessKey;
      const idToken = ndexNetworkProperties.idToken;
      cyndex.postNDExNetworkToCytoscape(ndexNetworkProperties.uuid, accessKey, idToken);
    } else {
      fetchCX().then(cx => {
        return cyndex.postCXNetworkToCytoscape(cx);
      }, error => { console.log(error) });
    }

  }

  const {
    variant,
    size,
    fetchCX,
    ndexNetworkProperties,
    getNDExCredentials
  } = props

  const { classes } = props

  const iconClassName = (size) => {
    switch (size) {
      case 'small': return classes.iconSmall;
      case 'large': return classes.iconLarge;
      default: return classes.iconMedium;
    }
  }

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
          disabled={!cyRESTAvailable}
          onClick={importNetwork}
          size={size}
        >
          <Icon className={iconClassName(size)} >
            <img className={classes.buttonIcon} src={!cyRESTAvailable ? logoDisabled : logo} />
          </Icon>
        </Button>
      </Tooltip>

    </React.Fragment>
  )
}

export default withStyles(styles)(OpenInCytoscapeButton)
