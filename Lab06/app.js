// importamos el cliente de Supabase para interactuar con la base de datos
// este cliente ya está configurado con la URL y la clave de acceso a nuestra instancia de Supabase
import { supabase } from "./supabase.js";

//****************************************
// Referencias a elementos del DOM
//****************************************
const btnClean = document.getElementById("btnClean");
const txtSearch = document.getElementById("txtSearch");
const btnLoad = document.getElementById("btnLoad");
const btnAdd = document.getElementById("btnAdd");
const btnCancel = document.getElementById("btnCancel");
const tbody = document.getElementById("tbodyStudents");
//Formularios 
const txtNombre = document.getElementById("txtNombre");
const txtApellido = document.getElementById("txtApellido");
const txtCorreo = document.getElementById("txtCorreo");
const txtCarrera = document.getElementById("txtCarrera");
//

window.onload = () => {
  consultarEstudiantes();
}


//eventos 
btnLoad.addEventListener("click", async () => consultarEstudiantes());
btnAdd.addEventListener("click", async () => guardarEstudiante());

// funcion de flecha
// const consultarEstudiantes = async () => {};
// funcion tradicional
// function consultarEstudiantes() {}

// let y const
// let x = 10;
// x = 20;
// const y = 30;
// y = 40; // error, no se puede reasignar una constante
// var z = 50;
// var z = 60; // no error, var permite redeclarar la misma variable
//********************************************************************
// Funciones */
const consultarEstudiantes = async () => {
  // usamos el cliente de Supabase para hacer una consulta a la tabla "estudiantes"
  // json: { "data": [], "error": null }
  const search = txtSearch.value.trim() || ""; // si el valor es vacío, se asigna una cadena vacía
  const query = supabase.from("estudiantes").select("id,nombre,apellido,correo,carrera");

  // SEBASTIAN JESUS
  if (search.length > 0) {
    // query.ilike("nombre", `%${search}%`);
    query.or(`nombre.ilike.%${search}%,apellido.ilike.%${search}%`);
  }
  const { data, error } = await query;


  if (error) {
    console.error(error);
    alert("Error cargando estudiantes");
    return;
  }

  // limpiamos el contenido del tbody antes de agregar los nuevos datos
  tbody.innerHTML = "";

  // data es un arreglo de objetos, cada objeto representa un estudiante
  data.forEach((r) => {
    const tr = document.createElement("tr");
    tr.setAttribute("data-id", r.id);
    //<td>${r.id ?? ""}</td>
    tr.innerHTML = `
        <td>${r.nombre ?? ""}</td>
        <td>${r.apellido ?? ""}</td>
        <td>${r.correo ?? ""}</td>
        <td>${r.carrera ?? ""}</td>
        <td>
          <button class="btnActualizar" data-id="${r.id}">Actualizar</button>
          <button class="btnEliminar" data-id="${r.id}">Eliminar</button>
        </td>
      `;

    tbody.appendChild(tr);
  });
};

const guardarEstudiante = async () => {
  const estudiante = {
    nombre: txtNombre.value.trim(),
    apellido: txtApellido.value.trim(),
    correo: txtCorreo.value.trim(),
    carrera: txtCarrera.value.trim()
  };

  if (!estudiante.nombre || !estudiante.apellido || !estudiante.correo || !estudiante.carrera) {
    alert("Por favor, complete todos los campos");
    return;
  }

  const { error } = await supabase.from("estudiantes").insert([estudiante]);

  if (error) {
    console.error(error);
    alert("Error guardando estudiante");
    return;
  }

  alert("Estudiante guardado exitosamente");

  // Limpiar el formulario
  txtNombre.value = "";

  consultarEstudiantes();
}


