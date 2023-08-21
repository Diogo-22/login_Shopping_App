import ItemList from './ItemList';
import useGList from '../hooks/useGList';

const Content = ({loading, search, handleCheck, handleDelete }) => {
    const { items } = useGList()
    console.log(items)
        
    let searchedItems = items 
    ? items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    : []
     
    return (
        <main>
            {items?.length ? (
                
                <ItemList
                    items={searchedItems}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                    
                />
            ) : loading === true ? (
                <p style={{ marginTop: '2rem' }}>Your list is loading...</p>
            ) : (
                <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
            )}
        </main>
    )
}

export default Content
