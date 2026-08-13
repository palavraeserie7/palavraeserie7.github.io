export const matrizCompleta = {
    "ANL-01": {
        id: "ANL-01",
        titulo: "TEXTO E MANUSCRITOS",
        isPro: false,
        itens: [
            "Texto hebraico", "Texto aramaico", "Texto grego", "Manuscritos", 
            "Testemunhos textuais", "Variantes textuais", "Crítica textual", 
            "NA28", "BHS / BHQ", "SBLGNT", "Septuaginta"
        ],
        analisar(termo) {
            return `Diretriz de Crítica Textual e Manuscritos para <strong>"${termo}"</strong>: Mapeamento de autógrafos, variantes textuais críticas, consulta aos aparatos do NA28, BHS/BHQ, SBLGNT e testemunhos na Septuaginta.`;
        }
    },
    "ANL-02": {
        id: "ANL-02",
        titulo: "TRADUÇÃO E TEXTO ORIGINAL",
        isPro: false,
        itens: [
            "Hebraico", "Aramaico", "Grego", "Septuaginta", 
            "Traduções bíblicas", "Comparação de traduções", 
            "Equivalências de tradução", "Diferenças significativas entre traduções"
        ],
        analisar(termo) {
            return `Diretriz de Tradução para <strong>"${termo}"</strong>: Análise comparativa entre equivalências formais e dinâmicas nas principais versões bíblicas a partir dos originais e da LXX.`;
        }
    },
    "ANL-03": {
        id: "ANL-03",
        titulo: "GRAMÁTICA E SINTAXE",
        isPro: false,
        itens: [
            "Morfologia", "Gramática hebraica", "Gramática aramaica", "Gramática grega", 
            "Sintaxe hebraica", "Sintaxe grega", "Estrutura das frases", "Verbos", 
            "Tempos e aspectos", "Voz", "Modo", "Relações sintáticas", "Conectivos"
        ],
        analisar(termo) {
            return `Diretriz Gramatical e Sintática para <strong>"${termo}"</strong>: Exame morfológico, análise de tempos, vozes e modos verbais, além das conexões sintáticas da frase.`;
        }
    },
    "ANL-04": {
        id: "ANL-04",
        titulo: "PALAVRAS E SEMÂNTICA",
        isPro: false,
        itens: [
            "Palavras-chave", "Lemas", "Formas lexicais", "Campo semântico", 
            "Sentido contextual", "Uso no AT", "Uso no NT", "BDAG", "HALOT", "BDB", "LSJ"
        ],
        analisar(termo) {
            return `Diretriz Semântica e Léxica para <strong>"${termo}"</strong>: Consulta a léxicos de referência (BDAG, HALOT, BDB, LSJ) para mapear o lema, campo semântico e ocorrências no AT e NT.`;
        }
    },
    "ANL-05": {
        id: "ANL-05",
        titulo: "SIGNIFICADO TEOLÓGICO",
        isPro: false,
        itens: [
            "Desenvolvimento dos conceitos", "Vocabulário teológico", "Uso teológico no AT", 
            "Uso teológico no NT", "Relação com a LXX", "NIDNTTE", "NIDOTTE", "TDNT", "TDOT"
        ],
        analisar(termo) {
            return `Diretriz Teológica para <strong>"${termo}"</strong>: Investigação do desenvolvimento conceitual nas grandes obras de referência (TDNT, NIDNTTE, TDOT, NIDOTTE).`;
        }
    },
    "ANL-06": {
        id: "ANL-06",
        titulo: "EXEGESE E CONTEXTO LITERÁRIO",
        isPro: false,
        itens: [
            "Contexto imediato", "Contexto da passagem", "Estrutura literária", 
            "Argumento do autor", "Intenção comunicativa", "Gênero literário", 
            "Relação entre versículos", "Exegese versículo a versículo", "Comentários bíblicos", 
            "BECNT", "NIGTC", "NICNT", "Pillar", "WBC", "NICOT", "AOTC", "Baker OT"
        ],
        analisar(termo) {
            return `Diretriz Exegética e Literária para <strong>"${termo}"</strong>: Análise de gênero, estrutura literária imediata e consulta a comentários acadêmicos especializados.`;
        }
    },
    "ANL-07": {
        id: "ANL-07",
        titulo: "CONTEXTO HISTÓRICO, CULTURAL E RELIGIOSO",
        isPro: false,
        itens: [
            "Contexto histórico", "Período histórico", "Cultura", "Costumes", "Sociedade", 
            "Instituições", "Religião", "Práticas religiosas", "Grupos religiosos", 
            "Templos", "Sacerdócio", "Festas", "Crenças", "Zondervan Encyclopedia", 
            "IVP Bible Background Commentary", "New Bible Dictionary", "ANET", 
            "Context of Scripture", "Manners and Customs"
        ],
        analisar(termo) {
            return `Diretriz Histórico-Cultural para <strong>"${termo}"</strong>: Verificação de costumes, instituições e cenários religiosos com base em dicionários e enciclopédias de background bíblico.`;
        }
    },
    "ANL-08": {
        id: "ANL-08",
        titulo: "CONTEXTO GEOGRÁFICO E POLÍTICO",
        isPro: false,
        itens: [
            "Localização geográfica", "Cidades", "Regiões", "Territórios", "Fronteiras", 
            "Rotas", "Montanhas", "Rios", "Reinos", "Impérios", "Governantes", 
            "Estruturas políticas", "Guerras", "Conflitos", "Relações de poder", 
            "Arqueologia", "Atlas bíblico", "Zondervan Atlas"
        ],
        analisar(termo) {
            return `Diretriz Geográfica e Política para <strong>"${termo}"</strong>: Mapeamento de localizações, rotas, cenários geopolíticos e dados arqueológicos/cartográficos.`;
        }
    },
    "ANL-09": {
        id: "ANL-09",
        titulo: "RELAÇÃO COM O RESTANTE DA ESCRITURA",
        isPro: false,
        itens: [
            "Relações AT–NT", "Citações", "Alusões", "Ecos", "Paralelos", 
            "Uso do AT no NT", "LXX e NT", "Relações canônicas", 
            "Desenvolvimento da revelação", "História da redenção", 
            "Beale", "Beale & Carson", "Vos", "Goldsworthy", "Schreiner"
        ],
        analisar(termo) {
            return `Diretriz Canônica e Intertextual para <strong>"${termo}"</strong>: Identificação de citações, alusões, ecos e o desdobramento do tema na história da redenção.`;
        }
    },
    "ANL-10": {
        id: "ANL-10",
        titulo: "HERMENÊUTICA E CONTROLE",
        isPro: false,
        itens: [
            "Controle interpretativo", "Pressupostos", "Eisegese", "Falácias lexicais", 
            "Descontextualização", "Anacronismo", "Alegorização indevida", 
            "Generalizações", "Descrição × prescrição", "Grant Osborne", 
            "D. A. Carson — Exegetical Fallacies", "Carson & Moo", "Dillard & Longman", "Fee & Stuart"
        ],
        analisar(termo) {
            return `Diretriz de Controle Hermenêutico para <strong>"${termo}"</strong>: Aplicação de barreiras contra falácias exegéticas, anacronismos e eisegetizadoras descritas por metodólogos de referência.`;
        }
    },
    "ANL-11": {
        id: "ANL-11",
        titulo: "TEOLOGIA E COMPARAÇÃO",
        isPro: false,
        itens: [
            "Teologia sistemática", "Coerência doutrinária", "Comparação de interpretações", 
            "Concordâncias entre fontes", "Divergências entre fontes", 
            "Argumentos das diferentes interpretações", "Consenso acadêmico", 
            "Posições minoritárias", "Evidências favoráveis e contrárias", 
            "Grudem", "Berkhof", "Frame", "Evangelical Dictionary of Theology", 
            "Comentários bíblicos em comparação"
        ],
        analisar(termo) {
            return `Diretriz Sistemática e Comparativa para <strong>"${termo}"</strong>: Correlação com a teologia sistemática e cotejo entre consensos acadêmicos e posições interpretativas.`;
        }
    },
    "ANL-12": {
        id: "ANL-12",
        titulo: "SÍNTESE",
        isPro: false,
        itens: [
            "Integração das evidências", "Conclusão exegética", "O que o texto afirma", 
            "O que o texto implica", "O que é interpretação", "O que é inferência", 
            "O que é aplicação", "Questões ainda debatidas", 
            "Grau de segurança da conclusão", "Síntese final para geração de conteúdo"
        ],
        analisar(termo) {
            return `Diretriz de Síntese Final para <strong>"${termo}"</strong>: Integração metodológica de todas as evidências colhidas, estabelecendo o grau de segurança exegética e a conclusão aplicada.`;
        }
    }
};
