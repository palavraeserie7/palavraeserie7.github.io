(function () {

    const UI = {

        init() {

            this.renderModules();

            document
                .getElementById("btn-analisar")
                .addEventListener("click", () => {

                    const tema =
                        document
                            .getElementById("tema")
                            .value
                            .trim();

                    const passagem =
                        document
                            .getElementById("passagem")
                            .value
                            .trim();

                    if (!tema && !passagem) {
                        alert(
                            "Informe um tema ou uma passagem bíblica."
                        );
                        return;
                    }

                    const diagnostico =
                        BiblicalResearchRouter.analyze(
                            tema,
                            passagem
                        );

                    this.renderDiagnosis(
                        diagnostico
                    );

                    this.renderModules();

                    document
                        .getElementById("research-area")
                        .scrollIntoView({
                            behavior: "smooth"
                        });

                });

        },

        renderDiagnosis(data) {

            const container =
                document.getElementById("diagnostico");

            container.innerHTML = `

                <div class="diagnostico-item">
                    <small>Passagem</small>
                    <strong>${data.passagem}</strong>
                </div>

                <div class="diagnostico-item">
                    <small>Testamento</small>
                    <strong>${data.testamento}</strong>
                </div>

                <div class="diagnostico-item">
                    <small>Idioma-base</small>
                    <strong>${data.idioma}</strong>
                </div>

                <div class="diagnostico-item">
                    <small>Texto grego</small>
                    <strong>${data.textoGrego}</strong>
                </div>

                <div class="diagnostico-item">
                    <small>BHS / BHQ</small>
                    <strong>${data.bhs}</strong>
                </div>

                <div class="diagnostico-item">
                    <small>NA28 / SBLGNT</small>
                    <strong>${data.na28}</strong>
                </div>

                <div class="diagnostico-item">
                    <small>Septuaginta</small>
                    <strong>${data.septuaginta}</strong>
                </div>

            `;
        },

        renderModules() {

            const container =
                document.getElementById(
                    "modules-container"
                );

            container.innerHTML = "";

            BiblicalResearchStages.forEach(
                (stage, index) => {

                    const module =
                        document.createElement("div");

                    module.className = "module";

                    module.innerHTML = `

                        <div class="module-header">

                            <span class="module-title">
                                ${stage.id}
                                — ${stage.title}
                            </span>

                            <span class="module-status">
                                ${stage.status}
                            </span>

                        </div>

                        <div class="module-body">

                            <div class="submodules">

                                ${stage.submodules
                                    .map(
                                        (sub, subIndex) => `
                                        
                                        <div
                                            class="submodule"
                                            data-stage="${index}"
                                            data-submodule="${subIndex}"
                                        >
                                            ${sub}
                                        </div>

                                        `
                                    )
                                    .join("")}

                            </div>

                        </div>

                    `;

                    const header =
                        module.querySelector(
                            ".module-header"
                        );

                    header.addEventListener(
                        "click",
                        () => {

                            module.classList.toggle(
                                "open"
                            );

                        }
                    );

                    module
                        .querySelectorAll(".submodule")
                        .forEach(item => {

                            item.addEventListener(
                                "click",
                                event => {

                                    event.stopPropagation();

                                    this.openSubmodule(
                                        stage,
                                        item.textContent.trim(),
                                        item
                                    );

                                }
                            );

                        });

                    container.appendChild(module);

                }
            );

        },

        openSubmodule(
            stage,
            submodule,
            element
        ) {

            document
                .querySelectorAll(".submodule")
                .forEach(
                    el =>
                        el.classList.remove(
                            "active"
                        )
                );

            element.classList.add("active");

            const result =
                BiblicalResearchRouter
                    .investigate(
                        stage,
                        submodule
                    );

            const area =
                document.getElementById(
                    "research-area"
                );

            area.innerHTML = `

                <h2>
                    ${result.stage.id}
                    — ${result.stage.title}
                </h2>

                <div class="research-box">

                    <h3>
                        Submódulo:
                        ${result.submodule}
                    </h3>

                    <p>
                        <strong>Objetivo da investigação</strong>
                    </p>

                    <p>
                        ${result.objective}
                    </p>

                    <p>
                        <strong>Procedimento</strong>
                    </p>

                    <p>
                        ${result.method}
                    </p>

                    <p>
                        <strong>Estado da investigação</strong>
                    </p>

                    <p>
                        ${result.conclusion}
                    </p>

                </div>

            `;

            area.scrollIntoView({
                behavior: "smooth"
            });

        }

    };

    window.addEventListener(
        "DOMContentLoaded",
        () => UI.init()
    );

})();
