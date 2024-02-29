import React from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [error, setError] = React.useState(false)
  const navigate = useNavigate();
  const handleAddProduct =  async () => {

    //This logic for Chech empty state
    if(!name || !price || !category || !company)
    {
        setError(true)
        return false;
    }
    // if you wrote this code so will not execut code after it.
    // return false

    console.log(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method : "post",
      body: JSON.stringify({name, price, category, company,userId}),
      headers:{
        "Content-Type": "application/json"
      }
    });
    result = await result.json();
    console.log(result);
    navigate("/")
  }

  return (
    <>
      <div>
        <h1>AddProduct</h1>
        <input
          type="text"
          placeholder="Enter product Name"
          className="inputBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* This code for Show error message */}
        {error && !name && <span className="invalid-input">Enter valid name</span>}
        <input
          type="text"
          placeholder="Enter product Price"
          className="inputBox"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && <span className="invalid-input">Enter valid price</span>}
        <input
          type="text"
          placeholder="Enter product Category"
          className="inputBox"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {error && !category && <span className="invalid-input">Enter valid category</span>}
        <input
          type="text"
          placeholder="Enter product Company"
          className="inputBox"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        {error && !company && <span className="invalid-input">Enter valid company</span>}
        <button className="sign-button" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>
    </>
  );
};

export default AddProduct;
