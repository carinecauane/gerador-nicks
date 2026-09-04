const conteudos = [
  // Biologia (Peso Máximo)
  { id: 1, materia: "Biologia", tema: "Citologia: Organelas celulares e suas funções", link: "https://brasilescola.uol.com.br/biologia/o-citoplasma-das-celulas.htm" },
  { id: 2, materia: "Biologia", tema: "Histologia Animal: Tipos de tecidos humanos", link: "https://brasilescola.uol.com.br/biologia/tecidos-humanos.htm" },
  { id: 3, materia: "Biologia", tema: "Genética: MENDELISMO e Biologia Molecular (DNA/RNA)", link: "https://www.todamateria.com.br/leis-de-mendel/" },
  { id: 4, materia: "Biologia", tema: "Microbiologia: Bactérias e Vírus (Relação com cáries e patologias)", link: "https://www.todamateria.com.br/bacterias/" },
  { id: 5, materia: "Biologia", tema: "Ecologia: Cadeias alimentares e Relações ecológicas", link: "https://brasilescola.uol.com.br/biologia/cadeia-alimentar.htm" },
  { id: 6, materia: "Biologia", tema: "Fisiologia Humana: Sistema Imunológico e Circulatório", link: "https://brasilescola.uol.com.br/biologia/sistema-imunologico.htm" },
  { id: 7, materia: "Biologia", tema: "Bioquímica: Enzimas, Proteínas e Carboidratos", link: "https://www.todamateria.com.br/proteinas/" },
  
  // Química (Peso Alto)
  { id: 8, materia: "Química", tema: "Química Orgânica: Funções orgânicas e Isomeria", link: "https://brasilescola.uol.com.br/quimica/funcoes-organicas.htm" },
  { id: 9, materia: "Química", tema: "Estequiometria: Cálculos de massa, mols e rendimento", link: "https://www.todamateria.com.br/calculo-estequiometrico/" },
  { id: 10, materia: "Química", tema: "Equilíbrio Químico: pH, pOH e Soluções Tampão", link: "https://brasilescola.uol.com.br/quimica/equilibrio-quimico.htm" },
  { id: 11, materia: "Química", tema: "Soluções: Concentração comum, molaridade e diluição", link: "https://www.todamateria.com.br/concentracao-comum/" },
  { id: 12, materia: "Química", tema: "Eletroquímica: Pilhas, baterias e oxirredução", link: "https://brasilescola.uol.com.br/quimica/eletroquimica.htm" },

  // Física
  { id: 13, materia: "Física", tema: "Ondulatória: Acústica, comprimento de onda e frequência", link: "https://www.todamateria.com.br/ondulatoria/" },
  { id: 14, materia: "Física", tema: "Óptica Geométrica: Reflexão e refração da luz", link: "https://brasilescola.uol.com.br/fisica/optica-geometrica.htm" },
  { id: 15, materia: "Física", tema: "Termologia: Calorimetria e trocas de calor", link: "https://www.todamateria.com.br/calorimetria/" },

  // Matemática
  { id: 16, materia: "Matemática", tema: "Estatística Básica: Média, moda e variação", link: "https://brasilescola.uol.com.br/matematica/estatistica-2.htm" },
  { id: 17, materia: "Matemática", tema: "Regra de Três Composta e Porcentagem", link: "https://www.todamateria.com.br/regra-de-tres-composta/" },
  { id: 18, materia: "Matemática", tema: "Geometria Espacial: Volumes de sólidos", link: "https://brasilescola.uol.com.br/matematica/geometria-espacial.htm" },

  // Redação & Humanas
  { id: 19, materia: "Redação", tema: "Prática: Redação sobre Saúde Pública no Brasil", link: "https://www.todamateria.com.br/como-fazer-uma-boa-redacao/" },
  { id: 20, materia: "Humanas", tema: "Filosofia & Sociologia: Ética, Bioética e Sociedade", link: "https://brasilescola.uol.com.br/filosofia/bioetica.htm" }
];

let estudados = JSON.parse(localStorage.getItem('odonto_estudados')) || [];
let temaAtual = null;

function salvarEstado() {
  localStorage.setItem('odonto_estudados', JSON.stringify(estudados));
  atualizarProgresso();
}

function gerarConteudo() {
  const prioridade = document.getElementById("prioritySelect").value;
  const ocultarEstudados = document.getElementById("hideStudiedCheck").checked;

  let listaFiltrada = conteudos;

  if (prioridade !== "todas") {
    listaFiltrada = listaFiltrada.filter(c => c.materia === prioridade);
  }

  if (ocultarEstudados) {
    listaFiltrada = listaFiltrada.filter(c => !estudados.includes(c.id));
  }

  if (listaFiltrada.length === 0) {
    document.getElementById("subjectTag").innerText = "Aviso";
    document.getElementById("topicTitle").innerText = "Parabéns! Você já estudou todos os tópicos desse filtro ou nenhum atende aos critérios.";
    document.getElementById("actionRow").style.display = "none";
    temaAtual = null;
    return;
  }

  const indice = Math.floor(Math.random() * listaFiltrada.length);
  temaAtual = listaFiltrada[indice];

  document.getElementById("subjectTag").innerText = temaAtual.materia;
  document.getElementById("topicTitle").innerText = temaAtual.tema;
  
  const studyLink = document.getElementById("studyLink");
  studyLink.href = temaAtual.link;

  const checkEstudado = document.getElementById("markStudiedCheck");
  checkEstudado.checked = estudados.includes(temaAtual.id);
  document.getElementById("actionRow").style.display = "flex";
}

function marcarComoEstudado() {
  if (!temaAtual) return;

  const isChecked = document.getElementById("markStudiedCheck").checked;
  if (isChecked) {
    if (!estudados.includes(temaAtual.id)) {
      estudados.push(temaAtual.id);
    }
  } else {
    estudados = estudados.filter(id => id !== temaAtual.id);
  }

  salvarEstado();
}

function atualizarProgresso() {
  const total = conteudos.length;
  const qtdEstudados = estudados.length;
  const porcentagem = Math.round((qtdEstudados / total) * 100);

  document.getElementById("progressText").innerText = `Progresso Geral: ${qtdEstudados} / ${total} estudados (${porcentagem}%)`;
  document.getElementById("progressFill").style.width = `${porcentagem}%`;
}

function resetarProgresso() {
  if (confirm("Tem certeza de que deseja resetar seu progresso de estudos?")) {
    estudados = [];
    salvarEstado();
    if (temaAtual) {
      document.getElementById("markStudiedCheck").checked = false;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarProgresso();

  document.getElementById("btnGerar").addEventListener("click", gerarConteudo);
  document.getElementById("markStudiedCheck").addEventListener("change", marcarComoEstudado);
  document.getElementById("hideStudiedCheck").addEventListener("change", atualizarProgresso);
  document.getElementById("btnReset").addEventListener("click", resetarProgresso);
});