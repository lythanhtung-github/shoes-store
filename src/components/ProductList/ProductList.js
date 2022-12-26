import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import Loader from '../Loader/Loader';
import { toast } from "react-toastify";
import ProductService from './../../services/productService';
import CategoryService from './../../services/categoryService';
import Helper from '../utils/Helper';
import './product-list.css';
import CloudinaryHelper from './../utils/CloudinaryHelper';

function ProductList() {
    const [state, setState] = useState({
        loading: false,
        products: [],
        categories: [],
        errorMessage: ""
    });

    const [keyword, setKeyword] = useState("");
    const [categoryId, setCategoryId] = useState(0);

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

    const handleSearch = async (e) => {
        e.preventDefault();
        setCategoryId(e.target[0].value);
        console.log(categoryId)
        setState({ ...state, loading: true });
        let resProducts = await ProductService.getProducts();
        categoryId == "0" ?
            setState({
                ...state,
                loading: false,
                products: resProducts.data.filter((item) => item.name.toUpperCase().includes(keyword.toUpperCase()))
            }) :
            setState({
                ...state,
                loading: false,
                products: resProducts.data.filter((item) => item.category_id === categoryId && item.name.toUpperCase().includes(keyword.toUpperCase()))
            })
    }

    const handleCategoryChange = async (e) => {
        setCategoryId(e.target.value);
        let categoryId = e.target.value;
        setState({ ...state, loading: true });
        let resProducts = await ProductService.getProducts();
        categoryId == "0" ?
            setState({
                ...state,
                loading: false,
                products: resProducts.data.filter((item) => item.name.toUpperCase().includes(keyword.toUpperCase()))
            }) :
            setState({
                ...state,
                loading: false,
                products: resProducts.data.filter((item) => item.category_id === categoryId && item.name.toUpperCase().includes(keyword.toUpperCase()))
            })
    }

    const getCategoryName = (categoryId) => {
        let category = categories.find((cat) => cat.id === categoryId);
        return category ? category.name : '';
    }

    const handleDelete = (product) => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý, xóa liền tay'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setState({ ...state, loading: true });
                await CloudinaryHelper.destroyImage(Helper.getFilename(product.image));
                let resRemove = await ProductService.removeProduct(product.id);
                if (resRemove.data) {
                    let resProducts = await ProductService.getProducts();
                    setState({
                        ...state,
                        loading: false,
                        products: resProducts.data
                    })
                }
                toast.success(`Xóa thành công!`);
            }
        })
    }

    const { loading, products, categories } = state;
    return (
        <>
            <section className='product-info'>
                <div className='container'>
                    <div className='row mt-4'>
                        <h2 className='text-center'>PRODUCTS LIST</h2>
                        <hr />
                    </div>
                    <div className='row'>
                        <div className='col-md-4'>
                            <Link to={"/shoes-store/products/create"}
                                className='btn btn-success'>
                                <i className="fa-solid fa-plus"></i>
                                <span className='ms-2'>Add new product</span>
                            </Link>
                        </div>
                        <form onSubmit={handleSearch}
                            className="col-md-8 d-flex justify-content-center"
                        >
                            <div className='col-md-6'>
                                <div className='form-group d-flex align-items-center'>
                                    <label htmlFor='categoryId' className="form-label me-2">Loại:</label>
                                    <div className="col-sm-8">
                                        <select className='form-select'
                                            id='categoryId'
                                            name='categoryId'
                                            value={categoryId}
                                            onInput={handleCategoryChange}
                                        >
                                            <option value="0">All</option>
                                            {
                                                categories.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 d-flex'>

                                <input type="search"
                                    className="form-control form-control-dark rounded-0 rounded-start"
                                    placeholder="Search..."
                                    aria-label="Search"
                                    value={keyword}
                                    onInput={(e) => setKeyword(e.target.value)}
                                />
                                <button type="submit" className="btn btn-primary rounded-0 rounded-end">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>

                            </div>
                        </form>
                    </div>
                    <div className='row my-2'>

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
                                                <p className="fst-italic text-white my-0">{product.description}</p>
                                            </div>
                                            {/* <p className='text-white my-0'>{getCategoryName(product.category_id)}</p> */}
                                            <div className="category">
                                                <h6 className='text-white'>{getCategoryName(product.category_id)}
                                                </h6>
                                            </div>
                                            <div className="price d-flex align-items-center">
                                                <h3>Price :</h3>
                                                <h3 className="text-yellow">{
                                                    Helper.formatCurrency(product.price)
                                                }
                                                </h3>
                                            </div>
                                            <div className="size">
                                                <h3>Size :</h3>
                                                <div className='row'>
                                                    {
                                                        product.size.map((item) => (
                                                            <span className='display-6' key={item}
                                                            >{item}</span>
                                                        ))
                                                    }
                                                </div>

                                            </div>
                                            <div className="color">
                                                <h3 className='mb-2'>Color :</h3>
                                                {
                                                    product.color.map((item) => (
                                                        <span key={item}
                                                            style={{ backgroundColor: item }}
                                                        ></span>
                                                    ))
                                                }
                                            </div>
                                            <Link className='btn btn-sm btn-primary view'
                                                to={`/shoes-store/products/view/${product.id}`}
                                            >
                                                <i className="fa-regular fa-eye"></i>
                                            </Link>
                                            <Link className='btn btn-sm btn-success edit'
                                                 to={`/shoes-store/products/edit/${product.id}`}
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </Link>
                                            <button
                                                className='btn btn-sm btn-danger delete'
                                                onClick={() => handleDelete(product)}
                                            >
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
                <hr />
            </section>


        </>

    )
}

export default ProductList;