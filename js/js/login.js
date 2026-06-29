async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const msg = document.getElementById("msg");
  msg.innerText = "Entrando...";

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    msg.innerText = error.message;
    return;
  }

  window.location.href = "./dashboard.html";
}
