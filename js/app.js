// ======================
// SUPABASE INIT
// ======================
const SUPABASE_URL = "https://qmhdbuxomozdczgvpvcc.supabase.co";
const SUPABASE_KEY = "sb_publishable_5jVrL8dyVBg0YOfo_q4ppA_yLMOjTz8";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

window.supabaseClient = supabase;

// ======================
// LOGIN
// ======================
async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        msg.style.color = "red";
        msg.innerText = error.message;
        return;
    }

    window.location.href = "/pages/dashboard.html";
}

// ======================
// CADASTRO
// ======================
async function signup() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    const { error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        msg.style.color = "red";
        msg.innerText = error.message;
        return;
    }

    msg.style.color = "green";
    msg.innerText = "Conta criada! Confirme o email.";
}

// ======================
// DASHBOARD CHECK
// ======================
async function checkAuth() {

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        window.location.href = "/pages/login.html";
        return;
    }

    document.getElementById("user").innerText =
        "Bem-vindo, " + user.email;
}
