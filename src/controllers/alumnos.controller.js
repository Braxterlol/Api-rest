const Alumno = require('../models/alumnos.model');

const index = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const { sort, order } = req.query;

        const alumnos = await Alumno.getAll({ offset, limit }, { sort, order });

        const totalAlumnos = await Alumno.count();

        let response = {
            message: "alumnos obtenidos exitosamente",
            data: alumnos,
            total: totalAlumnos,
            totalPages: Math.ceil(totalAlumnos / limit),
            currentPage: page
        };

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al obtener los alumnos",
            error: error.message
        });
    }
}

const getById = async (req, res) => {
    try {
        const idAlumno = req.params.id;
        const alumno = await Alumno.getById(idAlumno);

        if (!alumno) {
            return res.status(404).json({
                message: `alumno no encontrado`
            });
        };
        return res.status(200).json({
            id: alumno.id, nombre: alumno.nombre, apellidoPaterno: alumno.apellidoPaterno, apellidoMaterno: alumno.apellidoMaterno, matricula: alumno.matricula, deleted: alumno.deleted, createdAt: alumno.createdAt, updatedAt: alumno. updatedAt, deletedAt: alumno.deletedAt
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener el alumno",
            error: error.message
        });
    }
}

const create = async (req, res) => {
    try {
        const alumno = new Alumno({
            nombre: req.body.nombre,
            apellidoPaterno: req.body.apellidoPaterno,
            apellidoMaterno: req.body.apellidoMaterno,
            matricula: req.body.matricula,
            deleted: req.body.deleted || false
        });

        await alumno.save(Alumno);

        return res.status(201).json({
            message: "alumno creado exitosamente",
        });
    } catch (error) {
        return res.status(500).json({
        });
    }
}



module.exports = {
    index,
    getById,
    create,
}
