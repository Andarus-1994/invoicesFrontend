export const handleCloseEscp = (e: React.KeyboardEvent<HTMLDivElement>, callBack: () => void) => {
  if (e.key === "Escape") callBack()
}
