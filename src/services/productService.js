import axios from "axios";
import { PRODUCT_API } from './../components/utils/Utils';

class ProductService {
    static getProducts() {
        return axios.get(PRODUCT_API);
    }
}

export default ProductService;