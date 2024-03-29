import { useState } from "react"
import "./ItemsInvoice.scss"
import { IoCloseSharp } from "react-icons/io5"
import { ItemInvoiceType } from "../../../Components/Types/ItemInvoice"
import Button from "@mui/material/Button"

type ItemsInvoiceProps = {
  close: () => void
  setItem: (newItem: ItemInvoiceType) => void
  items: ItemInvoiceType[]
}
export default function ItemsInvoice({ close, setItem, items }: ItemsInvoiceProps) {
  const [newItem, setNewItem] = useState<ItemInvoiceType>({
    id: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value
    setNewItem((prevItem) => ({ ...prevItem, [event.target.name]: newValue }))
  }

  const addItemToList = () => {
    const fieldsToValidate = (Object.keys(newItem) as (keyof ItemInvoiceType)[]).filter((field) => field !== "id")
    const validationFields = fieldsToValidate.every((field) => newItem[field].toString().trim() !== "")
    if (validationFields) {
      setItem(newItem)
      setNewItem({
        id: "",
        name: "",
        description: "",
        price: "",
        quantity: "",
      })
    }
  }

  const handlepriceBlur = () => {
    const cleanedAmount = newItem.price.replace(/[^0-9.]/g, "")
    let formattedAmount = parseFloat(cleanedAmount).toFixed(2)

    if (isNaN(Number(formattedAmount))) formattedAmount = "0"
    setNewItem((prevItem) => ({ ...prevItem, price: formattedAmount }))
  }

  const handleQtyBlur = () => {
    let clearQty = newItem.quantity.replace(/[^\d.]/g, "")
    clearQty = clearQty.split(".")[0]
    if (clearQty === "" || isNaN(Number(clearQty))) {
      clearQty = "0"
    }
    setNewItem((prevItem) => ({ ...prevItem, quantity: clearQty }))
  }

  return (
    <div className="itemsInvoice">
      <IoCloseSharp className="close-icon" onClick={close} />
      <p>Items added so far</p>
      <div className="list-items-invoice">
        <div className="row-item-invoice header-item-invoice">
          <div>Name</div>
          <div>Description</div>
          <div>Price</div>
          <div>Quantity</div>
        </div>
        <div className="body-items-invoice">
          {!items.length ? (
            <div style={{ textAlign: "center", margin: "auto" }}>No items added</div>
          ) : (
            items.map((item, index) => {
              return (
                <div className="row-item-invoice" key={item.name + index}>
                  <div>{item.name}</div>
                  <div>{item.description}</div>
                  <div>{item.price} $</div>
                  <div>{item.quantity}</div>
                </div>
              )
            })
          )}
        </div>
      </div>
      <div className="formAddItem">
        <h4>Add new item</h4>
        <div className="inputRow">
          <input name="name" placeholder="Name" value={newItem.name} onChange={handleInputChange} />
          <input name="price" placeholder="Price" onBlur={handlepriceBlur} value={newItem.price} onChange={handleInputChange} />
          <input name="quantity" onBlur={handleQtyBlur} placeholder="Qty" value={newItem.quantity} onChange={handleInputChange} />
        </div>
        <div className="textAreaRow">
          <textarea name="description" placeholder="Description" value={newItem.description} onChange={handleInputChange} rows={2} />
        </div>
        <span>All fields are required</span>
        <Button onClick={addItemToList}>Add Item</Button>
      </div>
    </div>
  )
}
