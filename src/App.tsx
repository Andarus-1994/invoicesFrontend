import RouteView from "./Router/index"
import SideMenu from "./Components/Navigation/SideMenu"
import "./App.scss"
import Header from "./Components/Header/Header"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <>
      <div className="mainView">
        <ToastContainer />
        <SideMenu />
        <div className="content">
          <Header />
          <RouteView />
        </div>
      </div>
    </>
  )
}

export default App
