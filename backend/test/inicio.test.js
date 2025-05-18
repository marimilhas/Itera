const request = require("supertest");
const app = require("../index");

describe("GET /", () => {
    it("Debería devolver Backend inicial!", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual("Backend inicial!");
    });
});

describe("GET _isalive", () => {
    it("Deberia devolver ejecutándose desde...", async () => {
        const res = await request(app).get("/_isalive");
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain("Ejecutándose desde:");
    });
});

describe("GET 404", () => {
    it("Debería devolver error 404 y su texto apropiado", async () => {
        const res = await request(app).get("/urlinexistente");
        expect(res.statusCode).toEqual(404);
        expect(res.text).toEqual("URL no encontrada!");
    });
});
