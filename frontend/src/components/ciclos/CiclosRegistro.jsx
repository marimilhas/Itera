import React from "react";
import { useForm } from "react-hook-form";
import moment from 'moment';

export default function ProyectosRegistro({ AccionABMC, Proyecto, Grabar, Volver }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitted },
        getValues
    } = useForm({ values: Proyecto });

    const onSubmit = (data) => {
        Grabar(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">
                <fieldset disabled={AccionABMC === "C"}>

                    {/* Campo Nombre */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="Nombre">
                                Nombre{AccionABMC !== "C" && <span className="text-danger">*</span>}:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                {...register("Nombre", {
                                    required: { value: true, message: "El nombre es requerido" },
                                    minLength: {
                                        value: 5,
                                        message: "El nombre debe tener al menos 5 caracteres",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "El nombre debe tener como máximo 50 caracteres",
                                    },
                                })}
                                autoFocus
                                className={
                                    "form-control " + (errors?.Nombre ? "is-invalid" : "")
                                }
                            />
                            {errors?.Nombre && (
                                <div className="invalid-feedback">
                                    {errors?.Nombre?.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Campo Descripción */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="Descripcion">
                                Descripción{AccionABMC !== "C" && <span className="text-danger">*</span>}:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                {...register("Descripcion", {
                                    required: { value: true, message: "La descripción es requerida" },
                                    minLength: {
                                        value: 10,
                                        message: "La descripción debe tener al menos 10 caracteres",
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "La descripción debe tener como máximo 100 caracteres",
                                    },
                                })}
                                className={
                                    "form-control " + (errors?.Descripcion ? "is-invalid" : "")
                                }
                            />
                            {errors?.Descripcion && (
                                <div className="invalid-feedback">
                                    {errors?.Descripcion?.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Campo FechaInicio */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="FechaInicio">
                                Fecha Inicio{AccionABMC !== "C" && <span className="text-danger">*</span>}:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="date"
                                {...register("FechaInicio", {
                                    required: { value: true, message: "La fecha de inicio es requerida" }
                                })}
                                className={
                                    "form-control " + (errors?.FechaInicio ? "is-invalid" : "")
                                }
                            />
                            <div className="invalid-feedback">
                                {errors?.FechaInicio?.message}
                            </div>
                        </div>
                    </div>

                    {/* Campo FechaFin */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="FechaFin">
                                Fecha Fin:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="date"
                                {...register("FechaFin", {
                                    validate: {
                                        fechaMayor: (value) => {
                                            if (!value) return true; // Permitir valor nulo (fecha opcional)
                                            const fechaInicio = getValues("FechaInicio");
                                            return moment(value).isSameOrAfter(moment(fechaInicio)) ||
                                                "La fecha de fin debe ser mayor o igual a la fecha de inicio";
                                        },
                                    },
                                })}
                                className={"form-control " + (errors?.FechaFin ? "is-invalid" : "")}
                            />
                            {errors?.FechaFin && (
                                <div className="invalid-feedback">
                                    {errors?.FechaFin?.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Campo Presupuesto */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="Presupuesto">
                                Presupuesto:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="number"
                                step=".01"
                                {...register("Presupuesto", {
                                    min: {
                                        value: 0.01,
                                        message: "El presupuesto debe ser mayor a 0",
                                    },
                                    max: {
                                        value: 99999999.99,
                                        message: "El presupuesto debe ser menor o igual a 99999999.99",
                                    },
                                })}
                                className={
                                    "form-control " + (errors?.Presupuesto ? "is-invalid" : "")
                                }
                            />
                            <div className="invalid-feedback">{errors?.Presupuesto?.message}</div>
                        </div>
                    </div>

                    {/* Campo Activo */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="Activo">
                                Activo{AccionABMC !== "C" && <span className="text-danger">*</span>}:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select
                                name="Activo"
                                {...register("Activo", {
                                    required: { value: true, message: "El estado del proyecto es requerido" },
                                })}
                                className={
                                    "form-control" + (errors?.Activo ? " is-invalid" : "")
                                }
                                disabled
                            >
                                <option value={null}></option>
                                <option value={false}>NO</option>
                                <option value={true}>SI</option>
                            </select>
                            <div className="invalid-feedback">{errors?.Activo?.message}</div>
                        </div>
                    </div>

                </fieldset>

                {/* Botones Grabar, Cancelar/Volver' */}
                <hr />
                <div className="row justify-content-center">
                    <div className="col text-center botones">
                        {AccionABMC !== "C" && (
                            <button
                                type="submit"
                                className="btn"
                                style={{ backgroundColor: "blueviolet", color: "white", fontWeight: 600 }}
                            >
                                <i className="fa fa-check"></i> Grabar
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn"
                            style={{ backgroundColor: "#00aeff", color: "white", fontWeight: 600}}
                            onClick={() => Volver()}
                        >
                            <i className="fa fa-undo"></i>
                            {AccionABMC === "C" ? " Volver" : " Cancelar"}
                        </button>
                    </div>
                </div>

                {/* Texto: Revisar los datos ingresados... */}
                {!isValid && isSubmitted && (
                    <div className="row alert alert-danger mensajesAlert">
                        <i className="fa fa-exclamation-sign"></i>
                        Revisar los datos ingresados...
                    </div>
                )}

            </div>
        </form>
    );
}
