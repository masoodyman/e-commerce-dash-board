import React, { useEffect } from "react";
import { useParams,useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();


    useEffect(()=>{
        // console.log(params)
        // if you want to call api so you can from useEffect fun but better is that make siprate funcation
        getProductDetails();
    },[])
    //call api 
    const  getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    //Call api from frontend to backend
    const handleUpdateProduct = async () => {

        console.log(name, price, category, company);
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
        method: "Put",
        body: JSON.stringify({name, price, category, company}),
        headers: {"Content-Type": "application/json"}
        });
        result = await result.json()
        console.warn(result)
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

                <input
                    type="text"
                    placeholder="Enter product Price"
                    className="inputBox"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter product Category"
                    className="inputBox"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter product Company"
                    className="inputBox"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />

                <button className="sign-button" onClick={handleUpdateProduct}>
                    Update Product
                </button>
            </div>
        </>
    );
};

export default UpdateProduct;
