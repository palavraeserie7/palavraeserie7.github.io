/**
 * M00 - CORE ORCHESTRATOR
 * Fonte de verdade do sistema conforme Arquitetura V7.
 */
const M00 = {
    async execute(action, params = {}) {
        console.log(`[M00] Executando ação: ${action}`);
        switch (action) {
            case 'load_dashboard':
                return await this.loadDashboardData(params.userId);
            case 'open_book':
                return { success: true, message: "Acesso validado pelo E11" };
            default:
                throw new Error("Ação desconhecida pelo M00.");
        }
    },

    async loadDashboardData(userId) {
        // Chamar E08 (Estado Espiritual) e PRO (Recomendação/Livros)
        const profile = await this.callE08(userId);
        const books = await this.callPRO(userId);
        return { profile, books };
    },

    async callE08(userId) {
        const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
        if (error) return { level: 1, faith: 0, prayer: 0, maturity: 0 };
        return data;
    },

    async callPRO(userId) {
        const { data, error } = await supabase.from('livros').select('*');
        if (error) throw error;
        return data || [];
    }
};
window.M00 = M00;
