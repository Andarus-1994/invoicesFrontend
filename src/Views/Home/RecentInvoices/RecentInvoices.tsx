import "./RecentInvoices.scss"
import InvoicesList from "./InvoicesList"
import InvoiceDetailsCard from "../../../Components/Invoice/InvoiceDetailsCard"
import FilterInvoice from "./FilterInvoice"
import { InvoiceType } from "../../../Components/Types/Invoice"
import { useEffect, useMemo, useState, useCallback, Fragment } from "react"
import { makeAPIcall } from "../../../Utils/API"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { invoicesArray } from "../../../Data/Invoices"

export default function RecentInvoices() {
  const [selectInvoice, setSelectInvoice] = useState<null | InvoiceType>(null)
  const [invoices, setInvoices] = useState<InvoiceType[]>([])
  const [loadingPage, setloadingPage] = useState(false)
  const [loadingInvoices, setLoadingInvoices] = useState(false)
  // data for test
  const InvoicesArray: InvoiceType[] = useMemo(() => {
    return invoicesArray
  }, [])

  const fetchAllInvoices = useCallback(async () => {
    setloadingPage(true)
    const response = await makeAPIcall("/invoices/getAll", "GET")
    if (response.error) {
      setInvoices(InvoicesArray)
    } else {
      setSelectInvoice(response.results[0])
      setInvoices(response.results)
    }
    setloadingPage(false)
  }, [InvoicesArray])

  useEffect(() => {
    fetchAllInvoices()
  }, [fetchAllInvoices])

  const selectInvoiceFunction = (value: InvoiceType) => {
    setSelectInvoice(value)
  }

  const filterInvoices = async (filter: string) => {
    setLoadingInvoices(true)
    setSelectInvoice(null)
    console.log(filter)
    const postData = {
      period: filter,
    }
    const response = await makeAPIcall("/invoices/filter", "POST", postData)
    if (!response.error) setInvoices(response.results)
    setLoadingInvoices(false)
  }

  return (
    <>
      {loadingPage ? (
        <>
          <Skeleton count={1} height={70} width={350} />
          <Skeleton count={1} height={"85%"} width={500} />
        </>
      ) : (
        <div className="recentInvoices">
          <Fragment>
            <div>
              <FilterInvoice filterInvoices={filterInvoices} />
              <InvoicesList invoices={invoices} selectInvoice={selectInvoiceFunction} loading={loadingInvoices} />
            </div>
            <InvoiceDetailsCard invoice={selectInvoice} />
          </Fragment>
        </div>
      )}
    </>
  )
}
