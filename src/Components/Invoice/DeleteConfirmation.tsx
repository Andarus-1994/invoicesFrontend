import "./DeleteConfirmation.scss"
import { PiCloudWarningFill } from "react-icons/pi"
import { motion } from "framer-motion"
import { useState } from "react"
import { handleCloseEscp } from "../../Utils/HandleCloseEscp"

type PropsDeleteConfirmation = {
  close: () => void
  confirmFunction: () => Promise<void>
}
export default function DeleteConfirmation({ close, confirmFunction }: PropsDeleteConfirmation) {
  const [loading, setLoading] = useState(false)
  const runFunction = async () => {
    setLoading(true)
    await confirmFunction()
    setLoading(false)
  }
  return (
    <>
      <div className="cover" onClick={close}></div>
      <motion.div
        className="modalDeleteConfirmation"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ type: "spring", stiffness: 200 }}
        onKeyDown={(e) => handleCloseEscp(e, close)}
        tabIndex={1}
      >
        <PiCloudWarningFill />
        <h3>Are you sure you wanna delete this invoice?</h3>
        <div className="flexButtons">
          <button onClick={close} className="cancel">
            Cancel
          </button>
          <button onClick={runFunction} className={loading ? "disabled" : ""} autoFocus>
            Yes
          </button>
        </div>
      </motion.div>
    </>
  )
}
