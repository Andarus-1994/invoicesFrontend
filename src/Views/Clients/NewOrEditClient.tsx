import { Client } from "../../Components/Types/Client"
import "./NewOrEditClient.scss"
import { useState } from "react"
import Button from "@mui/material/Button"
import { BsPersonRolodex } from "react-icons/bs"
import { makeAPIcall } from "../../Utils/API"

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newAmount = event.target.value
    setNewClient((prevClient) => ({ ...prevClient, [event.target.name]: newAmount }))
  }

  const handleSave = async () => {
    const fieldsToValidate = (Object.keys(newClient) as (keyof Client)[]).filter((field) => field !== "id")
    const isFormValid = fieldsToValidate.every((field) => newClient[field].trim() !== "")
    if (isFormValid) {
      console.log("make api call")
      const response = await makeAPIcall("/clients/create", "POST", newClient)
      if (!response.error) {
        close()
      }
    }
  }

  return (
    <>
      <div className="coverClientModal" onClick={close}></div>
      <div className="ClientModal">
        <BsPersonRolodex />
        <h3>Add New Client (progress design) </h3>
        <div className="flex-row">
          <div className="flex-column gap-10">
            <div className="flex-row">
              <div className="flex-column">
                <label className="required">Client Name</label>
                <input placeholder="ex: Andrew " name="name" value={newClient.name} onChange={handleInputChange} />
              </div>
            </div>
            <div className="flex-row">
              <div className="flex-column">
                <label className="required">Client Address</label>
                <textarea placeholder="ex: str Oxford nr 24 " name="address" value={newClient.address} onChange={handleInputChange} />
              </div>
            </div>
          </div>
          <div className="flex-column gap-10">
            <div className="flex-row">
              <div className="flex-column">
                <label className="required">Company Name</label>
                <input placeholder="ex: Andrew " name="company_name" value={newClient.company_name} onChange={handleInputChange} />
              </div>
            </div>

            <div className="flex-row">
              <div className="flex-column">
                <label className="required">Company Address</label>
                <textarea placeholder="ex: Company street " name="company_address" value={newClient.company_address} onChange={handleInputChange} />
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="flex-row">
          <Button onClick={close} variant="outlined" color="error" sx={{ display: "block", marginTop: "30px" }}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" sx={{ display: "block", marginLeft: "auto", marginTop: "30px" }}>
            Save Client
          </Button>
        </div>
      </div>
    </>
  )
}
