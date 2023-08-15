import { forwardRef } from "react";
import Input from "../../Input";
import PropTypes from 'prop-types'

function TextBlock({item, onChange, onKeyDown, focus}, ref ) {
  
  function handleOnchange(e){
    onChange(item, e)
  }

  function handleOnKeyDown(e){
    onKeyDown(item, e)
  }

    return (
    <Input border
    ref={focus ? ref : null} 
    value={item.text} onKeyDown={handleOnKeyDown} onChange={handleOnchange}></Input>
  )
}

export default forwardRef(TextBlock);

TextBlock.propTypes = {
    item: PropTypes,
    onChange: PropTypes,
    onKeyDown: PropTypes,
    focus: PropTypes
}