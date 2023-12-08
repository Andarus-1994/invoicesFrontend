import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.scss"
import { BrowserRouter } from "react-router-dom"

import { createTheme, ThemeProvider } from "@mui/material/styles"

// Theme for MUI
const primary = {
  main: "#08afc9",
  light: "#08afc9",
  dark: "#08afc9",
  contrastText: "#fff",
}

const theme = createTheme({
  palette: {
    primary: primary,
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
