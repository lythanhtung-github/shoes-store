import axios from "axios";
import { PRODUCT_API } from './../components/utils/Utils';

class ProductService {
    static getProducts() {
        return axios.get(PRODUCT_API);
    }
    static createProduct(product) {
        return axios.post(PRODUCT_API, product);
    }
    static removeProduct(productId) {
        return axios.delete(`${PRODUCT_API}/${productId}`);
    }
    static searchProducts(value) {
        return axios.get(PRODUCT_API + '?search=' + value);
    }
}

export default ProductService;