const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const db = require("../base-orm/sequelize-init");

let refreshTokens = [];

router.post("/api/login", async function (req, res) {
    const usuarios = await db.usuarios.findAll();
    
    const { usuario, clave } = req.body;
    const user = usuarios.find((u) => {
      return u.Nombre === usuario && u.Clave === clave;
    });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign(
            { usuario: user.Nombre, rol: user.Rol },
            auth.accessTokenSecret,
            { expiresIn: "20m" }
        );

        // Avanzado!
        const refreshToken = jwt.sign(
            { usuario: user.Nombre, rol: user.Rol },
            auth.refreshTokenSecret
        );

        refreshTokens.push(refreshToken);

        res.json({
            accessToken,
            refreshToken,
            message: "Bienvenido " + user.Nombre + "!",
        });
    } else {
        res.json({ message: "Usuario o clave incorrecto" });
    }
});

router.post("/api/logout", (req, res) => {
    let message = "Logout inválido!";
    const { token } = req.body;

    if (refreshTokens.includes(token)) {
        message = "Usuario deslogueado correctamente!";
    }

    refreshTokens = refreshTokens.filter((t) => t !== token);

    res.json({ message });
});

router.post("/api/token", (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403);
    }

    jwt.verify(refreshToken, auth.refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign(
            { usuario: user.Nombre, rol: user.Rol },
            auth.accessTokenSecret,
            { expiresIn: "20m" }
        );

        res.json({
            accessToken,
        });
    });
});

module.exports = router;