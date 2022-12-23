import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import Loader from '../Loader/Loader';
import { toast } from "react-toastify";
import CategoryService from './../../services/categoryService';
import ProductService from './../../services/productService';
import CloudinaryHelper from './../utils/CloudinaryHelper';

const sizes = [38, 39, 40, 41, 42, 43, 44, 45];
const colors = ['Red', 'Green', 'Yellow', 'Blue', 'Brown', 'White'];

var imageFile = null;
function ProductCreate() {
    const [state, setState] = useState({
        loading: true,
        product: {},
        categories: [],
        errorMessage: ''
    });

    const [sizeChecked, setSizeChecked] = useState([]);
    const [colorChecked, setColorChecked] = useState([]);

    useEffect(() => {
        try {
            setState({ ...state, loading: true });
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
            toast.error(error.message);
        }
    }, []);

    // const handlePreviewImage = (e) => {
    //     const file = e.target.files[0];
    //     file.preview = URL.createObjectURL(file);
    //     setImage(file);
    //     // e.target.value = null;
    // }

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            if (sizeChecked.length === 0) {
                toast.warn('Bạn chưa chọn size cho sản phẩm!');
                return;
            }
            if (colorChecked.length === 0) {
                toast.warn('Bạn chưa chọn màu sắc cho sản phẩm!');
                return;
            }

            let imageUrl = await handleUploadImage();

            if (imageUrl) {
                setState({ ...state, loading: true });
                async function createProduct() {
                    let data = {
                        ...product,
                        size: sizeChecked,
                        color: colorChecked,
                        image: imageUrl
                    }
                    let resCreate = await ProductService.createProduct(data);
                    if (resCreate.data) {
                        toast.success(`Thêm mới sản phẩm '${resCreate.data.name}' thành công`);
                        setState({
                            ...state,
                            loading: false,
                            product: {
                                name: '',
                                price: 0,
                                category_id: '1',
                                description: '',
                                image: 'https://chiinstore.com/media/product/2418_555088_105_946c7d0c61b74f2f94a1c0950956fa80_master.png'
                            }
                        })
                    }
                }
                createProduct();
            }

        } catch (error) {
            toast.error(error.message);
        }
        setSizeChecked([]);
        setColorChecked([]);
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

    const handleCheckSize = (size) => {
        setSizeChecked((pre) => {
            let result = pre.includes(size) ? pre.filter((item) => item !== size) : [...pre, size];
            return result;
        })
    }

    const handleCheckColor = (color) => {
        setColorChecked((pre) => {
            let result = pre.includes(color) ? pre.filter((item) => item !== color) : [...pre, color];
            return result;
        })
    }

    const handleSelectPhoto = (e) => {
        imageFile = e.target.files[0];
        let fakePhotoUrl = URL.createObjectURL(e.target.files[0]);
        setState({
            ...state,
            product: {
                ...product,
                image: fakePhotoUrl
            }
        })
    }

    async function handleUploadImage() {
        try {
            if (!imageFile) {
                toast.warn('Bạn chưa chọn hình ảnh nào!');
                return;
            }
            let uploadResult = await CloudinaryHelper.uploadImage(imageFile);
            if (uploadResult && uploadResult.data) {
                imageFile = null;
                toast.success('Upload hình ảnh thành công!');
                return uploadResult.data.url;
            }
            else {
                toast.error('Upload hình ảnh thất bại!');
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const { loading, product, categories } = state;
    const { name, price, category_id, description, image } = product;
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
                                                <input type="text" className="form-control" required
                                                    id="name"
                                                    name='name'
                                                    value={name || ""}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className='col-sm-12 row'>
                                        <div className='form-group mt-2 col-sm-6'>
                                            <label htmlFor='price' className="form-label">Giá bán:</label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" min='100000' required
                                                    id="price"
                                                    name='price'
                                                    value={price || 0}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='form-group mt-2 col-sm-6'>
                                            <label htmlFor='category_id' className="form-label">Loại:</label>
                                            <div className="col-sm-12">
                                                <select className='form-select'
                                                    id='category_id'
                                                    name='category_id'
                                                    value={category_id}
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
                                                                    value={item}
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
                                                                    value={item}
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
                                                    value={description}
                                                    onChange={handleChange}
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    {/* <div className='col-sm-12 row'>
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
                                    <hr /> */}
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
                                <div className="col-sm-5 d-flex flex-column align-items-center">

                                    <img className='mt-2 col-sm-12'
                                        role="button"
                                        src={
                                            image || 'https://chiinstore.com/media/product/2418_555088_105_946c7d0c61b74f2f94a1c0950956fa80_master.png'
                                        }
                                        alt=""
                                        onClick={() => document.querySelector('#fileUploadImage').click()}
                                    />
                                    <input type="file" accept="image/*" id="fileUploadImage" className="d-none"
                                        onChange={handleSelectPhoto}
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