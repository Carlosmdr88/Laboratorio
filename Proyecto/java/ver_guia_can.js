import { supabase } from "./supabase.js";

document.addEventListener("DOMContentLoaded", () => {
    cargarGuias();
    cargarCanes();
});

// ==========================================
//  GUIAS


async function cargarGuias() {

    const { data, error } = await supabase
        .from("guiacanino")
        .select("*");

    if (error) {
        console.log(error);
        return;
    }

    const select = document.getElementById("selectGuia");
    select.innerHTML = `<option value="">Seleccione</option>`;

    data.forEach(g => {
        select.innerHTML += `<option value="${g.idguiacanino}">${g.nombre}</option>`;
    });

    select.addEventListener("change", mostrarGuia);
}

async function mostrarGuia() {

    const id = document.getElementById("selectGuia").value;
    if (!id) return;

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


// ==========================================
// CANES


async function cargarCanes() {

    const { data, error } = await supabase
        .from("can")
        .select("*");

    if (error) {
        console.log(error);
        return;
    }

    const select = document.getElementById("selectCan");
    select.innerHTML = `<option value="">Seleccione</option>`;

    data.forEach(c => {
        select.innerHTML += `<option value="${c.idcan}">${c.nombre}</option>`;
    });

    select.addEventListener("change", mostrarCan);
}

async function mostrarCan() {

    const id = document.getElementById("selectCan").value;
    if (!id) return;

    const { data: can } = await supabase
        .from("can")
        .select("*")
        .eq("idcan", id)
        .single();

    const { data: tareas } = await supabase
        .from("asignaciontarea")
        .select("*")
        .eq("idcan", id);

    document.getElementById("cNombre").textContent = can.nombre;
    document.getElementById("cRaza").textContent = can.raza;
    document.getElementById("cTipo").textContent = can.idtipo_trabajo;
    document.getElementById("cFecha").textContent = can.fechanacimiento;
    document.getElementById("cTareas").textContent = tareas.length;
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