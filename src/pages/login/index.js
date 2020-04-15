import React from 'react';
import { useAuth } from 'context/auth';

// MUI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
  },
});

const LoginPage = () => {
  const { login } = useAuth();
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Paper elevation="3" className={classes.paper}>
        <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '1rem' }}>Login</Typography>
        <TextField
          label="Usuário"
          placeholder="Digite seu usuário"
          style={{ marginBottom: '1rem' }}
          variant="outlined"
        />
        <TextField
          label="Senha"
          placeholder="Digite sua senha"
          type="password"
          style={{ marginBottom: '1.5rem' }}
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={() => login()}>Authenticate</Button>
      </Paper>
    </div>
  );
};

export default LoginPage;
