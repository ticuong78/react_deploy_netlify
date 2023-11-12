import ItemLists from './ItemLists'

const Content = ({ items, handleClick, hanldeDelete }) => {
    return (
        <>
            {items.length ? (
                <ItemLists
                    items={items}
                    handleClick={handleClick}
                    hanldeDelete={hanldeDelete}
                />
            ) : (
                <p style={{ marginTop: "2rem" }}>Your list is empty</p>
            )}
        </>
    );
}

export default Content;