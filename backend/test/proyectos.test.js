const request = require("supertest");
const app = require("../index");

const proyectoAlta = {
    Nombre: "Plataforma de E-learning para Idiomas",
    Descripcion: "Desarrollo de una plataforma de e-learning para el aprendizaje de idiomas.",
    FechaInicio: "2023-11-20",
    FechaFin: null,
    Activo: true,
    Presupuesto: 28000.00
};

const proyectoModificacion = {
    IdProyecto: 1,
    Nombre: "Sistema de Gestión de Ventas",
    Descripcion: "Desarrollo de un sistema integral y avanzado para la gestión de ventas en línea.",
    FechaInicio: "2023-01-10",
    FechaFin: "2024-12-31",
    Activo: true,
    Presupuesto: 28000.00
};

describe("GET /api/proyectos", () => {
    it("Debería devolver todos los proyectos", async () => {
        const res = await request(app)
            .get("/api/proyectos")
            .set("content-type", "application/json");
        expect(res.headers["content-type"]).toEqual(
            "application/json; charset=utf-8"
        );
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    IdProyecto: expect.any(Number),
                    Nombre: expect.any(String),
                    Descripcion: expect.any(String),
                    FechaInicio: expect.any(String),
                    FechaFin: expect.any(String),
                    Activo: expect.any(Boolean),
                    Presupuesto: expect.any(Number)
                })
            ])
        );
    });
});

// NO ESTÁ ANDANDO
describe("GET /api/proyectos/:id", () => {
    it("Debería devolver el proyecto con el id 1", async () => {
        const res = await request(app)
            .get("/api/proyectos/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdProyecto: expect.any(Number),
                Nombre: expect.any(String),
                Descripcion: expect.any(String),
                FechaInicio: expect.any(String),
                FechaFin: expect.any(String),
                Activo: expect.any(Boolean),
                Presupuesto: expect.any(Number)
            })
        );
    });
});

// NO ESTÁ ANDANDO
describe("POST /api/proyectos", () => {
    it("Deberia devolver el proyecto que acabo de crear", async () => {
        const res = await request(app).post("/api/proyectos").send(proyectoAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdProyecto: expect.any(Number),
                Nombre: expect.any(String),
                Descripcion: expect.any(String),
                FechaInicio: expect.any(String),
                FechaFin: expect.any(String),  
                Activo: expect.any(Boolean),   
                Presupuesto: expect.any(Number)
            })
        );
    });
});

describe("PUT /api/proyectos/:id", () => {
    it("Deberia devolver el mensaje 'Proyecto actualizado'", async () => {
        const res = await request(app)
            .put("/api/proyectos/1")
            .send(proyectoModificacion);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: "Proyecto actualizado" });
    });
});

describe("DELETE /api/proyectos/:id", () => {
    it("Debería devolver el mensaje ''Activo' actualizado correctamente'", async () => {
        const res = await request(app).delete("/api/proyectos/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: "'Activo' actualizado correctamente" });
    });
});

// en caso de que hagamos el GET completo (MOFICAR CÓDIGO)
// describe("GET /api/proyectos", () => {
//     it("Deberia devolver todos los artículos paginados", async () => {
//         const res = await request(app).get("/api/articulos?Pagina=1");
//         expect(res.statusCode).toEqual(200);

//         expect(res.body).toEqual(
//             expect.objectContaining({
//                 Items: expect.arrayContaining([
//                     expect.objectContaining({
//                         IdArticulo: expect.any(Number),
//                         Nombre: expect.any(String),
//                         Precio: expect.any(Number),
//                         Stock: expect.any(Number),
//                         FechaAlta: expect.any(String),
//                         Activo: expect.any(Boolean)
//                     }),
//                 ]),
//                 RegistrosTotal: expect.any(Number),
//             })
//         );
//     });
// });

// describe("GET /api/articulos con filtros", () => {
//     it("Deberia devolver los articulos según filtro ", async () => {
//         const res = await request(app).get("/api/articulos?Nombre=AIRE&Activo=true&Pagina=1");
//         expect(res.statusCode).toEqual(200);

//         expect(verificarPropiedades(res.body.Items)).toEqual(true);

//         function verificarPropiedades(array) {
//             for (let i = 0; i < array.length; i++) {
//                 if (!array[i].Nombre.includes("AIRE") || !array[i].Activo) {
//                     return false;
//                 }
//             }
//             return true;
//         }

//     });
// });