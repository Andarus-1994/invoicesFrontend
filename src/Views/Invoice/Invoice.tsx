import "./Invoice.scss"
import { useParams, useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { InvoiceType } from "../../Components/Types/Invoice"
import { toast, Slide } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { makeAPIcall } from "../../Utils/API"
import InvoiceDetails from "./InvoiceDetails"
import Skeleton from "react-loading-skeleton"
import { formatDate } from "../../Utils/DateFormat"

export default function InvoicePreview() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState("")
  const [loadingInvoice, setLoadingInvoice] = useState(false)
  const [loadingSave, setLoadingSave] = useState(false)

  const getInvoiceDetails = useCallback(async () => {
    setErrorMessage("")
    setLoadingInvoice(true)
    const postData = {
      id: id,
    }
    const response = await makeAPIcall("/invoices/getById", "POST", postData)

    if (!response.error) {
      const invoice = response.data
      for (const [key, value] of Object.entries(invoice)) {
        if (invoice[key] === null) invoice[key] = ""
        if ((key === "amount_paid" || key === "amount") && !value) invoice[key] = "0"
        if (key === "due_date" || (key === "issue_date" && value)) invoice[key] = formatDate(invoice[key])
      }
      setInvoiceDetails(response.data)
    }
    if (response.error) {
      setErrorMessage(response.error)
    }

    setLoadingInvoice(false)
  }, [id])

  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceType | null>(null)

  useEffect(() => {
    getInvoiceDetails()
  }, [getInvoiceDetails])

  const updateInvoiceDetails = (invoiceDetailsParameter: InvoiceType) => {
    setInvoiceDetails(invoiceDetailsParameter)
  }

  const save = async () => {
    setErrorMessage("")
    setLoadingSave(true)
    const postData = {
      ...JSON.parse(JSON.stringify(invoiceDetails)),
    }
    delete postData.client

    const response = await makeAPIcall("/invoices/update", "POST", postData)

    if (response.success) {
      toast.success("Your invoice has been updated successfully !", {
        position: toast.POSITION.TOP_CENTER,
        type: toast.TYPE.SUCCESS,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      })
    }
    if (response.error) {
      setErrorMessage(response.error)
    }
    setLoadingSave(false)
    navigate("/")
  }

  return (
    <div className="invoiceFlexContainer">
      {loadingInvoice ? (
        <div className="invoicePreview">
          <Skeleton count={1} height={30} width={222} />
          <div style={{ marginTop: "30px" }}></div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Skeleton count={1} height={70} width={222} />
            <Skeleton count={1} height={70} width={222} />
            <Skeleton count={1} height={70} width={222} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Skeleton count={1} height={70} width={222} />
            <Skeleton count={1} height={70} width={222} />
            <Skeleton count={1} height={70} width={222} />
          </div>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "80px" }}>
            <Skeleton count={1} height={50} width={222} />
            <Skeleton count={1} height={50} width={222} />
          </div>
        </div>
      ) : (
        <InvoiceDetails invoiceDetails={invoiceDetails} updateInvoiceDetails={updateInvoiceDetails} errorMessage={errorMessage} />
      )}

      <div className="invoiceActions">
        <button className="back" onClick={() => navigate("/")}>
          Back
        </button>
        <button onClick={save} className={loadingSave ? "disabled" : ""}>
          Save
          <IoMdCheckmarkCircleOutline />
        </button>
      </div>
    </div>
  )
}
