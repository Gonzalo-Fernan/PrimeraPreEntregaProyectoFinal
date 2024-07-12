import { expect } from "chai";
import supertest from "supertest";
import __dirname from "../src/utils.js";

const requester = supertest("http://localhost:8080");

describe("Test Otherness", () =>{


describe("Test de Carritos", function(){
    it("El endpoint POST api/carts debe crear un carrito nuevo", async ()=>{
        const CartMock={
            user:"6619772634cd427128985545",
            products:{product: "65f70aaeb69c03224401512f", quantity: 2}

        }
        const {statusCode, ok, _body} = await requester.post("/api/carts").send(CartMock)
        console.log(statusCode);
        console.log(ok);
        console.log(_body);
        expect(_body.payload).to.have.property(_id)

    })
})






})