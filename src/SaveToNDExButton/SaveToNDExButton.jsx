import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import SaveIcon from '@material-ui/icons/Save';
import { useNDExAccountValue } from '../NDExAccountContext'
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
  },
  toolTipSpan: {

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


  let onUpdate = DEFAULT_HANDLER
  if (onLoginStateUpdated !== null && onLoginStateUpdated !== undefined) {
    onUpdate = onLoginStateUpdated
  }

  const [{ ndexServerURL, loginInfo }, dispatch] = useNDExAccountValue();



  const {
    onClick,
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
        title="Save Network to NDEx"
        placement="bottom"
      > 
        <span><Button
          className={classes.button}
          variant={variant}
          onClick={onClick}
          disabled={!loginInfo }
          size={size}
        >
          <SaveIcon className={iconClassName(size)}/>
         
        </Button></span>
        
      </Tooltip>
     
    </React.Fragment>
  )
}

export default withStyles(styles)(NDExSignInButton)
