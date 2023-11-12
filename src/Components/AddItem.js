import { useRef } from 'react'
import { FaPlus } from 'react-icons/fa'

const AddItem = ({ newItems, setNewItems, handleChange }) => {
    const inputRef = useRef();

    return (
        <form className='addForm' onSubmit={handleChange}>
            <label htmlFor="addItem"></label>
            <input
                autoFocus
                ref={inputRef}
                type="text"
                id='addItem'
                placeholder='Add new items'
                required
                value={newItems}
                onChange={(e) => setNewItems(e.target.value)}
            />
            <button
                type="submit"
                aria-label='Add Item'
                onClick={() => inputRef.current.focus()}
            >
                <FaPlus />
            </button>
        </form>
    )
}

export default AddItem