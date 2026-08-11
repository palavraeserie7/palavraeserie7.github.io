const M00 = {
    async execute(action, params = {}) {
        console.log(`[M00] Executando: ${action}`);
        switch (action) {
            case 'load_dashboard':
                const profile = await this.callE08(params.userId);
                const books = await this.callPRO(params.userId);
                return { profile, books };
            case 'open_book':
                return { success: true };
            default: throw new Error("Ação desconhecida.");
        }
    },
    async callE08(userId) {
        const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
        return data || { level: 1, faith: 0, prayer: 0, maturity: 0 };
    },
    async callPRO(userId) {
        const { data } = await supabase.from('livros').select('*');
        return data || [];
    }
};
window.M00 = M00;
