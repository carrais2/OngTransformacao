export function validarFormulario() {
    const inputNome = document.querySelector('#nome');
    const inputEmail = document.querySelector('#email');
    if (!inputNome || !inputEmail) return false;

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let formularioValido = true;

    if (inputNome.value.trim().length < 3) {
        definirEstado(inputNome, false, 'Por favor, insira o seu nome completo.');
        formularioValido = false;
    } else {
        definirEstado(inputNome, true, 'Nome válido.');
    }

    if (!regexEmail.test(inputEmail.value.trim())) {
        definirEstado(inputEmail, false, 'Insira um endereço de e-mail válido (ex: nome@dominio.com).');
        formularioValido = false;
    } else {
        definirEstado(inputEmail, true, 'Formato de e-mail correto.');
    }

    return formularioValido;
}

export function definirEstado(campo, valido, mensagem) {
    const aviso = campo.nextElementSibling;
    
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