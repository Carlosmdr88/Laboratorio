import { supabase } from "./supabase.js";

document.addEventListener("DOMContentLoaded", () => {
    cargarDatos();
    guardarAsignacion();
});


/*/-------------------------------------------------------------------------/*/
/*/ FUNCION DE CARGA DE DATOS/*/
/*/-------------------------------------------------------------------------/*/
async function cargarDatos() {

    // 🔹 Tipo de Trabajo
    const { data: tipos } = await supabase.from("tipotrabajo").select("*");
    const selectTipo = document.getElementById("tipotrabajo");
    selectTipo.innerHTML = `<option value="" disabled selected>Seleccione</option>`;
    // 

    tipos.forEach(t => {
        selectTipo.innerHTML += `<option value="${t.idtipo_trabajo}">${t.nombre}</option>`;
    });

    // 🔹 Guías
    const { data: guias } = await supabase.from("guiacanino").select("*");
    const selectGuia = document.getElementById("guia");
    selectGuia.innerHTML = `<option value="" disabled selected>Seleccione</option>`;

    guias.forEach(g => {
        selectGuia.innerHTML += `<option value="${g.idguiacanino}">${g.nombre}</option>`;
    });

    // 🔹 Canes
    const { data: canes } = await supabase.from("can").select("*");
    const selectCan = document.getElementById("can");
    selectCan.innerHTML = `<option value="" disabled selected>Seleccione</option>`;
    

    canes.forEach(c => {
        selectCan.innerHTML += `<option value="${c.idcan}">${c.nombre}</option>`;
    });
}
/*/-------------------------------------------------------------------------/*/
/*/ FUNCION DE GUARDADO/*/
/*/-------------------------------------------------------------------------/*/

function guardarAsignacion() {

    const form = document.getElementById("formAsignacion");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            idtipotrabajo: document.getElementById("tipotrabajo").value,
            idguiacanino: document.getElementById("guia").value,
            idcan: document.getElementById("can").value,
            fechatrabajo: document.getElementById("fecha").value,
            direccion: document.getElementById("direccion").value,
            contacto: document.getElementById("contacto").value,
            observaciones: document.getElementById("observaciones").value,
            estado: "Sin iniciar"
        };

        const { error } = await supabase
            .from("asignaciontarea")
            .insert([data]);

        if (error) {
            alert("Error al guardar");
            console.log(error);
        } else {
            alert("Tarea asignada correctamente ✅");
            form.reset();
        }
    });
}

/*/-------------------------------------------------------------------------/*/
/*/ LIMPIAR FORMULARIO/*/
/*/-------------------------------------------------------------------------/*/
const btnCancel = document.getElementById("btnCancel");

btnCancel.addEventListener("click", async () => limpiarFormulario());

const limpiarFormulario = () => {
  fecha.value = "";
  direccion.value = "";
  contacto.value = "";
  observaciones.value = "";

};