import React, { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import ProductService from './../../services/productService';
import CategoryService from './../../services/categoryService';
import './product-list.css'


function ProductList() {
    const [state, setState] = useState({
        loading: false,
        products: [],
        categories: [],
        errorMessage: ""
    })

    useEffect(() => {
        try {
            setState({ ...state, loading: true });
            async function getData() {
                let resProducts = await ProductService.getProducts();
                let resCategories = await CategoryService.getCategories();
                setState({
                    ...state,
                    loading: false,
                    products: resProducts.data,
                    categories: resCategories.data
                })
            }
            getData();
        } catch (error) {
            setState({
                ...state,
                errorMessage: error.message
            })
        }
    }, [])


    const { loading, products, categories } = state;
    return (
        <>
            <section className='product-info'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        {
                            loading ? <Loader /> : (
                                products.map((product) => (
                                    <div key={product.id} className="card mt-2 me-2">
                                        <div className="imgBx">
                                            <img src={product.image} alt="nike-air-shoe" />
                                        </div>
                                        <div className="contentBx">
                                            <h3>{product.name}</h3>
                                            <div className="description">
                                                <p className="fst-italic text-white">{product.description}</p>
                                            </div>
                                            <div className="price d-flex align-items-center">
                                                <h3>Price :</h3>
                                                <h3 className="text-yellow">{new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                }).format(product.price)}
                                                </h3>
                                            </div>
                                            <div className="size">
                                                <h3>Size :</h3>
                                                {
                                                    product.size.map((item) => (
                                                        <span>{item}</span>
                                                    ))
                                                }
                                            </div>
                                            <div className="color">
                                                <h3>Color :</h3>
                                                {
                                                    product.color.map((item) => (
                                                        <span
                                                            style={{backgroundColor: item}}
                                                        ></span>
                                                    ))
                                                }
                                            </div>
                                            <button className='btn btn-sm btn-primary'>
                                                <i className="fa-regular fa-eye"></i>
                                            </button>
                                            <button className='btn btn-sm btn-success'>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button className='btn btn-sm btn-danger'>
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                        </div>

                                    </div>
                                )
                                )
                            )
                        }
                    </div>
                </div>
            </section>
        </>

    )
}

export default ProductList;