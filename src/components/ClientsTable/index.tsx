import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useAppcontext } from "../../context/Context";
import { Cliente } from "../../types/Cliente";
import { httpService } from "../../services/HttpService";
import { format as dateFnsFormat } from "date-fns";
import { DialogDetailClient } from "../DialogDetailClient";

export function ClientsTable() {
  const appContext = useAppcontext();

  useEffect(() => {
    appContext.listClients();
  }, []);

  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [userSelected, setUserSelected] = useState<Cliente | null>(null);

  const handleClickDelete = (user: Cliente) => {
    setUserSelected(user);
    setOpenDialogDelete(true);
  };

  const handleClose = () => {
    setOpenDialogDelete(false);
  };

  const handleConfirmDelete = () => {
    if (userSelected) {
      httpService
        .deleteClient(userSelected.id)
        .then((result) => {
          if (result.success) {
            appContext.removeClient(userSelected.id);
          }
        })
        .finally(() => {
          setOpenDialogDelete(false);
        });
    }
  };

  return (
    <React.Fragment>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Data Nascimento</TableCell>
            <TableCell>Sexo</TableCell>
            <TableCell>A????es</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appContext.clientes.map((cliente) => (
            <TableRow key={cliente.id}>
              <TableCell>{cliente.id}</TableCell>
              <TableCell>{cliente.nome}</TableCell>
              <TableCell>
                {dateFnsFormat(new Date(new Date(cliente.data_nascimento).toISOString()), "dd/MM/yyyy")}
              </TableCell>
              <TableCell>{cliente.sexo}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => {
                    setOpenDetail(true);
                    setUserSelected(cliente);
                  }}
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton
                  color="default"
                  onClick={() => {
                    appContext.selectCliente(cliente);
                    appContext.toggleOpenAddEditUser(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  aria-label="delete"
                  onClick={() => {
                    handleClickDelete(cliente);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {userSelected && openDetail && (
        <DialogDetailClient
          cliente={userSelected}
          close={() => {
            setUserSelected(null);
            setOpenDetail(false);
          }}
        />
      )}

      <Dialog
        open={openDialogDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Remover cliente</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Confirma a remo????o do cliente {userSelected?.nome} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialogDelete(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
