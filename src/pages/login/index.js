import React from 'react';
import TextField from 'components/TextField';
import { useAuth } from 'context/auth';
import { Form } from '@unform/web';

// MUI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
  },
});

const LoginPage = () => {
  const { login } = useAuth();
  const classes = useStyles();

  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={classes.wrapper}>
      <Paper elevation="3">
        <Form className={classes.form} onSubmit={handleSubmit}>
          <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '1rem' }}>Login</Typography>
          <TextField
            name="usuario"
            label="Usuário"
            placeholder="Digite seu usuário"
            style={{ marginBottom: '1rem' }}
            variant="outlined"
          />
          <TextField
            name="senha"
            label="Senha"
            placeholder="Digite sua senha"
            type="password"
            style={{ marginBottom: '1.5rem' }}
            variant="outlined"
          />
          <Button variant="contained" color="primary" type="submit">Authenticate</Button>
        </Form>
      </Paper>
    </div>
  );
};

export default LoginPage;
