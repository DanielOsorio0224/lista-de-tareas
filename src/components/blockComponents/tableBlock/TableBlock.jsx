import Headers from "./Headers.jsx"
import Celda from "./Celda.jsx"
import { forwardRef } from "react"
import PropTypes from 'prop-types'
import './celda.css'

function TableBlock({columns, data, onChange },ref){
    
    
    return(
        <table>
          <thead>
            <Headers columns={columns}/>
          </thead>
          <tbody>
            {data.map((row, rowIndex) =>(
              <tr key={crypto.randomUUID()}>
                {columns.map((celda, celdaIndex) =>(
                 <Celda key={crypto.randomUUID()} text={row[celda].toString() ?? ''}
                        onChange={(value)=> onChange(rowIndex, celda, value)}
                        canBeEdited={columns[celdaIndex]  !== 'id'}
                 />
                ))}
              </tr>
            ))}
          </tbody>
      </table>
    )
}

export default forwardRef(TableBlock)

TableBlock.propTypes = {
    columns: PropTypes,
    data: PropTypes,
    onChange: PropTypes
}