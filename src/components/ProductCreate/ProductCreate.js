import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import Loader from '../Loader/Loader';
import { toast } from "react-toastify";
import CategoryService from './../../services/categoryService';
import ProductService from './../../services/productService';

const sizes = [38, 39, 40, 41, 42, 43, 44, 45];
const colors = ['Red', 'Green', 'Yellow', 'Blue', 'Brown', 'White'];

function ProductCreate() {
    const [state, setState] = useState({
        loading: true,
        product: {
            size: [],
            color: [],
        },
        categories: [],
        errorMessage: ''
    });

    const [image, setImage] = useState('');
    const sizeChecked = useRef([]);
    const colorChecked = useRef([]);
    useEffect(() => {
        try {
            async function getData() {
                let resCategories = await CategoryService.getCategories();
                setState({
                    ...state,
                    loading: false,
                    categories: resCategories.data,
                })
            }
            getData();
        } catch (error) {

        }
    }, []);

    const handlePreviewImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage(file);
        // e.target.value = null;
    }

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            setState({
                ...state,
                loading: true
            });
            async function createProduct() {
                let data = {
                    ...product,
                    image: 'https://cdn.shopify.com/s/files/1/0388/8847/2707/products/flowerkickzAir_Jordan_4_Black_Canvas-DH7138-006-0_1600x.png?v=1662196932'
                }
                let resCreate = await ProductService.createProduct(data);
                if (resCreate.data) {
                    toast.success(`Thêm mới sản phẩm ${resCreate.data.name} thành công`);
                    setState({
                        ...state,
                        loading: false,
                        product : {}
                    })
                }
            }
            createProduct();

        } catch (error) {

        }
        sizeChecked.current = [];
        colorChecked.current = [];
    }

    const handleChange = (e) => {
        setState({
            ...state,
            product: {
                ...product,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleCheckSize = (item) => {
        sizeChecked.current.push(item);
        setState({
            ...state,
            product: {
                ...product,
                size: sizeChecked.current
            }
        })
    }

    const handleCheckColor = (item) => {
        colorChecked.current.push(item);
        setState({
            ...state,
            product: {
                ...product,
                color: colorChecked.current
            }
        })
    }

    const { loading, product, categories } = state;
    const { name, price, categoryId, description } = product;
    return (
        <div className='container'>
            <div className='row mt-2'>
                <h2 className='text-center'>THÊM MỚI SẢN PHẨM</h2>
                <hr />
            </div>
            {
                loading ? <Loader /> :
                    (<div className='row'>
                        <form onSubmit={handleCreateProduct}>
                            <div className="row">
                                <div className="col-sm-7">
                                    <div className='col-sm-12 row'>
                                        <div className='form-group mt-2 col-sm-12'>
                                            <label htmlFor='name' className="form-label">Tên sản phẩm:</label>
                                            <div className="col-sm-12">
                                                <input type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name='name'
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className='col-sm-12 row'>
                                        <div className='form-group mt-2 col-sm-6'>
                                            <label htmlFor='price' className="form-label">Giá bán:</label>
                                            <div className="col-sm-12">
                                                <input type="number"
                                                    className="form-control"
                                                    id="price"
                                                    name='price'
                                                    // value={price || 10000}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='form-group mt-2 col-sm-6'>
                                            <label htmlFor='categoryId' className="form-label">Loại:</label>
                                            <div className="col-sm-12">
                                                <select className='form-select'
                                                    id='categoryId'
                                                    name='categoryId'
                                                    // value={provinceId}
                                                    onChange={handleChange}
                                                >
                                                    {
                                                        categories.map((item) => (
                                                            <option value={item.id}
                                                                key={item.id}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-sm-12 row'>
                                        <div className='form-group mt-2 row'>
                                            <label htmlFor='size' className="form-label">Size:</label>
                                            <div className='col-sm-12 row d-flex justify-content-start'>
                                                {
                                                    sizes.map(item => (
                                                        <div className='col-md-2' key={item}>
                                                            <div className="form-check">
                                                                <input className="form-check-input"
                                                                    type="checkbox"
                                                                    id={item}
                                                                    // checked={hobbit.includes(item.id)}
                                                                    onChange={() => handleCheckSize(item)}
                                                                />
                                                                <label className="form-check-label" htmlFor={item}>{item}</label>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='col-sm-12 row'>
                                        <div className='form-group row'>
                                            <label htmlFor='color' className="form-label">Màu sắc:</label>
                                            <div className='col-sm-12 row'>
                                                {
                                                    colors.map(item => (
                                                        <div className='col-sm-2' key={item}>
                                                            <div className="form-check">
                                                                <input className="form-check-input"
                                                                    type="checkbox"
                                                                    id={item}
                                                                    // checked={hobbit.includes(item.id)}
                                                                    // onChange={() => handleCheck(item.id)}
                                                                    onChange={() => handleCheckColor(item)}
                                                                />
                                                                <label className="form-check-label"
                                                                    style={
                                                                        item === 'Red' ? { color: 'red' } :
                                                                            item === 'Green' ? { color: 'green' } :
                                                                                item === 'Yellow' ? { color: 'Yellow' } :
                                                                                    item === 'Blue' ? { color: 'Blue' } :
                                                                                        item === 'Magenta' ? { color: 'Magenta' } :
                                                                                            item === 'Brown' ? { color: 'Brown' } :
                                                                                                item === 'Cyan' ? { color: 'Cyan' } :
                                                                                                    { color: 'Black' }
                                                                    }
                                                                    htmlFor={item}>{item}</label>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='col-sm-12 row'>
                                        <div className='form-group row'>
                                            <label htmlFor='description' className="form-label">Mô tả:</label>
                                            <div className="col-sm-12">
                                                <textarea
                                                    id='description'
                                                    name='description'
                                                    className='form-control'
                                                    rows="4"
                                                    onChange={handleChange}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='col-sm-12 row'>
                                        <div className='form-group row'>
                                            <label htmlFor='image' className="form-label">Hình ảnh:</label>
                                            <div className='col-sm-12'>
                                                <input className="form-control"
                                                    type="file"
                                                    id="image"
                                                    name="image"
                                                    onChange={handlePreviewImage}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='row d-flex'>
                                        <button type="submit" className="btn btn-success me-2 col-md-3">
                                            <i className="fa fa-plus" aria-hidden="true"></i> Thêm mới
                                        </button>
                                        <Link to={"/shoes-store"}
                                            className="btn btn-dark col-md-3">
                                            <i className="fa fa-arrow-left" aria-hidden="true"></i> Trở về
                                        </Link>
                                    </div>
                                    <hr />
                                </div>
                                <div className="col-sm-5">
                                    <img
                                        className='mt-2 col-sm-12'
                                        src={
                                            image ? image.preview : 'https://chiinstore.com/media/product/2418_555088_105_946c7d0c61b74f2f94a1c0950956fa80_master.png'
                                        }
                                        alt=""
                                        id='productImage'
                                        name='productImage'
                                    />
                                </div>
                            </div>
                        </form>
                    </div>)
            }

        </div>
    )
}

export default ProductCreate;