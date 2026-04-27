import { supabase } from "./supabase.js";

document.addEventListener("DOMContentLoaded", () => {
    cargarTareas();
});

async function cargarTareas() {

    const { data, error } = await supabase
        .from("asignaciontarea")
        .select(`
            idasignacion,
            fechatrabajo,
            observaciones,
            estado,
            idguiacanino (nombre),
            idcan (nombre),
            idtipotrabajo (nombre)
        `); /*/REVISAR QUE EL AUTOCOMPLETAR NO DEJE UNA COMA AL  FINAL YA QUE GENERA ERRORES EN LA CONSULTA/*/

    if (error) {
        console.log(error);
        return;
    }

    const tabla = document.getElementById("tablaTareas");
    tabla.innerHTML = "";

    data.forEach(tarea => {

        let claseEstado = "";

    if (tarea.estado === "Pendiente") {
    claseEstado = "table-warning";
    } else if (tarea.estado === "En ejecución") {
    claseEstado = "table-success";
    } else if (tarea.estado === "Finalizada") {
    claseEstado = "table-danger";
    }

        

        const fila = `
        <tr class="${claseEstado}">
            <td>${tarea.idasignacion}</td>
            <td>${tarea.idguiacanino?.nombre || ''}</td>
            <td>${tarea.idcan?.nombre || ''}</td>
            <td>${tarea.idtipotrabajo?.nombre || ''}</td>
            <td>${tarea.fechatrabajo}</td>

            <td>
                <input type="text" id="comentario-${tarea.idasignacion}" 
                value="${tarea.observaciones || ''}">
            </td>

            <td>${tarea.estado}</td>

            <td>
                <button class="btn btn-success btn-sm" onclick="iniciar(${tarea.idasignacion})">Iniciar</button>
                <button class="btn btn-danger btn-sm" onclick="finalizar(${tarea.idasignacion})">Finalizar</button>
                <button class="btn btn-warning btn-sm" onclick="actualizar(${tarea.idasignacion})">Actualizar</button>
            </td>
        </tr>
        `;

        tabla.innerHTML += fila;
    });
}



window.iniciar = async (id) => {

    await supabase
        .from("asignaciontarea")
        .update({ estado: "En ejecución" })
        .eq("idasignacion", id);

    cargarTareas();
}


window.finalizar = async (id) => {

    await supabase
        .from("asignaciontarea")
        .update({ estado: "Finalizada" })
        .eq("idasignacion", id);

    cargarTareas();
}


window.actualizar = async (id) => {

    const comentario = document.getElementById(`comentario-${id}`).value;

    await supabase
        .from("asignaciontarea")
        .update({ observaciones: comentario })
        .eq("idasignacion", id);

    alert("Actualizado");
}

/*/-------------------------------------------------------------------------/*/
/*/ FUNCION DE CERRAR SESION/*/

window.logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "./login.html";
};

document.addEventListener("DOMContentLoaded", async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        window.location.href = "./login.html";
    }
});