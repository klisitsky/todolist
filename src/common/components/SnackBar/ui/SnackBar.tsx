import * as React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { appActions } from 'features/App/model/appSlice'
import { useAppSelector } from 'common/hooks'
import { useActions } from 'common/hooks/useActions'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant='filled'
      {...props}
    />
  )
})

export const AppSnackbar = () => {
  const error = useAppSelector<null | string>((state) => state.app.error)
  const { setAppError } = useActions(appActions)

  const closeSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setAppError({ error: null })
  }

  return (
    <Stack
      spacing={2}
      sx={{ width: '100%' }}>
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={closeSnackBar}>
        <Alert
          onClose={closeSnackBar}
          severity='error'
          sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  )
}
