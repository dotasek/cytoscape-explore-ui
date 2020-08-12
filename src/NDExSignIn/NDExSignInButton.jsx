import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import logo from '../assets/images/cytoscape-logo.svg'
import logoDisabled from '../assets/images/cytoscape-logo-mono-light.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ndexClient from 'ndex-client';
import NdexLoginDialog from './NdexLoginDialog'

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

const DEFAULT_HANDLER = loginState => {
  // Default callback function for login status change
  console.warn('Default handler: NDEx login state updated', loginState)

  // Add actual handler here...
}


const NDExSignInButton = props => {

  const { classes } = props;



  const { ndexServer = 'http://public.ndexbio.org'
    , onLoginStateUpdated } = props

  const defaultIconComponent = (
    <img alt="NDEx logo" src={logo} className={classes.buttonIcon} />
  )

  let onUpdate = DEFAULT_HANDLER
  if (onLoginStateUpdated !== null && onLoginStateUpdated !== undefined) {
    onUpdate = onLoginStateUpdated
  }

  const [isOpen, setOpen] = useState(false)
  const [isLogin, setLogin] = useState(false)
  const [icon, setButtonIcon] = useState(defaultIconComponent)

  const setIcon = iconComponent => {
    setButtonIcon(iconComponent !== null ? iconComponent : defaultIconComponent)
  }

  const setDialogState = dialogState => {
    setOpen(dialogState)
  }
  const defaultSignInAction = () => {
    console.log("")
  };

  const defaultSignInStatus = () => {
    return false;
  };

  const getAvailable = () => {
    return true;
  }

  const {
    signInAction = defaultSignInAction,
    getSignInStatus = defaultSignInStatus,
    variant,
    size
  } = props

 

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
          onClick={() => setDialogState(true)}
          size={size}
        >
          <AccountCircleIcon className={iconClassName(size)}/>
         
        </Button>
      </Tooltip>
      <NdexLoginDialog
        setIcon={setIcon}
        setDialogState={setDialogState}
        isOpen={isOpen}
        setIsLogin={setLogin}
        ndexServer={ndexServer}
        onLoginStateUpdated={onUpdate}
      />
    </React.Fragment>
  )
}

export default withStyles(styles)(NDExSignInButton)
