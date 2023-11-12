import { FaTrashAlt } from 'react-icons/fa';

const LineItems = ({ item, handleClick, hanldeDelete }) => {
    return (
        <li className="item">
            <input
                type="checkbox"
                name="checkbox"
                checked={item.checked}
                onChange={() => handleClick(item.id)}
            />
            <label
                style={item.checked ? { textDecoration: 'line-through' } : null}
                onDoubleClick={() => handleClick(item.id)}
            >{item.item}</label>
            <FaTrashAlt
                role="button"
                tabIndex="0"
                onClick={() => hanldeDelete(item.id)}
            />
        </li>
    )
}

export default LineItems