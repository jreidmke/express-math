const app = require('./app');
const request = require('supertest');

describe("GET /mean", () => {
    test("Returns mean of req.query nums", async() => {
        const resp = await request(app).get(`/mean/?nums=1,2,3,4`);
        expect(resp.statusCode).toBe(200);
        expect(resp.text).toEqual('2.5')
    })
})

describe("GET /median", () => {
    test("Return median of req.query nums", async() => {
        const resp = await request(app).get(`/median/?nums=1,2,3,4,5`);
        expect(resp.statusCode).toBe(200);
        expect(resp.text).toEqual('3');
    })
})

describe("GET /mode", () => {
    test("Rerturn mode of req.query nums", async() => {
        const resp = await request(app).get(`/mode/?nums=1,2,3,4,5,1`);
        expect(resp.statusCode).toBe(200);
        expect(resp.text).toEqual('1');
    })
})