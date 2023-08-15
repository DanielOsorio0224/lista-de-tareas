import { forwardRef } from "react"
import Input from "../../Input"
import PropTypes from 'prop-types'

function TodoBlock({focus, item , onChange, onKeyDown}, ref) {
    
    function handleOnchange(e){
        onChange(item, e)
    }

    function handleOnKeyDown(e){
        onKeyDown(item, e)
    }
    
    return (
        <div>
            <input type={'checkbox'} name='checkbox' onChange={handleOnchange} checked={item.completed} />
            <Input
                name="text" ref={focus ? ref : null}
                value={item.text} onKeyDown={handleOnKeyDown} onChange={handleOnchange}></Input>
        </div>
    )
}

export default forwardRef(TodoBlock)

TodoBlock.propTypes = {
    focus: PropTypes,
    item: PropTypes,
    onChange: PropTypes,
    onKeyDown: PropTypes
}