(() => {
  'use strict';

  const TREE = window.PALAVRA_ACADEMIC_TREE || null;
  const METHODS = window.PALAVRA_DISCIPLINE_METHODS || {};
  const BRIDGE_KEY = 'palavra-serie-academic-global-bridge';
  const TARGET_DISCIPLINE = 'Introdução ao Antigo Testamento / Bíblia Hebraica';
  const TARGET_PATH = ['I. ESTUDOS BÍBLICOS', '1. Fundamentos e Introdução Bíblica', TARGET_DISCIPLINE];
  const app = document.getElementById('academic-module-app');
  const mainUrl = new URL('../index.html', window.location.href).href;
  let currentSelection = null;
  let currentCommand = null;
  let lastAnswer = '';

  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const clear = () => {
    if (app) app.replaceChildren();
  };

  const setStatus = (node, text, kind = '') => {
    if (!node) return;
    node.className = `study-status${kind ? ` ${kind}` : ''}`;
    node.textContent = text || '';
  };

  const readBridge = () => {
    let raw = '';
    try {
      raw = window.sessionStorage.getItem(BRIDGE_KEY) || '';
    } catch (_) {}
    if (!raw && typeof window.name === 'string' && window.name.startsWith(`${BRIDGE_KEY}:`)) {
      raw = window.name.slice(BRIDGE_KEY.length + 1);
    }
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch (_) {
      return null;
    }
  };

  const readOriginalCommand = (module, step) => {
    const bridge = readBridge();
    const key = `${module}|${step}`;
    return bridge?.commands?.[key] || null;
  };

  const navigateToTree = () => {
    if (window.location.hash) window.history.pushState({ screen: 'tree' }, '', window.location.pathname);
    renderTree();
  };

  const navigateToDiscipline = () => {
    window.history.pushState({ screen: 'discipline' }, '', `${window.location.pathname}#disciplina=iat-biblia-hebraica`);
    renderDiscipline();
  };

  const buildHeader = (showTreeBack = false) => {
    const header = make('header', 'module-header');
    const brand = make('div', 'module-brand', 'PALAVRA & SÉRIE');
    const actions = make('div', 'module-header-actions');
    const home = make('a', 'module-link', '← MENU PRINCIPAL');
    home.href = mainUrl;
    actions.append(home);
    if (showTreeBack) {
      const back = make('button', 'module-button', '← VOLTAR ÀS ÁREAS');
      back.type = 'button';
      back.addEventListener('click', navigateToTree);
      actions.prepend(back);
    }
    header.append(brand, actions);
    return header;
  };

  const renderUnavailable = (detail = 'Este módulo está temporariamente indisponível.') => {
    clear();
    document.title = 'Áreas Académicas — Indisponível';
    const header = buildHeader(false);
    const main = make('main', 'module-main');
    const card = make('section', 'module-unavailable');
    card.append(
      make('h1', '', 'ÁREAS ACADÉMICAS DA TEOLOGIA'),
      make('p', '', detail)
    );
    const back = make('a', 'module-button', '← MENU PRINCIPAL');
    back.href = mainUrl;
    card.append(back);
    main.append(card);
    app?.append(header, main);
  };

  const renderTree = () => {
    if (!TREE || !Array.isArray(TREE.areas)) {
      renderUnavailable();
      return;
    }
    clear();
    document.title = 'Áreas Académicas da Teologia';
    app?.append(buildHeader(false));
    const main = make('main', 'module-main');
    const hero = make('section', 'module-hero');
    hero.append(
      make('div', 'module-kicker', 'ÍNDICE ACADÉMICO'),
      make('h1', '', TREE.title),
      make('p', '', 'Abra a área, avance pela subárea e escolha a disciplina disponível. Esta primeira versão implementa somente a disciplina indicada nas normas.')
    );
    main.append(hero);

    const card = make('section', 'module-card tree-card');
    const cardHeader = make('header', 'tree-card-header');
    cardHeader.append(
      make('h2', '', 'ÁRVORE ACADÉMICA'),
      make('p', '', 'A disciplina é aberta em uma tela própria. Nenhuma pesquisa é executada a partir da árvore.')
    );
    card.append(cardHeader);
    const tree = make('div', 'academic-tree');
    TREE.areas.forEach((area) => {
      const areaDetails = document.createElement('details');
      areaDetails.className = 'tree-area';
      areaDetails.open = true;
      const areaSummary = make('summary', '', area.title);
      areaDetails.append(areaSummary);
      (area.disciplines || []).forEach((discipline) => {
        const disciplineDetails = document.createElement('details');
        disciplineDetails.className = 'tree-discipline';
        disciplineDetails.open = true;
        disciplineDetails.append(make('summary', '', discipline.title));
        const topics = make('div', 'tree-topic-list');
        (discipline.topics || []).forEach((topic) => {
          const topicButton = make('button', 'tree-topic');
          topicButton.type = 'button';
          const label = make('span', 'tree-topic-label');
          label.append(make('strong', '', topic.title));
          label.append(make('span', '', topic.implemented ? 'Disciplina disponível nesta primeira etapa' : 'Disciplina a implementar posteriormente'));
          topicButton.append(label);
          const badge = make('span', 'tree-topic-badge', topic.implemented ? 'ABRIR DISCIPLINA' : 'EM PREPARAÇÃO');
          topicButton.append(badge);
          if (topic.implemented) {
            topicButton.addEventListener('click', navigateToDiscipline);
          } else {
            topicButton.addEventListener('click', () => renderUnavailable('Esta disciplina será disponibilizada posteriormente.'));
          }
          topics.append(topicButton);
        });
        disciplineDetails.append(topics);
        areaDetails.append(disciplineDetails);
      });
      tree.append(areaDetails);
    });
    card.append(tree);
    const note = make('p', 'module-note');
    note.append(make('strong', '', 'IMPLEMENTAÇÃO PROGRESSIVA. '));
    note.append(document.createTextNode('As demais disciplinas permanecem reservadas para uma etapa posterior e não foram reconstruídas neste módulo.'));
    card.append(note);
    main.append(card);
    app?.append(main);
  };

  const updateSelectedButtons = () => {
    document.querySelectorAll('.method-operation').forEach((button) => {
      const selected = currentSelection && button.dataset.module === currentSelection.module && button.dataset.step === currentSelection.step;
      button.classList.toggle('selected', Boolean(selected));
    });
  };

  const renderMethodGroup = (container, title, groups, conditional = false) => {
    const group = make('section', 'method-group');
    group.append(make('h3', '', title));
    (groups || []).forEach((item) => {
      const details = document.createElement('details');
      details.className = 'method-module';
      const summary = make('summary', '', item.module);
      details.append(summary);
      if (Array.isArray(item.operations) && item.operations.length) {
        details.append(make('p', 'method-module-note', 'Abra este método e escolha uma operação autorizada.'));
        const operations = make('div', 'method-operations');
        item.operations.forEach((operation) => {
          const button = make('button', 'method-operation');
          button.type = 'button';
          button.dataset.module = item.module;
          button.dataset.step = operation.code;
          button.append(make('strong', '', `${operation.code} — ${operation.label}`));
          button.append(make('span', '', 'Utilizar o comando original desta operação na Matriz PRO.'));
          button.addEventListener('click', () => selectOperation(item.module, operation));
          operations.append(button);
        });
        details.append(operations);
      } else {
        const note = make('p', 'method-module-note conditional', conditional ? 'Método condicional. Será disponibilizado somente quando a pergunta justificar a sua utilização. Não é executado automaticamente.' : 'Método sem operação disponível nesta disciplina.');
        details.append(note);
      }
      group.append(details);
    });
    container.append(group);
  };

  const selectOperation = (module, operation) => {
    currentSelection = { module, step: operation.code, label: operation.label };
    currentCommand = readOriginalCommand(module, operation.code);
    updateSelectedButtons();
    const selectedNode = document.getElementById('selected-operation');
    const commandNode = document.getElementById('original-command');
    const commandLabel = document.getElementById('original-command-label');
    const status = document.getElementById('study-status');
    const input = document.getElementById('study-question');
    if (selectedNode) selectedNode.textContent = `${module} · ${operation.code} — ${operation.label}`;
    if (commandNode && commandLabel) {
      if (currentCommand?.prompt) {
        commandNode.hidden = false;
        commandLabel.textContent = 'COMANDO ORIGINAL DA MATRIZ PRO';
        commandNode.textContent = currentCommand.prompt;
        setStatus(status, 'Operação seleccionada. Complete a pergunta e pesquise.', 'success');
      } else {
        commandNode.hidden = false;
        commandLabel.textContent = 'COMANDO ORIGINAL INDISPONÍVEL';
        commandNode.textContent = 'Este módulo não conseguiu ler o comando original da Matriz PRO. A pesquisa foi bloqueada para evitar a criação de um prompt paralelo.';
        setStatus(status, 'Módulo de comandos temporariamente indisponível.', 'error');
      }
    }
    if (input && !input.value.trim()) input.focus();
  };

  const appendMessage = (kind, text, addNote = false) => {
    const messages = document.getElementById('study-messages');
    if (!messages) return;
    const message = make('div', `study-message ${kind}`);
    message.textContent = text;
    messages.append(message);
    if (addNote) {
      const noteButton = make('button', 'module-button');
      noteButton.type = 'button';
      noteButton.textContent = '+ ADICIONAR ÀS ANOTAÇÕES';
      noteButton.addEventListener('click', () => addAnswerToNotes(text));
      message.append(noteButton);
    }
    messages.scrollTop = messages.scrollHeight;
  };

  const saveNotes = (value) => {
    try {
      window.localStorage.setItem('palavra-serie-academic-notes:iat-biblia-hebraica', value);
    } catch (_) {}
  };

  const loadNotes = () => {
    try {
      return window.localStorage.getItem('palavra-serie-academic-notes:iat-biblia-hebraica') || '';
    } catch (_) {
      return '';
    }
  };

  const addAnswerToNotes = (text) => {
    const notes = document.getElementById('study-notes');
    if (!notes) return;
    const separator = notes.value.trim() ? '\n\n--- RESPOSTA DA PESQUISA ---\n' : '';
    notes.value = `${notes.value}${separator}${text}`;
    saveNotes(notes.value);
    const noteStatus = document.getElementById('notes-status');
    if (noteStatus) noteStatus.textContent = 'Resposta adicionada às anotações.';
  };

  const submitSearch = async (event) => {
    event.preventDefault();
    const input = document.getElementById('study-question');
    const button = document.getElementById('study-submit');
    const status = document.getElementById('study-status');
    const bridge = readBridge();
    const question = input?.value.trim() || '';
    if (!currentSelection || !currentCommand?.prompt) {
      setStatus(status, 'Escolha primeiro uma operação com comando original disponível.', 'error');
      return false;
    }
    if (!question) {
      setStatus(status, 'Escreva a pergunta da pesquisa.', 'error');
      input?.focus();
      return false;
    }
    const workerUrl = String(bridge?.workerUrl || '').replace(/\/$/, '');
    if (!workerUrl) {
      setStatus(status, 'Este módulo está temporariamente indisponível para pesquisa.', 'error');
      return false;
    }
    appendMessage('user', question);
    if (input) input.value = '';
    if (button) button.disabled = true;
    setStatus(status, 'A executar a operação seleccionada…', 'loading');
    const routedQuestion = [
      'MODO: ÁREAS ACADÉMICAS — DISCIPLINA ISOLADA.',
      `Caminho académico: ${TARGET_PATH.join(' / ')}`,
      `Disciplina: ${TARGET_DISCIPLINE}`,
      `Módulo da Matriz PRO: ${currentSelection.module}`,
      `Operação: ${currentSelection.step} — ${currentSelection.label}`,
      'COMANDO ORIGINAL DA MATRIZ PRO:',
      currentCommand.prompt,
      'PERGUNTA DO UTILIZADOR:',
      question
    ].join('\n\n');
    try {
      const response = await fetch(`${workerUrl}/api/pesquisa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'free',
          accessLevel: 'free',
          question: routedQuestion,
          topic: TARGET_DISCIPLINE,
          discipline: TARGET_DISCIPLINE,
          academicPath: TARGET_PATH,
          module: currentSelection.module,
          step: currentSelection.step
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || `A pesquisa não foi concluída (HTTP ${response.status}).`);
      const answer = typeof data.text === 'string' ? data.text : typeof data.answer === 'string' ? data.answer : typeof data.result === 'string' ? data.result : JSON.stringify(data, null, 2);
      lastAnswer = answer || 'A pesquisa não devolveu texto.';
      appendMessage('assistant', lastAnswer, true);
      setStatus(status, 'Pesquisa concluída com a operação seleccionada.', 'success');
    } catch (error) {
      appendMessage('error', error?.message || 'Não foi possível concluir a pesquisa.');
      setStatus(status, 'A pesquisa não foi concluída. Tente novamente.', 'error');
    } finally {
      if (button) button.disabled = false;
    }
    return false;
  };

  const renderDiscipline = () => {
    const config = METHODS[TARGET_DISCIPLINE];
    if (!config) {
      renderUnavailable();
      return;
    }
    clear();
    currentSelection = null;
    currentCommand = null;
    lastAnswer = '';
    document.title = TARGET_DISCIPLINE;
    app?.append(buildHeader(true));
    const main = make('main', 'module-main');
    const layout = make('div', 'discipline-layout');
    const primary = make('section', 'module-card discipline-main');
    const heading = make('header', 'discipline-heading');
    const back = make('button', 'module-button');
    back.type = 'button';
    back.textContent = '← VOLTAR À ÁRVORE';
    back.addEventListener('click', navigateToTree);
    heading.append(back, make('div', 'module-kicker', 'I. ESTUDOS BÍBLICOS'), make('h1', '', TARGET_DISCIPLINE), make('p', 'discipline-breadcrumb', TARGET_PATH.slice(1).join(' / ')));
    const context = make('p', 'discipline-context');
    context.append(document.createTextNode('Disciplina independente. O mapa filtra as operações permitidas e o comando executado continua a ser o original da Matriz PRO.'));
    heading.append(context);
    primary.append(heading);

    const map = make('section', 'method-map');
    map.append(make('h2', '', 'MAPA METODOLÓGICO DA DISCIPLINA'));
    map.append(make('p', '', 'Escolha um método, depois uma operação. A operação apenas carrega o comando original; a pesquisa só começa quando o utilizador enviar uma pergunta.'));
    renderMethodGroup(map, 'PRINCIPAIS', config.principais);
    renderMethodGroup(map, 'DE APOIO', config.apoio);
    renderMethodGroup(map, 'CONDICIONAIS', config.condicionais, true);
    const notApplicable = make('section', 'method-group');
    notApplicable.append(make('h3', '', 'NÃO APLICÁVEIS'));
    const list = make('div', 'not-applicable');
    (config.naoAplicaveis || []).forEach((item) => {
      const row = make('div');
      row.append(make('strong', '', item.module), document.createTextNode(' — não utilizar nesta disciplina.'));
      list.append(row);
    });
    notApplicable.append(list);
    map.append(notApplicable);
    primary.append(map);

    const study = make('section', 'study-area');
    const selected = make('p', 'study-selected');
    selected.append(make('strong', '', 'OPERAÇÃO SELECCIONADA: '), make('span', '', 'Nenhuma operação seleccionada.'));
    selected.querySelector('span').id = 'selected-operation';
    study.append(selected);
    const commandWrap = make('div', 'study-command');
    commandWrap.hidden = true;
    commandWrap.id = 'original-command';
    const commandLabel = make('div', 'module-kicker', 'COMANDO ORIGINAL DA MATRIZ PRO');
    commandLabel.id = 'original-command-label';
    commandWrap.append(commandLabel, document.createTextNode(''));
    study.append(commandWrap);
    const messages = make('div', 'study-messages');
    messages.id = 'study-messages';
    messages.append(make('div', 'study-message system', 'Escolha uma operação acima e depois escreva a pergunta da pesquisa.'));
    study.append(messages);
    const form = make('form', 'study-form');
    form.addEventListener('submit', submitSearch);
    form.append(make('label', '', 'PERGUNTA / PESQUISA'));
    const row = make('div', 'study-question-row');
    const input = make('input');
    input.id = 'study-question';
    input.type = 'text';
    input.autocomplete = 'off';
    input.placeholder = 'Complete a pergunta sobre esta disciplina…';
    input.required = true;
    const submit = make('button', '', 'PESQUISAR');
    submit.id = 'study-submit';
    submit.type = 'submit';
    row.append(input, submit);
    form.append(row);
    const status = make('div', 'study-status');
    status.id = 'study-status';
    form.append(status);
    study.append(form);
    primary.append(study);

    const notes = make('aside', 'module-card discipline-notes');
    const notesHeader = make('header', 'notes-header');
    notesHeader.append(make('div', 'module-kicker', 'REGISTRO PESSOAL'), make('h2', '', 'MINHAS ANOTAÇÕES'), make('p', '', 'Escreva e guarde as suas observações independentemente da pesquisa.'));
    notes.append(notesHeader);
    const notesInput = make('textarea', 'notes-input');
    notesInput.id = 'study-notes';
    notesInput.placeholder = 'Escreva aqui as suas anotações sobre este tema…';
    notesInput.value = loadNotes();
    notesInput.addEventListener('input', () => saveNotes(notesInput.value));
    notes.append(notesInput);
    const notesActions = make('div', 'notes-actions');
    const notesStatus = make('span', '', 'As anotações são separadas da pesquisa.');
    notesStatus.id = 'notes-status';
    const saveButton = make('button', '', 'GUARDAR ANOTAÇÕES');
    saveButton.type = 'button';
    saveButton.addEventListener('click', () => { saveNotes(notesInput.value); notesStatus.textContent = 'Anotações guardadas.'; });
    notesActions.append(notesStatus, saveButton);
    notes.append(notesActions);
    layout.append(primary, notes);
    main.append(layout);
    app?.append(main);
  };

  const route = () => {
    if (window.location.hash === '#disciplina=iat-biblia-hebraica') renderDiscipline();
    else renderTree();
  };

  window.addEventListener('popstate', route);
  window.addEventListener('hashchange', route);
  window.addEventListener('message', (event) => {
    if (event.data?.type !== 'palavra-academic-module-command') return;
    if (event.data.module !== currentSelection?.module || event.data.step !== currentSelection?.step) return;
    if (event.data.prompt) {
      currentCommand = { prompt: event.data.prompt };
      selectOperation(currentSelection.module, { code: currentSelection.step, label: currentSelection.label });
    }
  });
  route();
})();
