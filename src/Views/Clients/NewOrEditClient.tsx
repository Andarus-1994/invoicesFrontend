import { ClientType } from "../../Components/Types/Client"
import "./NewOrEditClient.scss"
import { useEffect, useState } from "react"
import Button from "@mui/material/Button"
import { BsPersonRolodex } from "react-icons/bs"
import { makeAPIcall } from "../../Utils/API"

type PropNewEditClient = {
  client: ClientType | null
  close: () => void
  refreshClients: () => void
}

export default function NewEditClient({ client, close, refreshClients }: PropNewEditClient) {
  console.log("1234", client)
  const [newClient, setNewClient] = useState<ClientType>({
    id: "",
    name: "",
    address: "",
    company_name: "",
    company_address: "",
  })
  const [error, setError] = useState("")
  const [saveLoading, setSaveLoading] = useState(false)

  useEffect(() => {
    if (client) setNewClient(client)
  }, [client])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newAmount = event.target.value
    setNewClient((prevClient) => ({ ...prevClient, [event.target.name]: newAmount }))
  }

  const handleSave = async () => {
    setError("")
    setSaveLoading(true)
    const fieldsToValidate = (Object.keys(newClient) as (keyof ClientType)[]).filter((field) => field !== "id")
    const isFormValid = fieldsToValidate.every((field) => newClient[field].trim() !== "")
    if (isFormValid) {
      const url = newClient.id ? "/clients/update" : "/clients/create"
      const response = await makeAPIcall(url, "POST", newClient)

      if (!response.error) {
        close()
        refreshClients()
      }
    } else {
      setError("Please complete all fields.")
    }
    setSaveLoading(false)
  }

  return (
    <>
      <div className="coverClientModal" onClick={close}></div>
      <div className="ClientModal">
        <BsPersonRolodex />
        <h3>{newClient.id ? "Edit Client " : "Add New Client"}</h3>
        <div className="flex-row">
          <div className="flex-column gap-10">
            <div className="flex-row">
              <div className="flex-column">
                <label className="required">Client Name</label>
                <input
                  className={error && !newClient.name ? "error-input" : ""}
                  placeholder="ex: Andrew "
                  name="name"
                  value={newClient.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex-row">
              <div className="flex-column">
                <label className="required">Client Address</label>
                <textarea
                  className={error && !newClient.address ? "error-input" : ""}
                  placeholder="ex: str Oxford nr 24 "
                  name="address"
                  value={newClient.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="flex-column gap-10">
            <div className="flex-row">
              <div className="flex-column">
                <label className="required">Company Name</label>
                <input
                  className={error && !newClient.company_name ? "error-input" : ""}
                  placeholder="ex: Andrew "
                  name="company_name"
                  value={newClient.company_name}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex-row">
              <div className="flex-column">
                <label className="required">Company Address</label>
                <textarea
                  className={error && !newClient.company_address ? "error-input" : ""}
                  placeholder="ex: Company street "
                  name="company_address"
                  value={newClient.company_address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="flex-row">
          <Button onClick={close} variant="outlined" color="error" sx={{ display: "block", marginTop: "30px" }}>
            Cancel
          </Button>
          <span className="error">{error}</span>
          <Button disabled={saveLoading} onClick={handleSave} variant="contained" sx={{ display: "block", marginLeft: "auto", marginTop: "30px" }}>
            Save Client
          </Button>
        </div>
      </div>
    </>
  )
}
