import "./Clients.scss"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { useCallback, useEffect, useState } from "react"
import { Client } from "../../Components/Types/Client"
import { makeAPIcall } from "../../Utils/API"
import { FaEdit } from "react-icons/fa"
import { RiUserLocationLine } from "react-icons/ri"
import { MdOutlineLocationCity } from "react-icons/md"
import { MdDeleteSweep } from "react-icons/md"
import { ClientsData } from "../../Data/Clients"
import LoadingSpinner from "../../Components/Loading/Loading"

export default function Clients() {
  const [loading, setLoading] = useState(true)
  const [clients, setClients] = useState<Client[]>([
    {
      id: "",
      name: "Loading",
      address: "",
      company_name: "",
      company_address: "",
    },
    {
      id: "",
      name: "Getting Clients...",
      address: "",
      company_name: "",
      company_address: "",
    },
  ])

  const fetchAllClients = useCallback(async () => {
    setLoading(true)
    const response = await makeAPIcall("/clients/getAll", "GET")
    if (response.error) {
      setClients(ClientsData)
    } else {
      setClients(response.results)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAllClients()
  }, [fetchAllClients])

  const styleCell = { border: "none", fontFamily: "'Asap', sans-serif", fontSize: "15px" }
  const styleCellHeader = {
    border: "none",
    fontFamily: "'Asap', sans-serif",
    textTransform: "uppercase",
    fontSize: "17px",
    fontWeight: "600",
    background: "#eff7f9",
  }

  return (
    <div className="clients">
      <h3>Clients details</h3>

      <div>
        <TableContainer component={Paper} sx={{ boxShadow: "none", padding: "10px", background: "#fcfcfc" }}>
          <Table stickyHeader={true} sx={{ minWidth: 650, borderSpacing: "0 5px", zIndex: "1" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={styleCellHeader}>Id</TableCell>
                <TableCell sx={styleCellHeader}>Name</TableCell>
                <TableCell sx={styleCellHeader} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <RiUserLocationLine /> Address
                </TableCell>
                <TableCell sx={styleCellHeader}>Company Name</TableCell>
                <TableCell sx={styleCellHeader} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <MdOutlineLocationCity /> Company Address
                </TableCell>
                <TableCell sx={styleCellHeader}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ position: "relative", minHeight: "300px" }}>
              {loading && <LoadingSpinner />}
              {clients.map((row) => (
                <TableRow key={row.name} sx={{ boxShadow: "0 0 3px #e8e8e870", borderRadius: "10px", background: "#fff" }}>
                  <TableCell component="th" scope="row" sx={styleCell}>
                    {row.id}
                  </TableCell>
                  <TableCell sx={styleCell}>{row.name}</TableCell>
                  <TableCell sx={styleCell}>{row.address}</TableCell>
                  <TableCell sx={styleCell}>{row.company_name}</TableCell>
                  <TableCell sx={styleCell}>{row.company_address}</TableCell>
                  <TableCell sx={styleCell}>
                    <div className="actionsTable">
                      <FaEdit /> <MdDeleteSweep />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
