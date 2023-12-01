import axios, { AxiosResponse, AxiosError } from "axios"
import { toast, Slide } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

type TypeAPI = "POST" | "UPDATE" | "GET" | "DELETE"

export const makeAPIcall = async (url: string, type: TypeAPI, data?: unknown) => {
  const baseURL = import.meta.env.VITE_API_URL
  try {
    const response: AxiosResponse = await axios({
      method: type,
      url: baseURL + url,
      data: type === "POST" ? data : null,
    })

    console.log(response.data)
    if (response.data) return response.data
  } catch (error) {
    // handlin the error
    if (error instanceof AxiosError) {
      console.error("API Error:", error.message)
      toast.dismiss()
      toast.error("Data for testing. Failed Connection 404", {
        position: toast.POSITION.TOP_RIGHT,
        type: toast.TYPE.ERROR,
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      })
    }
    return {
      error: true,
      errorObject: error,
    }
  }
}
