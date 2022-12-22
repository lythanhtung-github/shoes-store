class Helper {
    static formatCurrency(number){
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(Number(number));
    }
}

export default Helper;