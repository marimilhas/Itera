const express = require('express');
const router = express.Router();
const { ValidationError, Op } = require("sequelize");
const db = require("../base-orm/sequelize-init");
const auth = require("../middleware/auth");

router.get("/api/ciclos", async function (req, res) {
    let where = {};

    // Filtrado opcional por idProyecto, plan, etc.
    if (req.query.idProyecto != undefined && req.query.idProyecto !== "") {
        where.idProyecto = req.query.idProyecto;
    }
    if (req.query.plan != undefined && req.query.plan !== "") {
        where.plan = { [Op.like]: "%" + req.query.plan + "%" };
    }
    if (req.query.do != undefined && req.query.do !== "") {
        where.do = { [Op.like]: "%" + req.query.do + "%" };
    }
    if (req.query.check != undefined && req.query.check !== "") {
        where.check = { [Op.like]: "%" + req.query.check + "%" };
    }
    if (req.query.act != undefined && req.query.act !== "") {
        where.act = { [Op.like]: "%" + req.query.act + "%" };
    }
    if (req.query.activo != undefined && req.query.activo !== "") {
        where.activo = req.query.activo === "true";
    }

    if (!req.query.pagina) {
        const { count, rows } = await db.Ciclo.findAndCountAll({
            attributes: ["id", "idProyecto", "plan", "do", "check", "act", "fechaCreacion", "activo"],
            order: [["id", "ASC"]],
            where
        });
        return res.json({ Ciclos: rows, RegistrosTotal: count });
    }

    const pagina = parseInt(req.query.pagina);
    const tamañoPagina = 10;
    const { count, rows } = await db.Ciclo.findAndCountAll({
        attributes: ["id", "idProyecto", "plan", "do", "check", "act", "fechaCreacion", "activo"],
        order: [["id", "ASC"]],
        where,
        offset: (pagina - 1) * tamañoPagina,
        limit: tamañoPagina,
    });

    return res.json({ Ciclos: rows, RegistrosTotal: count });
});

router.get("/api/ciclos/:id", auth.authenticateJWT, async function (req, res) {
    const { rol } = res.locals.user;
    if (rol !== "admin") {
        return res.status(403).json({ message: "Usuario no autorizado" });
    }

    try {
        let data = await db.Ciclo.findOne({
            attributes: ["id", "idProyecto", "plan", "do", "check", "act", "fechaCreacion", "activo"],
            where: { id: req.params.id },
        });

        if (!data) {
            res.status(404).json({ message: "Ciclo no encontrado" });
            return;
        }

        res.status(200).json(data);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/api/ciclos", auth.authenticateJWT, async (req, res) => {
    const { rol } = res.locals.user;
    if (rol !== "admin") {
        return res.status(403).json({ message: "Usuario no autorizado" });
    }

    try {
        let data = await db.Ciclo.create({
            idProyecto: req.body.idProyecto,
            plan: req.body.plan,
            do: req.body.do,
            check: req.body.check,
            act: req.body.act,
            fechaCreacion: req.body.fechaCreacion,
            activo: req.body.activo
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

router.put("/api/ciclos/:id", auth.authenticateJWT, async (req, res) => {
    const { rol } = res.locals.user;
    if (rol !== "admin") {
        return res.status(403).json({ message: "Usuario no autorizado" });
    }

    try {
        let data = await db.Ciclo.findOne({
            attributes: ["id", "idProyecto", "plan", "do", "check", "act", "fechaCreacion", "activo"],
            where: { id: req.params.id },
        });

        if (!data) {
            res.status(404).json({ message: "Ciclo no encontrado" });
            return;
        }

        data.idProyecto = req.body.idProyecto;
        data.plan = req.body.plan;
        data.do = req.body.do;
        data.check = req.body.check;
        data.act = req.body.act;
        data.fechaCreacion = req.body.fechaCreacion;
        data.activo = req.body.activo;

        await data.save();

        res.status(200).json({ message: "Ciclo actualizado" });

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

router.delete("/api/ciclos/:id", auth.authenticateJWT, async (req, res) => {
    const { rol } = res.locals.user;
    if (rol !== "admin") {
        return res.status(403).json({ message: "Usuario no autorizado" });
    }

    try {
        let filasBorradas = await db.Ciclo.destroy({
            where: { id: req.params.id },
        });

        if (filasBorradas == 1) {
            res.status(200).json({ message: "Ciclo eliminado correctamente" });
        } else {
            res.status(404).json({ message: "Ciclo no encontrado" });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
