
/**
 * Verifica o status do sistema no Supabase e gerencia o redirecionamento
 */
async function checkMaintenanceStatus() {
    try {
        // Captura o cliente global do Supabase configurado no seu supabase.js
        const supabase = window.supabaseClient;
        
        if (!supabase) {
            console.error('Supabase não inicializado no escopo global.');
            return;
        }

        // Busca o registro na tabela 'palavras' onde a chave é 'manutencao_ativa'
        const { data, error } = await supabase
            .from('palavras')
            .select('valor')
            .eq('chave', 'manutencao_ativa')
            .maybeSingle();

        if (error) throw error;

        // Converte o valor para booleano real (true/false)
        const isMaintenanceActive = data?.valor === 'true' || data?.valor === true;
        const currentPath = window.location.pathname;

        // SE A MANUTENÇÃO ESTIVER ATIVA: Redireciona para a página de aviso
        if (isMaintenanceActive && !currentPath.includes('manutencao.html')) {
            window.location.href = '/pages/manutencao.html';
        } 
        // SE A MANUTENÇÃO ESTIVER INATIVA: Libera o usuário e manda para a Home
        else if (!isMaintenanceActive && currentPath.includes('manutencao.html')) {
            window.location.href = '/index.html';
        }

    } catch (error) {
        console.error('Erro na validação do status de manutenção:', error.message);
    }
}

// Executa assim que a estrutura básica da página terminar de carregar
document.addEventListener('DOMContentLoaded', checkMaintenanceStatus);
