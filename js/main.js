// Módulos da aplicação:
// import { templateInicio, templateCadastro } from './templates.js';
// import { validarFormulario } from './validacao.js';
// import { salvarCadastro, carregarHistorico } from './storage.js';

const rotas = {
    'inicio': templateInicio,
    'cadastro': templateCadastro
};

function navegarPara(rota) {
    const containerPrincipal = document.querySelector('main');
    if (!containerPrincipal) return;
    
    // Limpa o contêiner alvo e injeta o novo fragmento HTML
    containerPrincipal.innerHTML = '';
    const renderizarTela = rotas[rota] || rotas['inicio'];
    containerPrincipal.innerHTML = renderizarTela();

    // Atualiza a URL com hash via History API sem recarregar a página
    window.history.pushState({ rota }, '', `#${rota}`);

    if (rota === 'cadastro') {
        carregarHistorico();
    }
}

document.addEventListener('click', (evento) => {
    const elementoNavegacao = evento.target.closest('[data-rota]');
    if (elementoNavegacao) {
        evento.preventDefault();
        const destino = elementoNavegacao.getAttribute('data-rota');
        navegarPara(destino);
    }
});

window.addEventListener('popstate', (evento) => {
    const rotaAtiva = (evento.state && evento.state.rota) ? evento.state.rota : 'inicio';
    navegarPara(rotaAtiva);
});

// 1. Dados de origem dos projetos da ONG
const listaProjetos = [
    {
        categoria: 'Educação',
        titulo: 'Projeto Apoio Escolar',
        descricao: 'Aulas de reforço e oficinas de leitura para crianças e adolescentes da comunidade.'
    },
    {
        categoria: 'Assistência Social',
        titulo: 'Banco de Alimentos',
        descricao: 'Arrecadação e distribuição de cestas básicas para famílias em situação de vulnerabilidade.'
    }
];

// 2. Função que converte os dados em cards HTML usando map e Template Literals
function gerarCardsProjetos(dados) {
    return dados.map(projeto => `
        <article class="cartao card-projeto">
            <span class="badge badge-sucesso tag">${projeto.categoria}</span>
            <h3>${projeto.titulo}</h3>
            <p>${projeto.descricao}</p>
            <button class="btn btn-primario" data-rota="cadastro">Participar do Projeto</button>
        </article>
    `).join('');
}

// 3. Template da tela inicial integrando os componentes dinâmicos
function templateInicio() {
    return `
        <section class="voluntariado secao-projetos">
            ${gerarCardsProjetos(listaProjetos)}
        </section>
    `;
}

// Template da tela de cadastro (acao.html) para o const rotas lá do topo funcionar
function templateCadastro() {
    return `
        <section class="secao-formulario" style="grid-column: span 12;">
            <h2>Área de Envolvimento e Cadastro</h2>
            <p>Você foi direcionado para a página de ações da <strong>ONG Transformação</strong>. Preencha os campos abaixo para concluir sua participação ou doação.</p>
            <form class="form-contato" novalidate>
                <div class="grupo-input">
                    <label for="nome">Nome Completo</label>
                    <input type="text" id="nome" class="input-sucesso" placeholder="Digite seu nome completo" required>
                    <span class="mensagem-validacao sucesso">Campo pronto para preenchimento.</span>
                </div>
                <div class="grupo-input">
                    <label for="email">E-mail de Contato</label>
                    <input type="email" id="email" class="input-erro" required>
                    <span class="mensagem-validacao erro">Preencha um e-mail válido.</span>
                </div>
                <button type="submit" class="btn btn-primario">Enviar Dados</button>
            </form>
            <br>
            <a href="index.html" data-rota="inicio" class="btn btn-secundario">Voltar para a Página Inicial</a>
        </section>
    `;
}

// 4. Rotina de validação no ficheiro /js/main.js
function validarFormulario() {
    const inputNome = document.querySelector('#nome');
    const inputEmail = document.querySelector('#email');
    if (!inputNome || !inputEmail) return false;

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let formularioValido = true;

    // Validação do Nome
    if (inputNome.value.trim().length < 3) {
        definirEstado(inputNome, false, 'Por favor, insira o seu nome completo.');
        formularioValido = false;
    } else {
        definirEstado(inputNome, true, 'Nome válido.');
    }

    // Validação do E-mail com RegEx
    if (!regexEmail.test(inputEmail.value.trim())) {
        definirEstado(inputEmail, false, 'Insira um endereço de e-mail válido (ex: nome@dominio.com).');
        formularioValido = false;
    } else {
        definirEstado(inputEmail, true, 'Formato de e-mail correto.');
    }

    return formularioValido;
}

function definirEstado(campo, valido, mensagem) {
    const aviso = campo.nextElementSibling; // Seleciona a tag de mensagem abaixo do input
    
    if (!valido) {
        campo.classList.remove('input-sucesso');
        campo.classList.add('input-erro');
        aviso.classList.remove('sucesso');
        aviso.classList.add('erro');
        aviso.textContent = mensagem;
    } else {
        campo.classList.remove('input-erro');
        campo.classList.add('input-sucesso');
        aviso.classList.remove('erro');
        aviso.classList.add('sucesso');
        aviso.textContent = mensagem;
    }
}

// 5. Retenção de dados no navegador (localStorage)
function salvarCadastro(nome, email) {
    const lista = JSON.parse(localStorage.getItem('cadastrosONG')) || [];
    lista.push({ nome, email, data: new Date().toLocaleDateString('pt-BR') });
    localStorage.setItem('cadastrosONG', JSON.stringify(lista));
}

function carregarHistorico() {
    const dados = localStorage.getItem('cadastrosONG');
    if (!dados) return;

    const lista = JSON.parse(dados);
    const ultimo = lista[lista.length - 1];
    const inputNome = document.querySelector('#nome');
    const inputEmail = document.querySelector('#email');

    if (inputNome && inputEmail && ultimo) {
        inputNome.value = ultimo.nome;
        inputEmail.value = ultimo.email;
    }
}

document.addEventListener('DOMContentLoaded', carregarHistorico);

// 6. Gatilhos que ativam a validação ao digitar e ao enviar (com SweetAlert2)
document.addEventListener('input', (evento) => {
    if (evento.target.matches('#nome, #email')) {
        validarFormulario();
    }
});

document.addEventListener('submit', (evento) => {
    if (evento.target.matches('.form-contato')) {
        evento.preventDefault();
        if (validarFormulario()) {
            const nome = document.querySelector('#nome').value.trim();
            const email = document.querySelector('#email').value.trim();
            salvarCadastro(nome, email);

            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'Cadastro Confirmado!',
                    text: 'Obrigado por apoiar a ONG Transformação.',
                    icon: 'success',
                    confirmButtonColor: '#2E7D32'
                });
            } else {
                alert('Dados enviados com sucesso!');
            }
            evento.target.reset();
        }
    }
});