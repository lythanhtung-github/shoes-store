import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Loader from '../Loader/Loader';
import CategoryService from './../../services/categoryService';

const sizes = [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
const colors = ['Red', 'Green', 'Yellow', 'Blue', 'Magenta', 'Brown', 'Cyan', 'White'];

function ProductCreate() {
    const [image, setImage] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function getData() {
            let resCategories = await CategoryService.getCategories();
            setCategories(resCategories.data);
        }
        getData();
    }, []);

    const handlePreviewImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage(file);
        // e.target.value = null;
    }

    return (
        <div className='container'>
            <div className='row mt-2'>
                <h2>THÊM MỚI SẢN PHẨM</h2>
            </div>
            <div className='row'>
                <form>
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
                                        // value={name || ""}
                                        // onChange={handleChange}
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
                                        // onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className='form-group mt-2 col-sm-6'>
                                    <label htmlFor='category' className="form-label">Loại:</label>
                                    <div className="col-sm-12">
                                        <select className='form-select'
                                            id='category'
                                            name='category'
                                        // value={provinceId}
                                        // onChange={(e) => handleSetProvinceId(e)}
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
                                    <label htmlFor='gender' className="form-label">Size:</label>
                                    <div className='col-sm-12 row d-flex justify-content-start'>
                                        {
                                            sizes.map(item => (
                                                <div className='col-md-2' key={item}>
                                                    <div className="form-check">
                                                        <input className="form-check-input"
                                                            type="checkbox"
                                                            id={item}
                                                        // checked={hobbit.includes(item.id)}
                                                        // onChange={() => handleCheck(item.id)}
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
                                            className='form-control'
                                            rows="4"
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
                            <button type="submit" className="btn btn-success">
                                <i className="fa fa-plus" aria-hidden="true"></i> Thêm mới
                            </button>
                        </div>
                        <div className="col-sm-5">
                            <img
                                className='mt-2 col-sm-12'
                                src={
                                    image ? image.preview : 'https://static.nike.com/a/images/t_default/834dfe1c-bbe2-443e-8412-58d429a68eb7/air-jordan-1-zoom-air-comfort-shoes-DMnp24.png'
                                }
                                alt=""
                                id='productImage'
                                name='productImage'
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductCreate;