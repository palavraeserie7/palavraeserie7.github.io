import { supabase } from "./supabase.js";
import { checkAuth } from "./auth.js";

const user = await checkAuth();

if (user) {
  document.getElementById("user").innerText =
    "Bem-vindo: " + user.email;
}

window.logout = async function () {
  await supabase.auth.signOut();
  window.location.href = "./login.html";
};
