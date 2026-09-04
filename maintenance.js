/* Modo de manutenção global — Palavra & Série
 * A página de entrada permanece pública para permitir autenticação.
 * A proteção de conteúdo é feita no navegador; a autorização real de APIs
 * continua a ser validada no Worker pelo token Supabase.
 */
(() => {
  'use strict';

  const ALLOWED_EMAIL = 'palavraeserie7@gmail.com';
  const LOGIN_PATH = '/pages/pesquisa/entrada.html';
  const supabaseUrl = 'https://qmhdbuxomozdczgvpvcc.supabase.co';
  const supabaseAnonKey = 'sb_publishable_5jVrL8dyVBg0YOfo_q4ppA_yLMOjTz8';

  const css = `
    html.maintenance-lock body > * { visibility: hidden !important; }
    #maintenance-gate {
      position: fixed; inset: 0; z-index: 2147483647; display: grid;
      place-items: center; padding: 24px; background: #0b1428; color: #dbe7f5;
      font-family: Inter, "Segoe UI", sans-serif;
    }
    #maintenance-gate[hidden] { display: none; }
    .maintenance-card {
      width: min(560px, 100%); padding: 36px; border: 1px solid #263754;
      border-radius: 14px; background: #111b30; box-shadow: 0 20px 70px rgba(0,0,0,.35);
      text-align: center;
    }
    .maintenance-card h1 { margin: 0 0 14px; color: #fff; font-size: 28px; }
    .maintenance-card p { margin: 10px 0; color: #b9c7da; line-height: 1.6; }
    .maintenance-card a, .maintenance-card button {
      display: inline-block; margin-top: 20px; padding: 12px 18px; border: 0;
      border-radius: 7px; background: #9c7a32; color: #fff; font-weight: 700;
      text-decoration: none; cursor: pointer;
    }
    .maintenance-card small { display: block; margin-top: 18px; color: #91a4bd; }
  `;

  document.documentElement.classList.add('maintenance-lock');
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  function ensureGate() {
    let gate = document.getElementById('maintenance-gate');
    if (!gate) {
      gate = document.createElement('div');
      gate.id = 'maintenance-gate';
      gate.innerHTML = `
        <section class="maintenance-card" role="status" aria-live="polite">
          <h1>Site em manutenção</h1>
          <p id="maintenance-message">A verificar o acesso autorizado...</p>
          <a id="maintenance-login" href="${LOGIN_PATH}" hidden>Entrar</a>
          <button id="maintenance-retry" type="button" hidden>Tentar novamente</button>
          <small>O acesso está temporariamente limitado ao proprietário do site.</small>
        </section>`;
      document.body.appendChild(gate);
    }
    return gate;
  }

  function showGate(message, showLogin = false, showRetry = false) {
    const gate = ensureGate();
    gate.hidden = false;
    document.documentElement.classList.add('maintenance-lock');
    document.getElementById('maintenance-message').textContent = message;
    document.getElementById('maintenance-login').hidden = !showLogin;
    document.getElementById('maintenance-retry').hidden = !showRetry;
  }

  function unlock() {
    const gate = document.getElementById('maintenance-gate');
    if (gate) gate.hidden = true;
    document.documentElement.classList.remove('maintenance-lock');
  }

  async function verify() {
    showGate('A verificar o acesso autorizado...');
    try {
      if (!window.supabase?.createClient) throw new Error('Cliente de autenticação indisponível.');
      const client = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
      const { data, error } = await client.auth.getSession();
      if (error) throw error;
      const email = String(data?.session?.user?.email || '').trim().toLowerCase();
      if (email === ALLOWED_EMAIL) {
        unlock();
        return;
      }
      showGate(
        data?.session
          ? 'Esta conta não está autorizada durante a manutenção.'
          : 'Entre com a conta autorizada para aceder ao site.',
        true,
        false
      );
    } catch (error) {
      console.error('Falha ao verificar manutenção:', error);
      showGate('Não foi possível verificar a sessão. Tente novamente.', false, true);
      document.getElementById('maintenance-retry').onclick = verify;
    }
  }

  function start() {
    ensureGate();
    verify();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();

// Para desativar o modo de manutenção, remova os carregamentos deste ficheiro
// das páginas protegidas; não remova a validação de autenticação do Worker.
