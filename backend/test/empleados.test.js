const request = require("supertest");
const app = require("../index");

const empleadoAlta = {
    Nombre: "Mariana",
    Apellido: "Milhas",
    CorreoElectronico: "marimilhas@gmail.com",
    FechaContratacion: "2024-06-10",
    Sueldo: 400000.00,
    Activo: true
};

const empleadoModificacion = {
    Nombre: "Pablo",
    Apellido: "Garcia",
    CorreoElectronico: "pablogarcia@email.com",
    FechaContratacion: "2024-06-11",
    Sueldo: 5000.00,
    Activo: true
};

describe("GET /api/empleados", function () {
    it("Debería devolver todos los empleados", async function () {
        const res = await request(app)
            .get("/api/empleados")
            .set("content-type", "application/json");
        expect(res.headers["content-type"]).toEqual(
            "application/json; charset=utf-8"
        );
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    IdEmpleado: expect.any(Number),
                    Nombre: expect.any(String),
                    Apellido: expect.any(String),
                    CorreoElectronico: expect.any(String),
                    FechaContratacion: expect.any(String),
                    Sueldo: expect.any(Number),
                    Activo: expect.any(Boolean)
                })
            ])
        );
    });
});

describe("GET /api/empleados/:id", function () {
    it("Debería devolver el empleado con el id 1", async function () {
        const res = await request(app)
            .get("/api/empleados/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdEmpleado: expect.any(Number),
                Nombre: expect.any(String),
                Apellido: expect.any(String),
                CorreoElectronico: expect.any(String),
                FechaContratacion: expect.any(String),
                Sueldo: expect.any(Number),
                Activo: expect.any(Boolean)
            })
        );
    });
});

describe("POST /api/empleados", () => {  
    it("Deberia devolver el empleado que acabo de crear", async () => {
        const res = await request(app).post("/api/empleados").send(empleadoAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdEmpleado: expect.any(Number),
                Nombre: expect.any(String),
                Apellido: expect.any(String),
                CorreoElectronico: expect.any(String),
                FechaContratacion: expect.any(String),
                Sueldo: expect.any(Number),
                Activo: expect.any(Boolean)
            })
        );
    });
});

// aclaración POST -> si ejecuto dos o más veces seguidas el test con el mismo empleadoAlta da error pq se repetiría el mail en la tabla

describe("PUT /api/empleados/:id", () => {
    it("Deberia devolver el mensaje 'Empleado actualizado'", async () => {
        const res = await request(app)
            .put("/api/empleados/15")
            .send(empleadoModificacion);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: "Empleado actualizado" });
    });
});

describe("DELETE /api/empleados/:id", () => {
    it("Debería devolver el mensaje ''Activo' actualizado correctamente'", async () => {
        const res = await request(app).delete("/api/empleados/16");
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