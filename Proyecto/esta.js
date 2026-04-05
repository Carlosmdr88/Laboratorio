import { supabase } from "./supabase.js";

document.addEventListener("DOMContentLoaded", () => {
    cargarGuias();
    cargarCanes();
});


async function cargarGuias() {

    const { data } = await supabase.from("guiacanino").select("*");
    const select = document.getElementById("selectGuia");

    data.forEach(g => {
        select.innerHTML += `<option value="${g.IdGuiaCanino}">${g.Nombre}</option>`;
    });

    select.addEventListener("change", mostrarGuia);
}

async function mostrarGuia() {

    const id = document.getElementById("selectGuia").value;

    const { data: guia } = await supabase
        .from("guiacanino")
        .select("*")
        .eq("idguiacanino", id)
        .single();

    const { data: tareas } = await supabase
        .from("asignaciontarea")
        .select("*")
        .eq("idguiacanino", id);

    document.getElementById("gNombre").textContent = guia.nombre;
    document.getElementById("gRango").textContent = guia.rango;
    document.getElementById("gTareas").textContent = tareas.length;
}


async function cargarCanes() {

    const { data } = await supabase
        .from("Can")
        .select(`*, TipoTrabajo (Nombre)`);

    const select = document.getElementById("selectCan");

    data.forEach(c => {
        select.innerHTML += `<option value="${c.IdCan}">${c.Nombre}</option>`;
    });

    select.addEventListener("change", mostrarCan);
}

async function mostrarCan() {

    const id = document.getElementById("selectCan").value;

    const { data: can } = await supabase
        .from("Can")
        .select(`*, TipoTrabajo (Nombre)`)
        .eq("IdCan", id)
        .single();

    const { data: tareas } = await supabase
        .from("AsignacionTarea")
        .select("*")
        .eq("IdCan", id);

    document.getElementById("cNombre").textContent = can.Nombre;
    document.getElementById("cRaza").textContent = can.Raza;
    document.getElementById("cTipo").textContent = can.TipoTrabajo?.Nombre || "";
    document.getElementById("cFecha").textContent = can.FechaNacimiento;
    document.getElementById("cTareas").textContent = tareas.length;
}