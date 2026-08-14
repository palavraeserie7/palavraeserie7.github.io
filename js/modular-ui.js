/**
 * INTERFACE DA PESQUISA MODULAR
 *
 * Este arquivo controla somente:
 * pages/pesquisa-modular.html
 *
 * Não interfere no dashboard existente.
 */

const ModularUI = (() => {


    let selectedDepth = 1;


    function init() {

        renderModules();

        renderDepths();

    }


    function renderModules() {

        const select =
            document.getElementById("module");

        if (!select) return;


        select.innerHTML = "";


        ModularEngine
            .getModules()
            .forEach(module => {

                const option =
                    document.createElement("option");

                option.value = module.id;

                option.textContent =
                    `${module.id} — ${module.name}`;

                select.appendChild(option);

            });

    }


    function renderDepths() {

        const container =
            document.getElementById(
                "depth-container"
            );

        if (!container) return;


        container.innerHTML = "";


        ModularEngine
            .getDepths()
            .forEach(depth => {

                const button =
                    document.createElement("div");


                button.className =
                    "depth" +
                    (
                        depth.id === selectedDepth
                            ? " active"
                            : ""
                    );


                button.innerHTML = `
                    <strong>
                        ${depth.id}
                    </strong>

                    ${depth.name}
                `;


                button.title =
                    depth.description;


                button.onclick = () => {

                    selectedDepth =
                        depth.id;

                    renderDepths();

                };


                container.appendChild(button);

            });

    }


    function startResearch() {

        const theme =
            document
                .getElementById("theme")
                .value
                .trim();


        const passage =
            document
                .getElementById("passage")
                .value
                .trim();


        const moduleId =
            document
                .getElementById("module")
                .value;


        if (!theme) {

            alert(
                "Digite o tema ou termo que deseja investigar."
            );

            return;

        }


        const research =
            ModularEngine.buildResearch(
                theme,
                passage || "Não informado",
                moduleId,
                selectedDepth
            );


        renderResearch(research);

    }


    function renderResearch(research) {

        const result =
            document.getElementById("result");


        const header =
            document.getElementById(
                "result-header"
            );


        const tree =
            document.getElementById("tree");


        result.style.display = "block";


        header.innerHTML = `

            <h2>
                ${research.module.id}
                — ${research.module.name}
            </h2>

            <div class="result-meta">

                <strong>Tema:</strong>
                ${escapeHTML(research.theme)}

                &nbsp; | &nbsp;

                <strong>Passagem:</strong>
                ${escapeHTML(research.passage)}

                &nbsp; | &nbsp;

                <strong>Profundidade:</strong>
                ${research.depth}
                —
                ${ModularEngine
                    .getDepths()
                    .find(d => d.id === research.depth)
                    .name}

            </div>

        `;


        tree.innerHTML = "";


        research.nodes.forEach(
            node => {

                const element =
                    createNode(node);

                tree.appendChild(element);

            }
        );


        result.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    function createNode(node) {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "tree-node";


        const header =
            document.createElement("div");

        header.className =
            "node-header";


        header.innerHTML = `

            <span class="node-title">

                ${node.id}
                — ${escapeHTML(node.title)}

            </span>

            <span class="node-arrow">
                ▼
            </span>

        `;


        const content =
            document.createElement("div");

        content.className =
            "node-content";


        node.subnodes.forEach(
            (subnode, index) => {

                const sub =
                    document.createElement("div");

                sub.className =
                    "subnode";


                sub.innerHTML = `

                    <div class="subnode-title">

                        ${node.id}.
                        ${index + 1}
                        — ${escapeHTML(subnode)}

                    </div>

                `;


                content.appendChild(sub);

            }
        );


        if (node.subnodes.length > 0) {

            const instruction =
                document.createElement("div");

            instruction.className =
                "research-instruction";


            instruction.innerHTML = `

                <strong>
                    Roteiro de investigação
                </strong>

                <br><br>

                Este nível define quais perguntas,
                evidências e relações deverão ser
                investigadas dentro de
                <strong>
                    ${escapeHTML(node.title)}
                </strong>.

                <br><br>

                O próximo estágio do motor poderá
                substituir este roteiro por evidências
                provenientes das fontes selecionadas.

            `;


            content.appendChild(
                instruction
            );

        }


        header.onclick = () => {

            content.classList.toggle("open");

        };


        wrapper.appendChild(header);

        wrapper.appendChild(content);


        return wrapper;

    }


    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    return {

        init,

        startResearch

    };

})();


document.addEventListener(
    "DOMContentLoaded",
    () => {

        ModularUI.init();

    }
);
