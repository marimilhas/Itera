import React, { useState, useEffect } from "react";

function Pdca() {
    return (
        <div className="p-8 max-w-4xl mx-auto text-gray-800 bg-white">
            <h1 className="tituloPagina">Ciclo PDCA (Plan - Do - Check - Act)</h1>

            <section className="mb-6">
                <h4 className="text-2xl font-semibold text-blue-700">Nombre de la técnica</h4>
                <p>Comúnmente conocido como ciclo PDCA, un acrónimo en inglés de <strong>Plan (planificar)</strong>, <strong>Do (hacer)</strong>, <strong>Check (verificar)</strong> y <strong>Act/Adjust (actuar o ajustar)</strong>. También es referido como ciclo de Deming o ciclo de Shewhart.</p>
            </section>

            <section className="mb-6">
                <h4 className="text-2xl font-semibold text-blue-700">Descripción general</h4>
                <p>
                    El ciclo PDCA es una metodología de gestión orientada a la mejora continua de procesos en organizaciones que producen bienes y servicios.
                    Fue presentado inicialmente por el Dr. Walter Shewhart en 1939, y más tarde popularizado por el Dr. W. Edwards Deming.
                </p>
                <p>
                    Su aplicación se basa en cuatro etapas iterativas: Planificar, Hacer, Verificar y Actuar. Ayuda a optimizar procesos repetitivos, reducir errores, aumentar la eficiencia y aplicar mejoras sostenibles.
                    Tiene aplicaciones en manufactura, salud, educación, tecnología, entre otros. También se alinea con normas internacionales como ISO 9001, ISO 45001 e ISO 27001.
                </p>
            </section>

            <section className="mb-6">
                <h4 className="text-2xl font-semibold text-blue-700">Ámbitos de aplicación</h4>
                <ul className="list-disc list-inside space-y-1">
                    <li><strong>Industria manufacturera:</strong> Mejora de eficiencia, reducción de defectos, calidad del producto.</li>
                    <li><strong>Servicios:</strong> Bancos, hospitales, restaurantes: satisfacción del cliente y procesos internos.</li>
                    <li><strong>Salud:</strong> Optimizar flujos de trabajo, reducir errores médicos.</li>
                    <li><strong>Educación:</strong> Mejora de métodos de enseñanza, resultados académicos.</li>
                    <li><strong>Tecnología de la información:</strong> Desarrollo de software, gestión de proyectos, eficiencia operativa.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h4 className="text-2xl font-semibold text-blue-700">Procedimientos o pasos</h4>

                <div className="ml-4">
                    <h5 className="text-xl font-bold mt-4 text-blue-600">P: Plan (Planificar)</h5>
                    <p>Se identifican problemas y oportunidades de mejora. Se definen objetivos y metas SMART, KPIs, recursos, cronograma, riesgos, criterios de éxito y responsables.</p>

                    <h3 className="text-xl font-bold mt-4 text-blue-600">D: Do (Hacer)</h3>
                    <p>Se ejecuta el plan a pequeña escala (piloto), se capacita al personal, se documentan resultados y se observa el comportamiento real del proceso.</p>

                    <h3 className="text-xl font-bold mt-4 text-blue-600">C: Check (Verificar)</h3>
                    <p>Se evalúan los resultados frente a los objetivos, se identifican desviaciones o aprendizajes. Se puede representar gráficamente para visualizar tendencias.</p>

                    <h3 className="text-xl font-bold mt-4 text-blue-600">A: Act (Actuar)</h3>
                    <p>Se ajustan los procesos según resultados: si fue exitoso, se estandariza; si no, se redefine el plan. Se documentan lecciones y se inicia un nuevo ciclo con mejoras.</p>
                </div>
            </section>

            <section className="mb-6">
                <h4 className="text-2xl font-semibold text-blue-700">Ejemplo de aplicación</h4>
                <p>En una fábrica de muebles que produce armarios, se detecta que una máquina provoca errores y retrasos. Aplicando PDCA:</p>
                <ol className="list-decimal list-inside ml-4 mt-2 space-y-1">
                    <li><strong>Plan:</strong> Se planea reemplazar una máquina propensa a fallos por una moderna.</li>
                    <li><strong>Do:</strong> Se prueba la nueva máquina durante un mes, comparándola con las antiguas.</li>
                    <li><strong>Check:</strong> Se reduce el error, pero la velocidad no mejora debido a la falta de entrenamiento.</li>
                    <li><strong>Act:</strong> Se reemplazan todas las máquinas y se capacita al personal, logrando aumento en productividad y menos errores.</li>
                </ol>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-blue-700">Ventajas y desventajas</h2>
                <h3 className="text-xl font-bold mt-2 text-blue-600">Ventajas</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>Alta versatilidad y aplicabilidad.</li>
                    <li>Fácil implementación sin necesidad de expertos.</li>
                    <li>Fomenta la mejora continua y cultura organizacional.</li>
                    <li>Facilita monitoreo, evaluación y ajustes.</li>
                    <li>Promueve la participación y colaboración.</li>
                    <li>Permite pruebas seguras antes de implementar grandes cambios.</li>
                </ul>
            </section>
        </div>
    );
}

Pdca.NombreComponenteNoOfuscado = "pdca";

export { Pdca };