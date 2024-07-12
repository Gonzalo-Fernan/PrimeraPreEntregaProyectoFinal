import { expect } from "chai";
import supertest from "supertest";
import __dirname from "../src/utils.js";

const requester = supertest("http://localhost:8080");

describe("Test Otherness", () =>{


describe("Test de Productos", function(){
    it("El endpoint POST api/products debe crear un producto nuevo", async ()=>{
        const ProductMock={
            title: "test Title",
            description: 'This is an example product',
            code: 62637,
            price: 3000,
            status: true,
            thumbnails: "test.com/test",
            stock: 10,
            category: "maquina",
            owner: "admin"
        }
        const {statusCode, ok, _body} = await requester.post("/api/products").send(ProductMock)
        console.log(statusCode);
        console.log(ok);
        console.log(_body);
        expect(_body.payload).to.have.property(_id)

    })
})






})