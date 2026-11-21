
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000")
      .then(res => setData(res.data));
  }, []);

  const addProduct = async () => {
    await axios.post("http://localhost:8000/add", {
      id: data.length ? Math.max(...data.map(item => item.id)) + 1 : 1,
      prodname: name,
      qty: 10,
      price: 100
    });

    const res = await axios.get("http://localhost:8000");
    setData(res.data);
    setName("");
  };

  const deleteProduct = async (id) => {
    const res = await axios.delete(`http://localhost:8000/${id}`);
    setData(res.data);
  };

  return (
    <div className="App">
      <h1>Inventory Management</h1>

      <input
        placeholder="Product Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={addProduct} disabled={!name.trim()}>Add</button>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.prodname}</td>
              <td>{item.qty}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => deleteProduct(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
