import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])
    //Call API for Product list
    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products");
        result = await result.json();
        setProducts(result);


    }
    //Funcation for delete API call.
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete"
        });
        result = await result.json()
        if (result) {
            //This alert only for chick
            // alert("record is delete")
            getProducts()
        }

    };
    const searchHandle = async (event) => {
        let key = event.target.value;
        // یہ ایف کا فنکشن چیک کرنے کے لئے ہے اگر کچھ نہ ہو تو دوبارہ گیٹ والے فنکشن پر کال کرے
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        } else {
            getProducts()
        }

    }
    return (

        <div className='product-list'>
            <h2>Product list</h2>
            {/* input box for search */}
            <input type="text" className='search-product-box' placeholder='Search Product'
                onChange={searchHandle}
            />
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
                //if not result so will show no result found
                // use for this product.lenght>0...
                products.length>0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        {/* <li>{item.company}</li> */}
                        <li><button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/" + item._id} >Update</Link>
                        </li>
                    </ul>
                )
                    : <h1>No Result Found</h1>
            }
        </div>

    )
}

export default ProductList