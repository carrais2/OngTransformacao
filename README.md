# ONG Transformação - Plataforma Web Front-End

## 1. Visão Geral do Projeto
Plataforma web desenvolvida para a ONG Transformação, com foco na apresentação institucional, divulgação de projetos sociais e captação de voluntariado.

## 2. Tecnologias e Acessibilidade (WCAG)
- **HTML5 Semântico**: Utilização de marcos estruturais (<header>, <nav>, <main>, <footer>) em substituição de divs genéricas.
- **Atributos WAI-ARIA**: Integração de ole="dialog", ria-modal="true", ria-required="true" e ria-describedby para suporte a leitores de ecrã.
- **JavaScript (ES6+)**: Scripts na pasta js/ com navegação SPA, templates dinâmicos, validação de formulário e persistência no localStorage.

## 3. Instalação Local e Execução
1. Clone o repositório: git clone https://github.com/carrais2/OngTransformacao.git
2. Abra a pasta do projeto no **Visual Studio Code**.
3. Abra o arquivo html/index.html e utilize o **Live Server** para executar.

## 4. Práticas de Versionamento
- **GitFlow**: Ramificações main, develop, eature/* e hotfix/*.
- **Conventional Commits**: Padrão chore:, eat:, ix: e docs:.
- **Release Semântica**: Versão estável 1.0.0.
