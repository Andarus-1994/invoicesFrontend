import { create } from "zustand"
import { ClientType } from "../Components/Types/Client"
import { makeAPIcall } from "../Utils/API"
import { ClientsData } from "./../Data/Clients"

type ClientsStore = {
  clients: ClientType[]
  loading: boolean
  getClients: () => Promise<void>
}

export const useClientsStore = create<ClientsStore>((set) => ({
  clients: [],
  loading: false,
  getClients: async () => {
    set(() => ({ loading: true }))
    const response = await makeAPIcall("/clients/getAll", "GET")
    console.log(response)
    if (response.error) {
      set(() => ({ clients: ClientsData }))
    } else {
      set(() => ({ clients: response.results }))
    }
    set(() => ({ loading: false }))
  },
}))
