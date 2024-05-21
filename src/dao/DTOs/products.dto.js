export default class ProductsDTO {
    constructor(){
        
    }
    get (product) {
        const newProduct ={title: product.title,
                        description: product.description,
                        code: product.code,
                        price:product.price,
                        status: product.status,
                        stock: product.stock,
                        thumbnail: product.thumbnail,
                        category: product.category
                    }
        return newProduct
    }
}