import React, { useRef, useState } from 'react';
import TextField from 'components/TextField';
import { useAuth } from 'context/auth';
import { Form } from '@unform/web';
import * as Yup from 'yup';

// MUI
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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

const validationSchema = Yup.object().shape({
  usuario: Yup.string().required('Campo obrigatório'),
  senha: Yup.string().required('Campo obrigatório'),
});

const LoginPage = () => {
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  const classes = useStyles();
  const { login } = useAuth();

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      formRef.current.setErrors({});

      await validationSchema.validate(data, { abortEarly: false });
      await login(data.usuario, data.senha);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      } else {
        setAuthError(err.response.data.Message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper elevation={3}>
        <Form ref={formRef} className={classes.form} onSubmit={handleSubmit}>
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
          <Button disabled={isSubmitting} variant="contained" color="primary" type="submit">{isSubmitting ? <CircularProgress size={24} /> : 'Login'}</Button>
          {authError && <span>{authError}</span>}
        </Form>
      </Paper>
    </div>
  );
};

export default LoginPage;
