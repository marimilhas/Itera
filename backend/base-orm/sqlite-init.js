const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
    await db.open("./data/pdca.db");

    /*
    // Tabla usuarios (para seguridad)
    let existe = false;
    let res = null;

    res = await db.get(
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'usuarios'",
        []
    );

    if (res.contar > 0) existe = true;

    if (!existe) {
        await db.run(
            "CREATE table usuarios" +
            "(IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "Nombre text NOT NULL UNIQUE, " +
            "Clave text NOT NULL, " +
            "Rol text NOT NULL);"
        );

        console.log("Tabla 'usuarios' creada!");

        await db.run(
            "INSERT INTO usuarios (Nombre, Clave, Rol) " +
            "VALUES" +
            "('admin', '123', 'admin'), " +
            "('mari', '123', 'empleado');"
        );
    }

    // Tabla empleados
    existe = false;

    res = await db.get(
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'empleados'",
        []
    );

    if (res.contar > 0) {
        existe = true;
    }

    if (!existe) {
        await db.run(
            "CREATE TABLE empleados" +
            "(IdEmpleado INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "Nombre TEXT NOT NULL, " +
            "Apellido TEXT NOT NULL, " +
            "CorreoElectronico TEXT NOT NULL UNIQUE, " +
            "FechaContratacion DATE NOT NULL, " +
            "Sueldo DECIMAL(10, 2)," +
            "Activo BOOLEAN NOT NULL);"
        );

        console.log("Tabla 'empleados' creada!");

        await db.run(
            "INSERT INTO empleados (Nombre, Apellido, CorreoElectronico, FechaContratacion, Sueldo, Activo)" +
            "VALUES" +
            "('Juan', 'Pérez', 'juan.perez@email.com', '2023-01-15', 2500.00, 1)," +
            "('María', 'González', 'maria.gonzalez@email.com', '2023-02-28', 2800.00, 1)," +
            "('Carlos', 'López', 'carlos.lopez@email.com', '2022-12-10', 3000.00, 1)," +
            "('Ana', 'Martínez', 'ana.martinez@email.com', '2023-03-05', 2600.00, 1)," +
            "('Pedro', 'Sánchez', 'pedro.sanchez@email.com', '2023-04-20', 2700.00, 1)," +
            "('Laura', 'Rodríguez', 'laura.rodriguez@email.com', '2023-05-15', 2900.00, 1)," +
            "('Sergio', 'Hernández', 'sergio.hernandez@email.com', '2023-06-30', 3100.00, 1)," +
            "('Marta', 'Díaz', 'marta.diaz@email.com', '2023-07-10', 2800.00, 1)," +
            "('David', 'Gómez', 'david.gomez@email.com', '2023-08-25', 2700.00, 1)," +
            "('Elena', 'Pérez', 'elena.perez@email.com', '2023-09-05', 3000.00, 1)," +
            "('Javier', 'Ruiz', 'javier.ruiz@email.com', '2023-10-15', 3200.00, 1)," +
            "('Isabel', 'Fernández', 'isabel.fernandez@email.com', '2023-11-20', 2900.00, 1)," +
            "('Luis', 'Torres', 'luis.torres@email.com', '2023-12-01', 2800.00, 1)," +
            "('Carmen', 'López', 'carmen.lopez@email.com', '2024-01-10', 3000.00, 1)," +
            "('Pablo', 'García', 'pablo.garcia@email.com', '2024-02-15', 3100.00, 1);"
        );
    }

    // Tabla proyectos
    existe = false;

    res = await db.get(
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'proyectos'",
        []
    );

    if (res.contar > 0) {
        existe = true;
    }

    if (!existe) {
        await db.run(
            "CREATE TABLE proyectos " +
            "(IdProyecto INTEGER PRIMARY KEY AUTOINCREMENT," +
            "Nombre TEXT NOT NULL," +
            "Descripcion TEXT NOT NULL," +
            "FechaInicio DATE NOT NULL," +
            "FechaFin DATE," +
            "Presupuesto DECIMAL(12, 2)," +
            "Activo BOOLEAN NOT NULL," +
            "CONSTRAINT chk_fechas CHECK(FechaFin IS NULL OR FechaFin >= FechaInicio));"
        )

        console.log("Tabla 'proyectos' creada!");

        await db.run(
            "INSERT INTO proyectos (Nombre, Descripcion, FechaInicio, FechaFin, Presupuesto, Activo)" +
            "VALUES" +
            "('Sistema de Gestión de Ventas', 'Desarrollo de un sistema para la gestión de ventas en línea.', '2023-01-10', NULL, 25000.00, 1)," +
            "('Plataforma Educativa Online', 'Desarrollo de una plataforma educativa para cursos en línea.', '2023-02-15', '2023-07-30', 35000.00, 1)," +
            "('Aplicación de Gestión de Proyectos', 'Desarrollo de una aplicación para la gestión de proyectos internos.', '2023-03-20', '2023-09-15', 30000.00, 1)," +
            "('Sistema de Recursos Humanos', 'Desarrollo de un sistema para la gestión de recursos humanos.', '2023-04-05', NULL, 28000.00, 1)," +
            "('Plataforma de Telemedicina', 'Desarrollo de una plataforma para consultas médicas en línea.', '2023-05-10', '2023-11-30', 40000.00, 1)," +
            "('Aplicación Móvil de Compras', 'Desarrollo de una aplicación móvil para compras en línea.', '2023-06-15', NULL, 32000.00, 1)," +
            "('Sistema de Gestión de Inventarios', 'Desarrollo de un sistema para la gestión de inventarios de almacén.', '2023-07-20', '2024-01-15', 28000.00, 1)," +
            "('Plataforma de Streaming de Video', 'Desarrollo de una plataforma para streaming de video en línea.', '2023-08-05', NULL, 35000.00, 1)," +
            "('Sistema de Reservas de Hoteles', 'Desarrollo de un sistema para reservas de hoteles en línea.', '2023-09-10', '2024-03-30', 30000.00, 1)," +
            "('Aplicación de Gestión de Finanzas Personales', 'Desarrollo de una aplicación para la gestión de finanzas personales.', '2023-10-15', '2024-04-15', 32000.00, 1);"
        );
    }

    // Tabla asignaciones
    existe = false;
    res = await db.get(
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'asignaciones'",
        []
    );

    if (res.contar > 0) {
        existe = true;
    }

    if (!existe) {
        await db.run(
          "CREATE TABLE asignaciones" +
            "(IdAsignacion INTEGER PRIMARY KEY AUTOINCREMENT," +
            "IdProyecto INTEGER NOT NULL," +
            "IdEmpleado INTEGER NOT NULL," +
            "Rol TEXT NOT NULL," +
            "FechaAsignacion DATE," +
            "Activo BOOLEAN NOT NULL," +
            "FOREIGN KEY(IdProyecto) REFERENCES proyectos(IdProyecto) ON UPDATE CASCADE ON DELETE RESTRICT," +
            "FOREIGN KEY(IdEmpleado) REFERENCES empleados(IdEmpleado) ON UPDATE CASCADE ON DELETE RESTRICT);"
        );

        console.log("Tabla 'asignaciones' creada!")

        await db.run(
            "INSERT INTO asignaciones (IdProyecto, IdEmpleado, Rol, FechaAsignacion, Activo)" +
            "VALUES" +
            "(1, 1, 'Líder de Desarrollo', '2023-01-10', 1)," +
            "(2, 2, 'Desarrollador Frontend', '2023-02-15', 1)," +
            "(3, 3, 'Gerente de Proyecto', '2023-03-20', 1)," +
            "(4, 4, 'Especialista en Seguridad', '2023-04-05', 1)," +
            "(5, 5, 'Diseñador UX/UI', '2023-05-10', 1)," +
            "(6, 6, 'Desarrollador Backend', '2023-06-15', 1)," +
            "(7, 7, 'Ingeniero de Software', '2023-07-20', 1)," +
            "(8, 8, 'Administrador de Bases de Datos', '2023-08-05', 1)," +
            "(9, 9, 'Analista Funcional', '2023-09-10', 1)," +
            "(10, 10, 'QA Tester', '2023-10-15', 1)," +
            "(1, 11, 'Desarrollador Backend', '2023-02-25', 1)," +
            "(2, 12, 'Especialista en Seguridad', '2023-08-20', 1)," +
            "(3, 13, 'Desarrollador Mobile', '2023-06-25', 1)," +
            "(4, 14, 'Coordinador de Proyectos', '2023-03-25', 1)," +
            "(5, 15, 'Arquitecto de Software', '2023-05-15', 1)," +
            "(6, 1, 'Desarrollador Backend', '2023-02-25', 1)," +
            "(7, 2, 'Especialista en Redes', '2023-08-20', 1)," +
            "(8, 3, 'Desarrollador Mobile', '2023-06-25', 1)," +
            "(9, 4, 'Líder de Proyecto', '2023-06-25', 1)," +
            "(10, 5, 'Arquitecto de Software', '2023-06-25', 1);"
        )
    }

    // Tabla tareas
    existe = false;
    res = await db.get(
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'tareas'",
        []
    );

    if (res.contar > 0) {
        existe = true;
    }

    if (!existe) {
        await db.run(
          "CREATE TABLE tareas" +
            "(IdTarea INTEGER PRIMARY KEY AUTOINCREMENT," +
            "Descripcion TEXT NOT NULL," +
            "FechaCreacion DATE NOT NULL," +
            "FechaVencimiento DATE," +
            "IdProyecto INTEGER NOT NULL," +
            "IdEmpleado INTEGER NOT NULL," +
            "Activo BOOLEAN NOT NULL," +
            "FOREIGN KEY(IdProyecto) REFERENCES proyectos(IdProyecto) ON UPDATE CASCADE ON DELETE RESTRICT," +
            "FOREIGN KEY(IdEmpleado) REFERENCES empleados(IdEmpleado) ON UPDATE CASCADE ON DELETE RESTRICT);"
        );

        console.log("Tabla 'tareas' creada!")

        await db.run(
            "INSERT INTO tareas(Descripcion, FechaCreacion, FechaVencimiento, IdProyecto, IdEmpleado, Activo) " + "VALUES" +
            "('Implementar autenticación de dos factores para el módulo de autenticación', '2023-01-10', '2023-01-31', 1, 1, 1)," + 
            "('Diseñar la interfaz de usuario para el panel de control del administrador', '2023-02-15', '2023-02-28', 2, 2, 1)," +
            "('Elaborar el plan de gestión para la fase inicial', '2023-03-20', '2023-03-31', 3, 3, 1)," + 
            "('Configurar firewall y sistemas de detección de intrusos', '2023-04-05', '2023-04-30', 4, 4, 1)," +
            "('Crear prototipo interactivo de la nueva aplicación móvil', '2023-05-10', '2023-05-31', 5, 5, 1)," +
            "('Desarrollar API RESTful para la gestión de usuarios', '2023-06-15', '2023-06-30', 6, 6, 1)," +
            "('Integrar servicios de terceros utilizando API', '2023-07-20', '2023-07-31', 1, 7, 7)," +
            "('Optimizar consultas SQL para mejorar el rendimiento', '2023-08-05', '2023-08-31', 8, 8, 1)," +
            "('Realizar análisis de requerimientos', '2023-09-10', '2023-09-30', 9, 9, 1)," +
            "('Ejecutar pruebas de regresión en el nuevo módulo', '2023-10-15', '2023-10-31', 10, 10, 1)," +
            "('Añadir funcionalidad de búsqueda avanzada al backend', '2023-02-25', '2023-03-25', 1, 11, 1)," +
            "('Auditar y mejorar la seguridad de las conexiones SSL', '2023-08-20', '2023-09-20', 2, 12, 1)," +
            "('Implementar notificaciones push en la aplicación móvil', '2023-06-25', '2023-07-25', 3, 13, 1)," +
            "('Coordinar la integración de módulos en el proyecto', '2023-03-25', '2023-04-25', 4, 14, 1)," +
            "('Diseñar la arquitectura de microservicios para el sistema', '2023-05-15', '2023-06-15', 5, 15, 1)," +
            "('Revisar y refactorizar el código del backend existente', '2023-02-25', '2023-03-25', 6, 1, 1)," +
            "('Implementar medidas adicionales de seguridad en la red', '2023-08-20', '2023-09-20', 7, 2, 1)," +
            "('Optimizar el rendimiento de la aplicación móvil', '2023-06-25', '2023-07-25', 8, 3, 1)," +
            "('Dirigir la reunión de lanzamiento del nuevo módulo', '2023-06-25', '2023-07-25', 9, 4, 1)," +
            "('Desarrollar el esquema de base de datos', '2023-06-25', '2023-07-25', 10, 5, 1);"
        )
    }
    */
    db.close();
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;