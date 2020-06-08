import React from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Fade from '@material-ui/core/Fade';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CloseIcon from '@material-ui/icons/Close';

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
}));

const NewTicketModal = ({ unSetModal }) => {
  const classes = useStyles();

  return (
    <Modal
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      closeAfterTransition
      open
      onClose={unSetModal}
      className={classes.modalWrapper}
    >
      <Fade in>
        <Paper className={classes.paper}>
          <header className={classes.header}>
            <Typography>Novo Ticket</Typography>
            <IconButton onClick={unSetModal}>
              <CloseIcon />
            </IconButton>
          </header>
          <main className={classes.bodyWrapper}>
            <section className={classes.tckDetails}>
              <TextField
                variant="filled"
                label="Assunto"
                InputLabelProps={{ shrink: true }}
                placeholder="Digite o assunto"
                autoFocus
                fullWidth
              />
              <TextField
                variant="filled"
                label="Descrição"
                InputLabelProps={{ shrink: true }}
                placeholder="Descreva a atividade"
                rows={8}
                multiline
                fullWidth
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
                    <em>None</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </aside>
          </main>
          <footer>
            Rodapé
          </footer>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default NewTicketModal;
