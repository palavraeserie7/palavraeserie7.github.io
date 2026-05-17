import supabase from "./supabase.js";

const ADMIN_EMAIL =
  "palavraeserie@gmail.com";

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

        const currentPath =
            window.location.pathname;

        const {
            data: { user }
        } = await supabase.auth.getUser();

        const isAdmin =
            user?.email === ADMIN_EMAIL;

        if (manutencao && !isAdmin) {

            if (!currentPath.includes("manutencao.html")) {

                window.location.replace(
                    "/pages/manutencao.html"
                );
            }
        }

        if (!manutencao &&
            currentPath.includes("manutencao.html")) {

            window.location.replace(
                "/index.html"
            );
        }

    } catch (error) {

        console.error(
            "Erro manutenção:",
            error.message
        );
    }
}
