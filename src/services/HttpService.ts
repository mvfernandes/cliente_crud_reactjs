import { BaseResponse } from "../types/Baseresponse";
import { Cliente } from "../types/Cliente";

class HttpService {
  private readonly URL_API = "http://127.0.0.1:8000/api";
  private catch(message = "Ocorreu algum erro") {
    return new BaseResponse({
      data: [],
      message,
      success: false,
    });
  }

  async listClients(): Promise<BaseResponse<Cliente[]>> {
    try {
      const result: BaseResponse<Cliente[]> = await (
        await fetch(`${this.URL_API}/clientes`)
      ).json();
      return result;
    } catch (error) {
      return this.catch();
    }
  }
}

export const httpService = new HttpService();
