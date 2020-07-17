import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator'

export default withStyles({
    root: {
      //marginLeft: '0.5em',
      borderColor: '#EA9123',
      '&:active': {
        borderColor: '#EA9123'
      },
      '&:hover': {
        backgroundColor: fade('#EA9123', 0.08)
      }
    }
  })(IconButton)