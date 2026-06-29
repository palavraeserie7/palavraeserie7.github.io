async function checkUser() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "./login.html";
    return;
  }

  document.getElementById("user").innerText =
    "Bem-vindo: " + user.email;
}

checkUser();

async function logout() {
  await supabase.auth.signOut();
  window.location.href = "./login.html";
}
