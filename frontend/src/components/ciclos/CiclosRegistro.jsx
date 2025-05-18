import React from "react";
import { useForm } from "react-hook-form";
import moment from 'moment';

export default function CiclosRegistro({ AccionABMC, Ciclo, ProyectosDisponibles, Grabar, Volver }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitted },
        getValues
    } = useForm({ values: Ciclo });

    const onSubmit = (data) => {
        Grabar(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">
                <fieldset disabled={AccionABMC === "C"}>

                    {/* Número de Ciclo */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label">Número de Ciclo<span className="text-danger">*</span>:</label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="number"
                                {...register("numeroCiclo", {
                                    required: "El número de ciclo es obligatorio",
                                    min: { value: 1, message: "Debe ser mayor a 0" }
                                })}
                                className={`form-control ${errors.numeroCiclo ? "is-invalid" : ""}`}
                            />
                            <div className="invalid-feedback">{errors.numeroCiclo?.message}</div>
                        </div>
                    </div>

                    {/* Proyecto (desplegable) */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label">Proyecto<span className="text-danger">*</span>:</label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select
                                {...register("idProyecto", {
                                    required: "Debe seleccionar un proyecto"
                                })}
                                className={`form-control ${errors.idProyecto ? "is-invalid" : ""}`}
                            >
                                <option value=""> </option>
                                {ProyectosDisponibles.map((p) => (
                                    <option key={p.id} value={p.id}>{p.nombre}</option>
                                ))}
                            </select>
                            <div className="invalid-feedback">{errors.idProyecto?.message}</div>
                        </div>
                    </div>

                    {/* Plan */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label">Plan:</label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                {...register("plan", {
                                    minLength: { value: 5, message: "Mínimo 5 caracteres" }
                                })}
                                className={`form-control ${errors.plan ? "is-invalid" : ""}`}
                            />
                            {/* <textarea
                                {...register("plan", {
                                    minLength: { value: 5, message: "Mínimo 5 caracteres" }
                                })}
                                className={`form-control auto-expand ${errors.plan ? "is-invalid" : ""}`}
                                rows={1}
                            /> */}
                            <div className="invalid-feedback">{errors.plan?.message}</div>
                        </div>
                    </div>

                    {/* Do */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label">Do:</label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                {...register("do", {
                                    minLength: { value: 5, message: "Mínimo 5 caracteres" }
                                })}
                                className={"form-control " + (errors?.do ? "is-invalid" : "")}
                            />
                            <div className="invalid-feedback">{errors.do?.message}</div>
                        </div>
                    </div>

                    {/* Check */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label">Check:</label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                {...register("check", {
                                    minLength: { value: 5, message: "Mínimo 5 caracteres" }
                                })}
                                className={`form-control ${errors.check ? "is-invalid" : ""}`}
                            />
                            <div className="invalid-feedback">{errors.check?.message}</div>
                        </div>
                    </div>

                    {/* Act */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label">Act:</label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                {...register("act", {
                                    minLength: { value: 5, message: "Mínimo 5 caracteres" }
                                })}
                                className={`form-control ${errors.act ? "is-invalid" : ""}`}
                            />
                            <div className="invalid-feedback">{errors.act?.message}</div>
                        </div>
                    </div>

                    {/* Campo Activo */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="activo">
                                Activo{AccionABMC !== "C" && <span className="text-danger">*</span>}:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select
                                name="activo"
                                {...register("activo", {
                                    required: { value: true, message: "El estado del proyecto es requerido" },
                                })}
                                className={
                                    "form-control" + (errors?.activo ? " is-invalid" : "")
                                }
                                disabled
                            >
                                <option value={null}></option>
                                <option value={false}>NO</option>
                                <option value={true}>SI</option>
                            </select>
                            <div className="invalid-feedback">{errors?.activo?.message}</div>
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
                            style={{ backgroundColor: "#00aeff", color: "white", fontWeight: 600 }}
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
