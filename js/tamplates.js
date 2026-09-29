export const listaProjetos = [
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

export function gerarCardsProjetos(dados) {
    return dados.map(projeto => `
        <article class="cartao card-projeto">
            <span class="badge badge-sucesso tag">${projeto.categoria}</span>
            <h3>${projeto.titulo}</h3>
            <p>${projeto.descricao}</p>
            <button class="btn btn-primario" data-rota="cadastro">Participar do Projeto</button>
        </article>
    `).join('');
}

export function templateInicio() {
    return `
        <section class="voluntariado secao-projetos">
            ${gerarCardsProjetos(listaProjetos)}
        </section>
    `;
}

export function templateCadastro() {
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