const express = require('express');
const router = express.Router();
const { ValidationError, Op } = require("sequelize");
const db = require("../base-orm/sequelize-init");
const auth = require("../middleware/auth");

router.get("/api/proyectos", async function (req, res) {
    let where = { activo: true };

    if (req.query.nombre != undefined && req.query.nombre !== "") {
        where.nombre = {
            [Op.like]: "%" + req.query.nombre + "%",
        };
    }

    if (!req.query.pagina) {
        const { count, rows } = await db.Proyecto.findAndCountAll({
            attributes: ["id", "nombre", "descripcion"],
            order: [["id", "ASC"]],
            where,
        });
        return res.json({ Proyectos: rows, RegistrosTotal: count });
    }

    const pagina = parseInt(req.query.pagina);
    const tamañoPagina = 10;
    const { count, rows } = await db.Proyecto.findAndCountAll({
        attributes: ["id", "nombre", "descripcion"],
        order: [["id", "ASC"]],
        where,
        offset: (pagina - 1) * tamañoPagina,
        limit: tamañoPagina,
    });

    return res.json({ Proyectos: rows, RegistrosTotal: count });
});

router.get("/api/proyectos/:id", auth.authenticateJWT, async function (req, res) {
    const { rol } = res.locals.user;
    if (rol !== "admin") {
        return res.status(403).json({ message: "Usuario no autorizado" });
    }

    try {
        let data = await db.Proyecto.findOne({
            attributes: ["id", "nombre", "descripcion"],
            where: { id: req.params.id, activo: true },
        });

        if (!data) {
            res.status(404).json({ message: "Proyecto no encontrado" });
            return;
        }

        res.status(200).json(data);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/api/proyectos", auth.authenticateJWT, async (req, res) => {
    const { rol } = res.locals.user;
    if (rol !== "admin") {
        return res.status(403).json({ message: "Usuario no autorizado" });
    }

    try {
        let data = await db.Proyecto.create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            activo: true, // nuevo campo
        });

        res.status(200).json(data.dataValues);

    } catch (err) {
        if (err instanceof ValidationError) {
            let messages = '';
            err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
            res.status(400).json({ message: messages });
        } else {
            throw err;
        }
    }
});

router.put("/api/proyectos/:id", auth.authenticateJWT, async (req, res) => {
    const { rol } = res.locals.user;
    if (rol !== "admin") {
        return res.status(403).json({ message: "Usuario no autorizado" });
    }

    try {
        let data = await db.Proyecto.findOne({
            attributes: ["id", "nombre", "descripcion"],
            where: { id: req.params.id, activo: true },
        });

        if (!data) {
            res.status(404).json({ message: "Proyecto no encontrado" });
            return;
        }

        data.nombre = req.body.nombre;
        data.descripcion = req.body.descripcion;

        await data.save();

        res.status(200).json({ message: "Proyecto actualizado" });

    } catch (err) {
        if (err instanceof ValidationError) {
            let messages = '';
            err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
            res.status(400).json({ message: messages });
        } else {
            throw err;
        }
    }
});

router.delete("/api/proyectos/:id", auth.authenticateJWT, async (req, res) => {
    const { rol } = res.locals.user;
    if (rol !== "admin") {
        return res.status(403).json({ message: "Usuario no autorizado" });
    }

    try {
        let data = await db.Proyecto.findOne({
            where: { id: req.params.id, activo: true },
        });

        if (!data) {
            res.status(404).json({ message: "Proyecto no encontrado" });
            return;
        }

        data.activo = false;
        await data.save();

        res.status(200).json({ message: "Proyecto eliminado correctamente" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
