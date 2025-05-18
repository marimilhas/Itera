const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./data/pdca.db");

// Modelo de datos para la tabla 'usuarios'
const usuarios = sequelize.define(
    "usuarios",
    {
        IdUsuario: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Este nombre ya existe en la tabla"
            },
            validate: {
                notNull: {
                    args: true,
                    msg: "El nombre es requerido",
                },
                len: {
                    args: [3, 15],
                    msg: "El nombre debe ser tipo caracteres, entre 3 y 15 de longitud",
                },
            },
        },
        Clave: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "La clave es requerida",
                },
                len: {
                    args: [3, 15],
                    msg: "La clave debe ser tipo caracteres, entre 3 y 15 de longitud",
                },
            },
        },
        Rol: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "El rol es requerido",
                },
                len: {
                    args: [3, 15],
                    msg: "El rol debe ser tipo caracteres, entre 5 y 15 de longitud",
                },
            },
        },
    },
    {
        timestamps: false,
    }
);

// Modelo de datos para la tabla 'Proyecto'
const Proyecto = sequelize.define(
    "Proyecto",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "El nombre es requerido",
                },
                len: {
                    args: [5, 50],
                    msg: "El nombre debe ser tipo caracteres, entre 5 y 50 de longitud",
                },
            },
        },
        descripcion: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "La descripción es requerida",
                },
                len: {
                    args: [10, 100],
                    msg: "La descripcion debe ser tipo caracteres, entre 10 y 100 de longitud",
                },
            },
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    },
    {
        tableName: 'Proyecto',
        timestamps: false,
    }
);

// Modelo de datos para la tabla 'Ciclo'
const Ciclo = sequelize.define(
    "Ciclo",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idProyecto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Proyecto,
                key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
            validate: {
                notNull: {
                    args: true,
                    msg: "El id del proyecto es requerido"
                }
            }
        },
        numeroCiclo: {
            type: DataTypes.INTEGER
        },
        plan: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        do: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        check: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        act: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    },
    {
        tableName: 'Ciclo',
        timestamps: false,
    }
);

// Relación 1:N entre ciclos y proyectos
Proyecto.hasMany(Ciclo, { foreignKey: 'idProyecto', sourceKey: 'id' });
Ciclo.belongsTo(Proyecto, { foreignKey: 'idProyecto', targetKey: 'id' });

module.exports = {
    sequelize,
    usuarios,
    Proyecto,
    Ciclo,
};
