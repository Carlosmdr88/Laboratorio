import { supabase } from "./supabase.js";

window.login = async (event) => {
    event.preventDefault(); // 🚨 evita que recargue

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Complete todos los campos");
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        alert("Error: " + error.message);
        return;
    }

    alert("Bienvenido 🚀");

    window.location.href = "inicio.html";
};