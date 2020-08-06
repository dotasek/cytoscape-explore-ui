import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import logo from '../assets/images/cytoscape-logo.svg'
import logoDisabled from '../assets/images/cytoscape-logo-mono-light.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ndexClient from 'ndex-client';


const styles = theme => ({
  button: {
    color: '#4DA1DE',
    borderColor: '#4DA1DE',
    '&:active': {
      borderColor: '#4DA1DE'
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
    fontSizeSmall: '22px',
    fontSizeLarge: '26px'
  }

})

const NDExSignInButton = props => {

 
  const [cyRESTAvailable, setCyRESTAvailable] = useState(false);

  const defaultSignInAction = () => {
  
  };

  const defaultSignInStatus = () => {
    return false;
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
    if (ndexNetworkProperties) {
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

  const getAvailable = () => {
    return true;
  }

  const {
    signInAction = defaultSignInAction,
    getSignInStatus = defaultSignInStatus,
    variant,
    size
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
        title="Sign In to NDEx"
        placement="bottom"
      >
        <Button
          className={classes.button}
          variant={variant}
          onClick={signInAction}
          size={size}
        >
          <AccountCircleIcon fontSize={size} className={classes.buttonIcon}/>
         
        </Button>
      </Tooltip>

    </React.Fragment>
  )
}

export default withStyles(styles)(NDExSignInButton)
