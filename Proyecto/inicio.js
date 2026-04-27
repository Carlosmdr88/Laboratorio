import { supabase } from "./supabase.js";

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