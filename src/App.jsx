/* eslint-disable react/prop-types */

import { useState } from "react";

/* eslint-disable no-undef */
function App() {
    const initialItems = [
        { id: 1, description: "a", quantity: 17, packed: false },
        { id: 2, description: "b", quantity: 20, packed: false },
        { id: 3, description: "c", quantity: 12, packed: false },
    ];
    const [Items, setItems] = useState(initialItems);
    function handleAddItems(newItem) {
        setItems([...Items, newItem]);
    }
    function handleDeleteItems(id) {
        setItems((Items) => [...Items].filter((item) => item.id !== id));
    }
    function handleChecked(id) {
        console.log(id);
        setItems(
            (Items) =>
                Items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item))
            // Items.map(function (item) {
            //     if (item.id === id) return  ({...item, packed: !item.packed });

            //      return item

            // })
        );
        // console.log(id)
    }
    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList
                Items={Items}
                handleChecked={handleChecked}
                onDeleteItems={handleDeleteItems}
                setItems={setItems}
            />
            <Stats numItems={Items.length} />
        </div>
    );
}
function Logo() {
    return <h1>🌴 Far Away🧳</h1>;
}
function Form({ onAddItems }) {
    const [dec, setDec] = useState("");
    const [qun, setQun] = useState(1);
    return (
        <form
            className="add-form"
            onSubmit={(e) => {
                e.preventDefault();
                const newItem = {
                    id: new Date().getTime(),
                    packed: false,
                    description: dec,
                    quantity: qun,
                };
                onAddItems(newItem);
            }}
        >
            <h3>what do you nedd for your 😊 trip?</h3>
            <select name="" id="" value={qun} onChange={(e) => setQun(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <input
                value={dec}
                type="text"
                placeholder="item..."
                onChange={(e) => setDec(e.target.value)}
            />
            <button>Add</button>
        </form>
    );
}
function PackingList({ Items, handleChecked, onDeleteItems, setItems }) {
    const [sort, setSort] = useState("input");
    let sortedItems;

    if (sort === "input") sortedItems = Items;
    if (sort === "description")
        sortedItems = Items.slice().sort((a, b) => a.description.localeCompare(b.description));

    if (sort === "packed")
    sortedItems = Items.sort((a, b) =>
             Number(b.packed) - Number(a.packed)
     );

    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <Item
                        key={item.id}
                        Itemobj={item}
                        handleChecked={handleChecked}
                        onDeleteItems={onDeleteItems}
                    />
                ))}
            </ul>
            <div className="actions">
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="input">sort by order</option>
                    <option value="description">sort by description</option>
                    <option value="packed">sort by packed</option>
                </select>
            </div>
        </div>
    );
}
function Item({ Itemobj, handleChecked, onDeleteItems }) {
    //  const [pack,setPack]=useState(false)
    return (
        <li>
            <input
                type="checkbox"
                value={Itemobj.packed}
                onChange={() => handleChecked(Itemobj.id)}
            />
            <span style={Itemobj.packed ? { textDecoration: "line-through" } : {}}>
                {Itemobj.quantity} {Itemobj.description}
            </span>
            <button onClick={() => onDeleteItems(Itemobj.id)}>❌</button>
        </li>
    );
}
function Stats({ numItems }) {
    return <footer className="stats">💼You have {numItems} items on your list</footer>;
}
export default App;
