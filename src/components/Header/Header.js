import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="mb-2 mb-lg-0 text-white text-decoration-none me-4">
                        <i className="fa-solid fa-shop">Shoes Shop</i>
                    </a>
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><a href="/" className="nav-link px-2 text-white">Hàng mới</a></li>
                        <li><a href="/" className="nav-link px-2 text-white">Bán chạy</a></li>
                        <li><a href="/" className="nav-link px-2 text-white">Tin tức</a></li>
                        <li><a href="/" className="nav-link px-2 text-white">Giới thiệu</a></li>
                    </ul>
                    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 d-flex">
                        <input type="search" className="form-control form-control-dark" placeholder="Bạn muốn tìm gì..." aria-label="Search" />
                        <button type="button" className="btn btn-outline-warning col-4 ms-2">Tìm kiếm</button>
                    </form>
                </div>
            </div>
        </header>
    )
};

export default Header;