import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from "react-toastify";
import { httpService } from "../../../services/HttpService";
import { Cliente, Endereco } from "../../../types/Cliente";

type Props = {
  cliente: Cliente;
  endereco: Endereco;
  removeItem: (id: string) => void;
};
export function FormAddress({ cliente, endereco, removeItem }: Props) {
  const [isEdit, setIsEdit] = useState(!endereco.id || false);
  const [cep, setCep] = useState(endereco.cep || "");
  const [UF, setUF] = useState(endereco.UF || "");
  const [logradouro, setLogradouro] = useState(endereco.logradouro || "");
  const [numero, setNumero] = useState(endereco.numero || "");
  const [tipo, setTipo] = useState<Endereco["tipo"]>(endereco.tipo || "");
  const [complemento, setComplemento] = useState(endereco.complemento || "");
  const [bairro, setBairro] = useState(endereco.bairro || "");

  function handleSubmit() {
    const enderecoToSend = new Endereco({
      localId: endereco.localId,
      UF,
      cep,
      logradouro,
      numero,
      tipo,
      bairro,
      complemento,
    });
    if (endereco.id) {
      httpService
        .updateEndereco(cliente.id, endereco.id, enderecoToSend)
        .then((response) => {
          if (response.success) {
            toast("Endereço atualizado");
          }
        });
    } else {
      httpService
        .createEndereco(cliente.id, enderecoToSend)
        .then((response) => {
          if (response.success) {
            toast("Endereço criado com sucesso");
          }
        });
    }

    setIsEdit(false);
  }

  function isEnablebuttonSubmit() {
    return !!cep && !!UF && !!logradouro && !!numero && !!tipo;
  }

  function handleChangeCep(cep: string) {
    setCep(cep.slice(0, 8));
    if (cep.trim().length >= 8) {
      fetch(`https://viacep.com.br/ws/${cep.trim()}/json/`)
        .then((r) => r.json())
        .then((response) => {
          if (response && ["logradouro", "uf"].some((k) => k in response)) {
            setUF(response?.uf || "");
            setLogradouro(response?.logradouro || "");
            setBairro(response?.bairro || "");
            setComplemento(response?.complemento || "");
          }
        });
    }
  }

  function removeThis() {
    if (endereco.id) {
      httpService.deleteEndereco(cliente.id, endereco.id).then(() => {
        toast("Endereço removido");
      });
    }
    removeItem(endereco.localId);
  }

  return (
    <Grid container spacing={1}>
      <Grid item md={12}>
        <Grid container>
          <Grid item md={6}>
            <IconButton
              edge="start"
              onClick={() => {
                setIsEdit((prev) => !prev);
              }}
            >
              {!isEdit ? <EditIcon /> : <CloseIcon />}
            </IconButton>
          </Grid>
          <Grid item md={6}>
            {isEdit && (
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-start"
              >
                <IconButton edge="start" color="secondary" onClick={removeThis}>
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  disabled={!isEnablebuttonSubmit()}
                  edge="start"
                  color="primary"
                  onClick={handleSubmit}
                >
                  <SaveIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={6}>
        <TextField
          disabled={!isEdit}
          autoFocus
          label="Cep"
          type="text"
          fullWidth
          value={cep}
          onChange={(e) => handleChangeCep(e.target.value)}
        />
      </Grid>
      <Grid item md={6}>
        <TextField
          disabled={!isEdit}
          label="Logradouro"
          type="text"
          fullWidth
          value={logradouro}
          onChange={(e) => setLogradouro(e.target.value)}
        />
      </Grid>
      <Grid item md={6}>
        <TextField
          disabled={!isEdit}
          label="Número"
          type="text"
          fullWidth
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
      </Grid>
      <Grid item md={6}>
        <TextField
          disabled={!isEdit}
          label="UF"
          type="text"
          fullWidth
          value={UF}
          onChange={(e) => setUF(e.target.value)}
        />
      </Grid>
      <Grid item md={6}>
        <TextField
          disabled={!isEdit}
          label="Complemento"
          type="text"
          fullWidth
          value={complemento}
          onChange={(e) => setComplemento(e.target.value)}
        />
      </Grid>
      <Grid item md={6}>
        <TextField
          disabled={!isEdit}
          label="Bairro"
          type="text"
          fullWidth
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
        />
      </Grid>
      <Grid item md={12}>
        <FormControl fullWidth>
          <InputLabel>Tipo do endereço</InputLabel>
          <Select
            disabled={!isEdit}
            fullWidth
            value={tipo}
            onChange={(e) => setTipo(e?.target?.value as Endereco["tipo"])}
          >
            <MenuItem value={"residencial"}>Residencial</MenuItem>
            <MenuItem value={"comercial"}>Comercial</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
