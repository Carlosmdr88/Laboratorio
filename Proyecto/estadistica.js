import { supabase } from "./supabase.js";

document.addEventListener("DOMContentLoaded", () => {
    cargarEstadisticas();
});

async function cargarEstadisticas() {

    // 🔹 Traer datos con relaciones
    const { data, error } = await supabase
        .from("asignaciontarea")
        .select(`
            estado,
            idguiacanino (idguiacanino, nombre),
            idcan (idcan, nombre)
        `);

    if (error) {
        console.log(error);
        return;
    }

    // 🔹 OBJETOS PARA AGRUPAR
    const estadisticasCan = {};
    const estadisticasGuia = {};

    data.forEach(t => {

        const estado = t.estado;

        // =====================
        // 🐕 CAN
        // =====================
        const idCan = t.can?.idcan;
        const nombreCan = t.can?.nombre;

        if (idCan) {

            if (!estadisticasCan[idCan]) {
                estadisticasCan[idCan] = {
                    nombre: nombreCan,
                    total: 0,
                    pendientes: 0,
                    realizadas: 0
                };
            }

            estadisticasCan[idCan].total++;

            if (estado === "Finalizada") {
                estadisticasCan[idCan].realizadas++;
            } else {
                estadisticasCan[idCan].pendientes++;
            }
        }

        // =====================
        // 👨‍✈️ GUÍA
        // =====================
        const idGuia = t.GuiaCanino?.idguiacanino;
        const nombreGuia = t.GuiaCanino?.nombre;

        if (idGuia) {

            if (!estadisticasGuia[idGuia]) {
                estadisticasGuia[idGuia] = {
                    nombre: nombreGuia,
                    total: 0,
                    pendientes: 0,
                    realizadas: 0
                };
            }

            estadisticasGuia[idGuia].total++;

            if (estado === "Finalizada") {
                estadisticasGuia[idGuia].realizadas++;
            } else {
                estadisticasGuia[idGuia].pendientes++;
            }
        }

    });

    // 🔹 LLENAR TABLA CANES
    const tablaCanes = document.getElementById("tablaCanes");
    tablaCanes.innerHTML = "";

    Object.values(estadisticasCan).forEach(c => {

        const porcentaje = c.total > 0 
            ? Math.round((c.realizadas / c.total) * 100) 
            : 0;

        tablaCanes.innerHTML += `
            <tr>
                <td>${c.nombre}</td>
                <td>${c.total}</td>
                <td>${c.pendientes}</td>
                <td>${c.realizadas}</td>
                <td>${porcentaje}%</td>
            </tr>
        `;
    });

    // 🔹 LLENAR TABLA GUÍAS
    const tablaGuias = document.getElementById("tablaGuias");
    tablaGuias.innerHTML = "";

    Object.values(estadisticasGuia).forEach(g => {

        const porcentaje = g.total > 0 
            ? Math.round((g.realizadas / g.total) * 100) 
            : 0;

        tablaGuias.innerHTML += `
            <tr>
                <td>${g.nombre}</td>
                <td>${g.total}</td>
                <td>${g.pendientes}</td>
                <td>${g.realizadas}</td>
                <td>${porcentaje}%</td>
            </tr>
        `;
    });
}