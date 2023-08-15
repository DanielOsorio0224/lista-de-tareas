import PropTypes from 'prop-types'

export default function Headers({ columns }) {
    return (
        <tr>
            {columns.map((head) => (
                <th key={crypto.randomUUID()}>{head}</th>
            ))}
        </tr>
    )
}

Headers.propTypes = {
    columns:PropTypes
}