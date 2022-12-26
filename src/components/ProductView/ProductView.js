import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import ProductService from './../../services/productService';
import Loader from './../Loader/Loader';
import CategoryService from './../../services/categoryService';
import Helper from './../utils/Helper';
import './product-view.css';

function ProductView() {
    const { productId } = useParams();
    const [state, setState] = useState({
        loading: true,
        product: {},
        categories: [],
        errorMessage: ''
    });

    useEffect(() => {
        try {
            async function getData() {
                let resProduct = await ProductService.getProductById(productId);
                let resCategories = await CategoryService.getCategories();
                console.log(resProduct.data)
                setState({
                    ...state,
                    loading: false,
                    product: resProduct.data,
                    categories: resCategories.data
                })
            }
            getData();
        }
        catch (error) {
            toast.error(error.message);
        }
    }, []);

    const getCategoryName = (categoryId) => {
        let category = categories.find((cat) => cat.id === categoryId);
        return category ? category.name : '';
    }

    const { loading, product, categories } = state;
    const { name, description, category_id, color, image, size, price } = product;
    return (
        <>
            <div className='container'>
                <div className='row mt-2'>
                    <h2 className='text-center'>PRODUCT VIEW</h2>
                    <hr />
                </div>
                {
                    loading ? <Loader /> :
                        (<div className='row'>
                            <div className="row">
                                <div className="col-sm-5 d-flex flex-column align-items-center">

                                    <img className='mt-2 col-sm-12'
                                        src={
                                            image || 'https://chiinstore.com/media/product/2418_555088_105_946c7d0c61b74f2f94a1c0950956fa80_master.png'
                                        }
                                        alt=""
                                    />
                                </div>
                                <div className="col-sm-7">
                                    <div className='col-sm-12 row'>
                                        <label className='display-5'>{name || ""}</label>
                                    </div>
                                    <div className='col-sm-12 row'>
                                        <label className='display-6 text-primary fst-italic'>{Helper.formatCurrency(price) || 0}</label>
                                    </div>
                                    <div className='col-sm-12 row my-3'>

                                        <label className="form-label col-sm-2">Size:</label>
                                        <div className='col-sm-10 row d-flex justify-content-start'>
                                            {
                                                size.map((item, index) => (
                                                    <div className='col-sm-1 sizeItems me-2' key={index}>{item}</div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className='col-sm-12 row my-3'>
                                        <label className="form-label col-sm-2">Color:</label>
                                        <div className='col-sm-10 row d-flex justify-content-start'>
                                            {
                                                color.map((item, index) => (
                                                    <div className='colorItems me-2'
                                                        style={
                                                            { backgroundColor: item }
                                                        }
                                                        key={index}></div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='col-sm-12'>
                                        <label htmlFor='category_id'>Category: {getCategoryName(product.category_id)}</label>
                                    </div>
                                    <hr />
                                    <div className='col-sm-12 row'>
                                        <div className='form-group row'>
                                            <label htmlFor='description' className="form-label">Description:</label>
                                            <div className="col-sm-12">
                                                <div>{description}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <hr />
                                    <div className='row d-flex'>
                                        <Link to={"/shoes-store"}
                                            className="btn btn-dark col-md-2">
                                            <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                                        </Link>
                                    </div>
                                    <hr />
                                </div>

                            </div>
                        </div>
                        )
                }
            </div>
        </>
    );
}

export default ProductView;