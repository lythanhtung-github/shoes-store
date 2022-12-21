import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
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
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let searchValue = e.target[0].value;
        try {
            setState({ ...state, loading: true });
            async function getData() {
                let resProducts = await ProductService.searchProducts(searchValue);
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
    }

    const handleInputChange = (e) => {
        if (e.target.value === '') {
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
        }
    }

    const { loading, products, categories } = state;
    return (
        <>
            <section className='product-info'>
                <div className='container'>
                    <div className='row mt-2'>
                        <h2>DANH SÁCH SẢN PHẨM</h2>
                    </div>
                    <div className='row'>
                        <div className='col-md-8'>
                            <Link to={"/products/create"}
                                className='btn btn-success'>
                                <i className="fa-solid fa-plus"></i>
                                <span className='ms-2'>Thêm mới</span>
                            </Link>
                        </div>
                        <div className='col-md-4'>
                            <form onSubmit={handleSubmit}
                                className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 d-flex"
                            >
                                <input type="search"
                                    className="form-control form-control-dark rounded-0 rounded-start"
                                    placeholder="Bạn muốn tìm gì..."
                                    aria-label="Search"
                                    onChange={handleInputChange}
                                    on=""
                                />
                                <button type="submit" className="btn btn-primary rounded-0 rounded-end">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </section>
            <section className='product-list'>
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
                                                        <span key={item}
                                                        >{item}</span>
                                                    ))
                                                }
                                            </div>
                                            <div className="color">
                                                <h3>Color :</h3>
                                                {
                                                    product.color.map((item) => (
                                                        <span key={item}
                                                            style={{ backgroundColor: item }}
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