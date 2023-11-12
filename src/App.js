import './App.css';
import { useEffect, useState } from "react";
import Header from './Components/Header';
import AddItem from './Components/AddItem';
import Footer from './Components/Footer';
import Content from './Components/Contents';
import SearchItem from './Components/SearchItem';
import apiRequest from './Components/apiRequest';

function App() {
  const API_URL = 'http://localhost:3500/items';

  const [items, setItems] = useState([]);
  const [newItems, setNewItems] = useState('');
  const [search, setSearch] = useState('');
  const [fecthError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fecthItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expected data');
        const listItems = await response.json();
        console.log(listItems);
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setLoading(false);
      }
    }

    setTimeout(() => {
      fecthItems();
    }, 2000);
  }, [])

  useEffect(() => {
    localStorage.setItem('shoppingLists', JSON.stringify(items));
  }, [items]);

  const addItem = async (item) => {
    const myNewItem = {
      id: items.length ? items[items.length - 1].id + 1 : 1,
      checked: false,
      item
    }
    console.log(myNewItem);
    const listItems = [...items, myNewItem];
    setItems(listItems);
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  }

  const handleChange = (e) => {
    e.preventDefault();
    if (!newItems) return;
    addItem(newItems);
    setNewItems('');
  }

  const handleClick = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item)
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  }

  const hanldeDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = { method: 'DELETE' }
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  }

  return (
    <div className="App">
      <Header />
      <AddItem
        newItems={newItems}
        setNewItems={setNewItems}
        handleChange={handleChange}
      />
      <main>
        {loading && <p>Loading Items...</p>}
        {fecthError && <p style={{ color: 'red', margin: 0 }}>Error: {fecthError}</p>}
        {!fecthError && !loading && <Content
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleClick={handleClick}
          hanldeDelete={hanldeDelete}
        />}
      </main>
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <Footer length={items.length} />
    </div >
  );
}

export default App;
