import supabase from "./supabase.js";

export async function checkMaintenanceStatus() {

    try {

        const { data, error } =
            await supabase
            .from("palavras")
            .select("valor")
            .eq("chave", "manutencao_ativa")
            .single();

        if (error) throw error;

        const manutencao =
            data?.valor === true ||
            data?.valor === "true";

        const path =
            window.location.pathname;

        // ADMIN PODE PASSAR
        const {
            data: { user }
        } = await supabase.auth.getUser();

        const admin =
            user?.email ===
            "palavraeserie@gmail.com";

        if (manutencao && !admin) {

            if (
                !path.includes("manutencao.html")
            ) {
                window.location.href =
                    "/pages/manutencao.html";
            }
        }

    } catch (err) {

        console.error(
            "Erro manutenção:",
            err.message
        );
    }
}
