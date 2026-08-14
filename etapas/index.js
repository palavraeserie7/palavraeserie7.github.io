/*
 * MATRIZ DE ANÁLISE BÍBLICA
 * Registro oficial dos 12 ANLs.
 *
 * IMPORTANTE:
 * Este arquivo apenas registra os módulos.
 * Não contém lógica de análise.
 */

import { runANL01 } from "./anl-01.js";
import { runANL02 } from "./anl-02.js";
import { runANL03 } from "./anl-03.js";
import { runANL04 } from "./anl-04.js";
import { runANL05 } from "./anl-05.js";
import { runANL06 } from "./anl-06.js";
import { runANL07 } from "./anl-07.js";
import { runANL08 } from "./anl-08.js";
import { runANL09 } from "./anl-09.js";
import { runANL10 } from "./anl-10.js";
import { runANL11 } from "./anl-11.js";
import { runANL12 } from "./anl-12.js";

export const MATRIZ_ETAPAS = [
    {
        id: "ANL-01",
        titulo: "TEXTO E MANUSCRITOS",
        executar: runANL01
    },
    {
        id: "ANL-02",
        titulo: "TRADUÇÃO E TEXTO ORIGINAL",
        executar: runANL02
    },
    {
        id: "ANL-03",
        titulo: "GRAMÁTICA E SINTAXE",
        executar: runANL03
    },
    {
        id: "ANL-04",
        titulo: "PALAVRAS E SEMÂNTICA",
        executar: runANL04
    },
    {
        id: "ANL-05",
        titulo: "SIGNIFICADO TEOLÓGICO",
        executar: runANL05
    },
    {
        id: "ANL-06",
        titulo: "EXEGESE E CONTEXTO LITERÁRIO",
        executar: runANL06
    },
    {
        id: "ANL-07",
        titulo: "CONTEXTO HISTÓRICO, CULTURAL E RELIGIOSO",
        executar: runANL07
    },
    {
        id: "ANL-08",
        titulo: "CONTEXTO GEOGRÁFICO E POLÍTICO",
        executar: runANL08
    },
    {
        id: "ANL-09",
        titulo: "RELAÇÃO COM O RESTANTE DA ESCRITURA",
        executar: runANL09
    },
    {
        id: "ANL-10",
        titulo: "HERMENÊUTICA E CONTROLE",
        executar: runANL10
    },
    {
        id: "ANL-11",
        titulo: "TEOLOGIA E COMPARAÇÃO",
        executar: runANL11
    },
    {
        id: "ANL-12",
        titulo: "SÍNTESE",
        executar: runANL12
    }
];
