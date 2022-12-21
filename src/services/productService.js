import axios from "axios";
import { PRODUCT_API } from './../components/utils/Utils';

class ProductService {
    static getProducts() {
        return axios.get(PRODUCT_API);
    }
    static searchProducts(value) {
        return axios.get(PRODUCT_API + '?search=' + value);
    }
}

export default ProductService;