import {
  createContext,
  useContext,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";
import { httpService } from "../../services/HttpService";
import { Cliente } from "../../types/Cliente";

type AppProviderData = {
  clientes: Cliente[];
  listClients: () => void;
};

const Context = createContext<AppProviderData>({} as AppProviderData);

export function AppProvider({ children }: PropsWithChildren<{}>) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const listClients = useCallback(() => {
    httpService.listClients().then((response) => {
      setClientes(response.data);
      if (!response.success) {
        alert("Ocorreu algum erro");
      }
    });
  }, []);

  return (
    <Context.Provider value={{ listClients, clientes }}>
      {children}
    </Context.Provider>
  );
}

export function useAppcontext() {
  return useContext(Context);
}
