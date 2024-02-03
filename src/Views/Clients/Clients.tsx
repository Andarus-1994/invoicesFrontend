import "./Clients.scss"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { useEffect, useState } from "react"
import { ClientType } from "../../Components/Types/Client"
import { FaEdit } from "react-icons/fa"
import { RiUserLocationLine } from "react-icons/ri"
import { MdOutlineLocationCity } from "react-icons/md"
import { MdDeleteSweep } from "react-icons/md"
import Pagination from "@mui/material/Pagination"
import Button from "@mui/material/Button"
import NewEditClient from "./NewOrEditClient"
import { useClientsStore } from "../../Store/clientsStore"
import TableRowsLoader from "./Components/TableLoader"

export default function Clients() {
  const clientsStore = useClientsStore((state) => state.clients)
  const loadingClients = useClientsStore((state) => state.loading)
  const fetchClientsStore = useClientsStore((state) => state.getClients)

  useEffect(() => {
    if (clientsStore.length === 0) fetchClientsStore()
  }, [fetchClientsStore, clientsStore.length])

  const styleCell = { border: "none", fontFamily: "'Asap', sans-serif", fontSize: "15px" }
  const styleCellHeader = {
    border: "none",
    fontFamily: "'Asap', sans-serif",
    textTransform: "uppercase",
    fontSize: "16px",
    fontWeight: "600",
    padding: "10px 15px",
    background: "#eff7f9",
  }

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event)
    console.log(value)
  }

  const [selectedClientObject, setSelectedClientObject] = useState({
    showModal: false,
    client: null as ClientType | null,
  })

  const closeNewEditModal = () => {
    setSelectedClientObject({ client: null, showModal: false })
  }

  const openNewEditModal = () => {
    setSelectedClientObject({ client: null, showModal: true })
  }

  return (
    <div className="clients">
      {selectedClientObject.showModal && (
        <NewEditClient client={selectedClientObject.client} close={closeNewEditModal} refreshClients={fetchClientsStore} />
      )}
      <div className="headerClients">
        <h3>Clients Details</h3>
        <Button variant="contained" onClick={openNewEditModal}>
          New Client
        </Button>
      </div>

      <div>
        <TableContainer component={Paper} sx={{ boxShadow: "none", padding: "0 10px", background: "#fcfcfc" }}>
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
              {loadingClients && <TableRowsLoader rowsNum={5} />}
              {clientsStore.map((row: ClientType) => (
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
                      <FaEdit onClick={() => setSelectedClientObject({ client: row, showModal: true })} /> <MdDeleteSweep className="delete" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <div>
          <Pagination sx={{ "& > ul": { justifyContent: "center" } }} count={1} page={1} onChange={handleChangePagination} />
        </div>
      </div>
    </div>
  )
}
