import { useRef, useState } from "react";
import TextBlockView from "./blockComponents/textBlock/TextBlockView";
import TodoBlockView from "./blockComponents/todoBlock/TodoBlockView";
import TableBlockView from "./blockComponents/tableBlock/TableBlockView";
import Button from "./Button";
import './blockView.css'

export default function BlockView() {

    const ref = useRef(null)
    const [currentItem, setCurrentItem] = useState(null)
    const [type, setType] = useState('text')
    const [properties, setProperties] = useState(['id', 'text', 'completed'])
    const [data, setData] = useState([
        {
            id: crypto.randomUUID,
            text: 'Hola a todos',
            completed: false
        }
    ])
    const [visible, setVisible] = useState(false)

    function handleOnChange(item){
        const {type, text, id} = item;
        if(type == 'text'){
            const temp = [...data];
            const editItem = temp.find(i => i.id === id)
            if(editItem){
                editItem.text = text;
                setData(temp)
            }
        }
        if(type == 'todo'){
            const temp = [...data];
            const editItem = temp.find(i => i.id === id)
            if(editItem){
                editItem.text = text ?? editItem.text ;
                editItem.completed = item.completed ?? editItem.completed ;
                setData(temp)
            }
        }
        
        if(type == 'table'){
            const temp = [...data];
            let editItem = temp.find(i => i.id === id)
            if(editItem){
                editItem = item.updatedItem
                setData(temp)
            }
        }
    }

    function handleOnCreate(){
        const newItem = {
            id: crypto.randomUUID(),
            text: 'Hola',
            completed: false 
        }

        properties.forEach(prop => {
            if(!newItem.hasOwnProperty(prop)){  
                newItem[prop] = ''
            }
        })

        const temp = [...data, newItem]
        setData(temp)
        setCurrentItem(newItem)
    }

    function handleNewColumn(name){
        updateProperties(name)
    }

    function updateProperties(name){
        const newProperties = [...properties, name]

        const temp = [...data]

        for(let i =0; i< temp.length; i++){
            const item = temp[i]
            for(let j = 0; j< newProperties.length; j++){
                const prop = newProperties[j]
                if(item.hasOwnProperty(prop)){
                    console.log('Ya existe la propiedad', prop)
                }else{
                    item[prop] = 'test'
                }
            }
        }
        setProperties(newProperties);
        setData(temp)
    }

    function TypesSelector(){
        return <div style={{position:'relative', marginTop:'20px'}}>
            <Button onClick={()=>setVisible(!visible)}>...</Button>
            <div className="typesSelectorButtons" style={{display: visible ? 'flex' : 'none'}}>
                <button className="blockViewButton" onClick={() => setType('text')}>Texto</button>
                <button className="blockViewButton" onClick={() => setType('todo')}>Todo</button>
                <button className="blockViewButton" onClick={() => setType('table')}>Table</button>
            </div>
        </div>
    }

    if(type === 'todo'){
        return <div className="blockViewContainer">
            <TypesSelector/>
            <TodoBlockView
            ref={ref} focusId={currentItem?.id} data={data} 
            onChange={handleOnChange} onCreate={handleOnCreate} />
        </div>
    }


    if(type === 'table'){
        return <div className="blockViewContainer">
            <TypesSelector/>
            <TableBlockView
            ref={ref} focusId={currentItem?.id} data={data} columns={properties}
            onChange={handleOnChange} onCreate={handleOnCreate} onCreateNewColumn={handleNewColumn} />
        </div>
    }


    return (
        <div className="blockViewContainer">
            <TypesSelector/>
            <TextBlockView 
            ref={ref} focusId={currentItem?.id} data={data} 
            onChange={handleOnChange} onCreate={handleOnCreate} />
        </div>
    )
}
