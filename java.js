function nome() {

      let nome = "melhor turma Web 💙";

      document.getElementById("mensagemSaudacao").textContent =
        "Vocês são a " + nome;
    }


    // ==========================================
    // ELEMENTOS DO FORMULÁRIO
    // ==========================================

    const estadoSelect =
      document.getElementById("estado");

    const municipioSelect =
      document.getElementById("municipio");


    // ==========================================
    // CARREGAR ESTADOS
    // ==========================================

    async function carregarEstados() {

      try {

        const resposta = await fetch(
          "https://brasilapi.com.br/api/ibge/uf/v1"
        );

        const estados = await resposta.json();


        // Ordena os estados pelo nome
        estados.sort(function (a, b) {

          return a.nome.localeCompare(b.nome);

        });


        // Limpa o select
        estadoSelect.innerHTML =
          '<option value="">Selecione um estado</option>';


        // Cria uma opção para cada estado
        estados.forEach(function (estado) {

          const option =
            document.createElement("option");

          option.value = estado.sigla;

          option.textContent =
            estado.nome;

          estadoSelect.appendChild(option);

        });

      } catch (erro) {

        console.error(
          "Erro ao carregar estados:",
          erro
        );

        estadoSelect.innerHTML =
          '<option value="">Erro ao carregar estados</option>';
      }
    }


    // ==========================================
    // CARREGAR MUNICÍPIOS
    // ==========================================

    async function carregarMunicipios() {

      const siglaEstado =
        estadoSelect.value;


      // Se nenhum estado foi selecionado
      if (!siglaEstado) {

        municipioSelect.innerHTML =
          '<option value="">Primeiro selecione um estado</option>';

        municipioSelect.disabled = true;

        return;
      }


      // Mostra mensagem enquanto carrega
      municipioSelect.disabled = true;

      municipioSelect.innerHTML =
        '<option value="">Carregando municípios...</option>';


      try {

        const resposta = await fetch(
          `https://brasilapi.com.br/api/ibge/municipios/v1/${siglaEstado}`
        );

        const municipios =
          await resposta.json();


        // Limpa o select
        municipioSelect.innerHTML =
          '<option value="">Selecione um município</option>';


        // Adiciona os municípios
        municipios.forEach(function (municipio) {

          const option =
            document.createElement("option");

          option.value =
            municipio.nome;

          option.textContent =
            municipio.nome;

          municipioSelect.appendChild(option);

        });


        // Habilita o campo
        municipioSelect.disabled = false;


      } catch (erro) {

        console.error(
          "Erro ao carregar municípios:",
          erro
        );

        municipioSelect.innerHTML =
          '<option value="">Erro ao carregar municípios</option>';

      }

    }


    // ==========================================
    // EVENTO DE ALTERAÇÃO DO ESTADO
    // ==========================================

    estadoSelect.addEventListener(
      "change",
      carregarMunicipios
    );


    // ==========================================
    // ENVIO DO FORMULÁRIO
    // ==========================================

    document
      .getElementById("formulario")
      .addEventListener("submit", function (evento) {

        evento.preventDefault();

        const nomeUsuario =
          document.getElementById("nomeUsuario").value;

        const estado =
          estadoSelect.options[
            estadoSelect.selectedIndex
          ].text;

        const municipio =
          municipioSelect.value;


        document.getElementById(
          "mensagemSaudacao"
        ).textContent =
          `Olá, ${nomeUsuario}! Você é de ${municipio} - ${estado}. 💙`;

      });


    // ==========================================
    // INICIALIZAÇÃO
    // ==========================================

    carregarEstados();