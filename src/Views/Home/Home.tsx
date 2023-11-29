import "./Home.scss"
import RecentInvoices from "./RecentInvoices/RecentInvoices"

export default function Home() {
  return (
    <>
      <div className="home">
        <RecentInvoices />
      </div>
    </>
  )
}
