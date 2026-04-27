import { supabase } from "./supabase.js";

window.logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "./login.html";
};