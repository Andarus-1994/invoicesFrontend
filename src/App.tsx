import RouteView from "./Router/index"
import SideMenu from "./Components/Navigation/SideMenu"
import "./App.scss"
import Header from "./Components/Header/Header"

function App() {
  return (
    <>
      <div className="mainView">
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
