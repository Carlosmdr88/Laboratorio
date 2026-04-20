import { supabase } from "./supabase.js";

window.login = async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    // 🚨 SI HAY ERROR → NO ENTRA
    if (error) {
        alert("Correo o contraseña incorrectos");
        return; // 🔥 ESTO ES CLAVE
    }
    alert("Bienvenido 🚀");

    window.location.href = "inicio.html";
};