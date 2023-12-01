import "./RecentInvoices.scss"
import InvoicesList from "./InvoicesList"
import InvoiceDetailsCard from "../../../Components/Invoice/InvoiceDetailsCard"
import FilterInvoice from "./FilterInvoice"
import { InvoiceType } from "../../../Components/Types/Invoice"
import { useEffect, useMemo, useState, useCallback, Fragment } from "react"
import { makeAPIcall } from "../../../Utils/API"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function RecentInvoices() {
  const [selectInvoice, setSelectInvoice] = useState<null | InvoiceType>(null)
  const [invoices, setInvoices] = useState<InvoiceType[]>([])
  const [loadingInvoices, setLoadingInvoices] = useState(false)
  // data for test
  const InvoicesArray: InvoiceType[] = useMemo(() => {
    return [
      { id: 1, name: "Electricity  Bill", client: "Electron Plus", amount: 2500, date_created: "23/12/2023" },
      { id: 2, name: "Invoice 245", client: "Bill Bro", amount: 1200, date_created: "15/11/2023" },
      { id: 3, name: "Water Bill", client: "Water Well", amount: 1750, date_created: "29/08/2023" },
      { id: 4, name: "Internet Bill", client: "Internet Univ LTD", amount: 50, date_created: "23/08/2023" },
      { id: 5, name: "Internet Bill", client: "Internet Univ LTD", amount: 50, date_created: "23/08/2023" },
      { id: 6, name: "Internet Bill", client: "Internet Univ LTD", amount: 50, date_created: "23/08/2023" },
      { id: 7, name: "Internet Bill", client: "Internet Univ LTD", amount: 50, date_created: "23/08/2023" },
    ]
  }, [])

  const fetchAllInvoices = useCallback(async () => {
    setLoadingInvoices(true)
    const response = await makeAPIcall("/invoices/getAll", "GET")
    if (response.error) {
      setInvoices(InvoicesArray)
      setSelectInvoice(InvoicesArray[0])
    } else {
      setSelectInvoice(response.results[0])
      setInvoices(response.results)
    }
    setLoadingInvoices(false)
  }, [InvoicesArray])

  useEffect(() => {
    console.log(invoices.length)
    if (invoices.length === 0) fetchAllInvoices()
  }, [fetchAllInvoices, invoices.length])

  const selectInvoiceFunction = (value: InvoiceType) => {
    setSelectInvoice(value)
  }

  return (
    <>
      {loadingInvoices ? (
        <>
          <Skeleton count={1} height={70} width={350} />
          <Skeleton count={1} height={"100%"} width={450} />
        </>
      ) : (
        <div className="recentInvoices">
          <Fragment>
            <div>
              <FilterInvoice />
              <InvoicesList invoices={invoices} selectInvoice={selectInvoiceFunction} />
            </div>
            <InvoiceDetailsCard invoice={selectInvoice} />
          </Fragment>
        </div>
      )}
    </>
  )
}
