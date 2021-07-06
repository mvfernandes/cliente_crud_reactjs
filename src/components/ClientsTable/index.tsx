import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useAppcontext } from "../../context/Context";

export function ClientsTable() {
  const appContext = useAppcontext();

  useEffect(() => {
    appContext.listClients();
  }, []);

  return (
    <React.Fragment>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Data Nascimento</TableCell>
            <TableCell>Sexo</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appContext.clientes.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.nome}</TableCell>
              <TableCell>{row.data_nascimento}</TableCell>
              <TableCell>{row.sexo}</TableCell>
              <TableCell>todo</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
