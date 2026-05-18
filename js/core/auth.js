import supabase from "./supabase.js";

export async function checkAuth() {

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {

        window.location.replace(
            "./login.html"
        );

        return null;
    }

    return user;
}
