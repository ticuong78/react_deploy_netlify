import LineItems from './LineItems';

const ItemLists = ({ items, handleClick, hanldeDelete }) => {
    return (
        <ul>
            {items.map((item) => (
                <LineItems
                    key={item.id}
                    item={item}
                    handleClick={handleClick}
                    hanldeDelete={hanldeDelete}
                />
            ))}
        </ul>
    )
}

export default ItemLists;