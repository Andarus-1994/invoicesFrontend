import { Client } from "../../Components/Types/Client"
import "./NewOrEditClient.scss"
import { useState } from "react"
import Button from "@mui/material/Button"

type PropNewEditClient = {
  client: Client | null
  close: () => void
}

export default function NewEditClient({ client, close }: PropNewEditClient) {
  console.log("1234", client)
  const [newClient, setNewClient] = useState<Client>({
    id: "",
    name: "",
    address: "",
    company_name: "",
    company_address: "",
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = event.target.value
    setNewClient((prevClient) => ({ ...prevClient, [event.target.name]: newAmount }))
  }

  return (
    <>
      <div className="coverClientModal" onClick={close}></div>
      <div className="ClientModal">
        <h3>Add New Client (progress design) </h3>
        <div className="flex-row">
          <div className="flex-column gap-10">
            <div className="flex-row">
              <div className="flex-column">
                <label>Client Name</label>
                <input placeholder="ex: Andrew " name="name" value={newClient.name} onChange={handleInputChange} />
              </div>
            </div>
            <div className="flex-row">
              <div className="flex-column">
                <label>Client Address</label>
                <textarea placeholder="ex: str Oxford nr 24 " name="name" value={newClient.name} />
              </div>
            </div>
          </div>
          <div className="flex-column gap-10">
            <div className="flex-row">
              <div className="flex-column">
                <label>Company Name</label>
                <input placeholder="ex: Andrew " name="name" value={newClient.name} onChange={handleInputChange} />
              </div>
            </div>

            <div className="flex-row">
              <div className="flex-column">
                <label>Company Address</label>
                <textarea placeholder="ex: Company street " name="name" value={newClient.name} />
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="flex-row">
          <Button onClick={close} variant="outlined" color="error" sx={{ display: "block", marginTop: "30px" }}>
            Cancel
          </Button>
          <Button variant="contained" sx={{ display: "block", marginLeft: "auto", marginTop: "30px" }}>
            Save Client
          </Button>
        </div>
      </div>
    </>
  )
}
