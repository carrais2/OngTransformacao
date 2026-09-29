export function salvarCadastro(nome, email) {
    const lista = JSON.parse(localStorage.getItem('cadastrosONG')) || [];
    lista.push({ nome, email, data: new Date().toLocaleDateString('pt-BR') });
    localStorage.setItem('cadastrosONG', JSON.stringify(lista));
}

export function carregarHistorico() {
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