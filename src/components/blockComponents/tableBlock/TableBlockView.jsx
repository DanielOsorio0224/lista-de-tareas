import { forwardRef } from "react"
import Button from '../../Button.jsx'
import TableBlock from "./TableBlock.jsx";
import PropTypes from 'prop-types'

function TableBlockView({ data, columns, onChange, onCreate, onCreateNewColumn }, ref) {

  function handleNewColumn() {
    const name = prompt('Name of the new column');
    if (!name) {
      onCreateNewColumn(name)
    }
  }

  function handleNewRow() {
    onCreate();
  }

  function handleOnChange(rowIndex, property, value) {
    const item = data[rowIndex][property] = value
    onChange({ type: 'table', id: item.id, text: item.text, completed: item.completed, updateItem: item })
  }

  return (
    <div>
      <Button onClick={handleNewColumn}>Add new Column</Button>
      <Button onClick={handleNewRow}>Add new row</Button>

      <TableBlock columns={columns} data={data} onChange={handleOnChange} />

    </div>
  )
}

export default forwardRef(TableBlockView)

TableBlockView.propTypes = {
  data: PropTypes,
  columns: PropTypes,
  onChange: PropTypes,
  onCreate: PropTypes,
  onCreateNewColumn: PropTypes
}