import React from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CloseIcon from '@material-ui/icons/Close';

import Form from 'components/Form';
import Input from './Input';

const useStyles = makeStyles((theme) => ({
  modalWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 3rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0rem 0.5rem 0.5rem 1.5rem',
    borderBottom: `1px solid ${theme.palette.border}`,
  },
  paper: {
    paddingTop: '0.5rem',
    width: '100%',
  },
  bodyWrapper: {
    display: 'flex',
  },
  tckDetails: {
    borderRight: `1px solid ${theme.palette.border}`,
    flexBasis: '70%',
    padding: '1.5rem',

    '& div:first-child': {
      marginBottom: '2rem',
    },
  },
  tckOptions: {
    flexGrow: 1,
    padding: '1.5rem',
  },
  footer: {
    borderTop: `1px solid ${theme.palette.border}`,
    display: 'flex',
    padding: '0.5rem',

    '& button': {
      marginLeft: 'auto',
    },
  },
}));

const NewTicketModal = ({ open, unSetModal }) => {
  const classes = useStyles();

  const handleSubmit = (data) => {
    console.log(data, 'DADOS PAIZÃO');
  };

  return (
    <Modal
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      closeAfterTransition
      open={open}
      onClose={unSetModal}
      className={classes.modalWrapper}
    >
      <Paper className={classes.paper}>
        <Form onSubmit={handleSubmit}>
          <header className={classes.header}>
            <Typography>Novo Ticket</Typography>
            <IconButton onClick={unSetModal}>
              <CloseIcon />
            </IconButton>
          </header>
          <main className={classes.bodyWrapper}>
            <section className={classes.tckDetails}>
              <Input
                variant="filled"
                label="Assunto"
                InputLabelProps={{ shrink: true }}
                placeholder="Digite o assunto"
                autoFocus
                fullWidth
                name="subject"
              />
              <Input
                variant="filled"
                label="Descrição"
                InputLabelProps={{ shrink: true }}
                placeholder="Descreva a atividade"
                rows={8}
                multiline
                fullWidth
                name="description"
              />
            </section>
            <aside className={classes.tckOptions}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="ticket-state-label">Estado</InputLabel>
                <Select
                  defaultValue="1"
                  labelId="ticket-state-label"
                  label="Estado"
                >
                  <MenuItem value="1">
                    Selecione
                  </MenuItem>
                  <MenuItem value="2">
                    Aberto
                  </MenuItem>
                  <MenuItem value="3">
                    Finalizado
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth variant="outlined" style={{ marginTop: '1rem' }}>
                <InputLabel id="ticket-scope-label">Tipo</InputLabel>
                <Select
                  defaultValue="1"
                  labelId="ticket-scope-label"
                  label="Tipo"
                >
                  <MenuItem value="1">
                    Selecione
                  </MenuItem>
                  <MenuItem value="2">
                    Facebook
                  </MenuItem>
                  <MenuItem value="3">
                    Instagram
                  </MenuItem>
                </Select>
              </FormControl>
            </aside>
          </main>
          <footer className={classes.footer}>
            <Button variant="contained" color="primary" type="submit">Criar Ticket</Button>
          </footer>
        </Form>
      </Paper>
    </Modal>
  );
};

export default NewTicketModal;
