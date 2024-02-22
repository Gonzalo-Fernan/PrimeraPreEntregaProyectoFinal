import { error } from "console";
import fs from "fs";

export default class ProductManager {
  
    constructor (PATH, products = []){

        this.products = products
        this.PATH = PATH  

    }
    
    addProduct = async (newproduct) => {

        let data = JSON.parse(await fs.promises.readFile(this.PATH, "utf-8"))

        this.products = [...data]  

        let keys = Object.keys(newproduct)
        let values = Object.values(newproduct)
        let {code} = newproduct

        if (keys.length === 8){
    
            if (!this.products.some((prod) => prod.code === code)) {
                const product = {
                    id: this.generateID(),
                    title: values[0],
                    description: values[1],
                    price: values[2],
                    thumbnail: values[3],
                    code: values[4],
                    stock: values[5],
                    status: values[6],
                    category: values[7]
                }

                this.products.push(product)

                await fs.promises.writeFile(this.PATH, JSON.stringify(this.products, 2) + '\n', 'utf8')
              
                }else console.log(`operacion fallida el produto tiene un code ya existente, debe generar uno nuevo`) 
    
        }else{
            console.log("error, Debes ingresar todos los campos del productos");
        } 
    
    }
    
    generateID () {
        let id = 0
        if (this.products.length === 0) {
            id = 1
        }else{
            id = this.products[this.products.length - 1].id + 1 
        }
        return id
    }
    
    getProducts = async () => {
       let data = await fs.promises.readFile(this.PATH, "utf8")
       let products = JSON.parse(data) 
        return products
    
    }
    
    getProductById = async (id) => {
    
        let productsData =  JSON.parse(await fs.promises.readFile(this.PATH, "utf8"))
        let productFinded = await productsData.find((prod) => prod.id === id )

        if (!productFinded) {
           return console.log("Not found")
        }
        return productFinded
    
    }

    updateProduct = async (id, campo) => {
        let data = JSON.parse(await fs.promises.readFile(this.PATH, "utf8"))

        this.products = [...data]

        let isIdValid = data.some(prod => prod.id === id)
    
        if (isIdValid) {

            let productToUpdate = data.find((prod) => prod.id === id)

            let enteredField = Object.keys(campo)
            let enteredValue = Object.values(campo)
            let enteredFieldString = enteredField[0]
            let enteredValueData = enteredValue[0]
           
        
            let productToUpdateKeys = Object.keys(productToUpdate)

            if (productToUpdateKeys.includes(enteredFieldString)){
                
                productToUpdate[enteredFieldString] = enteredValueData

                let listUpdated = await fs.promises.writeFile(this.PATH, JSON.stringify(this.products))
                               
                return  listUpdated
            
            }else{

                productToUpdate[enteredFieldString] = enteredValueData

                let listUpdated = await fs.promises.writeFile(this.PATH, JSON.stringify(data))

                return listUpdated
            }
                 
            
        }else {
            console.log(error,"El id ingresado no existe")
        }
    }
    
    deleteProduct = async(id) => {
        let data = JSON.parse(await fs.promises.readFile(this.PATH, "utf-8"))

        this.products = [...data]  

        let isIdValid = this.products.some(prod => prod.id === id)
        
        if (isIdValid) {
            
            let data = await fs.promises.readFile(this.PATH, "utf8")
            
            let products = JSON.parse(data)
    
                let productToDelete = products.find((prod) => prod.id === id)
            
                let productToDeleteIndex = await products.findIndex((prod) => prod.id === id)
                    
                let newProducts = products.splice((productToDeleteIndex),1)
                    
                let listUpdated = fs.promises.writeFile(this.PATH, JSON.stringify(products, null))   
                    
                return products
        }else {
            console.log(error,`El id ${id} no existe en el documento de productos`);
        }
        
    }
}
