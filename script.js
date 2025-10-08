document.addEventListener('DOMContentLoaded', () => {
    //configuração de elementos 
    
    // elementos do menu e navegação
    const menuIcon = document.querySelector('.menu-icon');
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelectorAll('.sidebar a');

    // elementos do tema
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // elementos do formulário de contato
    const contactForm = document.getElementById('contact-form');
    const emailInput = document.getElementById('email');


    //lógica do tema claro/escuro

    // checa se o tema salvo é 'light' ou se o sistema do usuário prefere o modo claro.
    const loadTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

        // aplica o tema: 'light' se for a preferência salva ou do sistema.
        if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
            body.classList.add('light-theme');
        } else {
            // padrão é sempre o modo escuro, se não houver preferência.
            body.classList.remove('light-theme');
        }
    };
    
    // troca o tema quando o botão é clicado
    themeToggle.addEventListener('click', () => {
        const isLight = body.classList.contains('light-theme');

        // se está claro, remove a classe (vai para o escuro). se não, adiciona (vai para o claro).
        if (isLight) {
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // carrega o tema quando a página abre
    loadTheme();


    //lógica do menu responsivo
    
    // abre/fecha o menu lateral ao clicar no ícone
    menuIcon.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        menuIcon.classList.toggle('active');
    });
    
    // fecha o menu lateral quando um link é clicado
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // checa se o menu está aberto antes de tentar fechar
            if (sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                menuIcon.classList.remove('active');
            }
        });
    });

    // validação e envio simulado do formulário 

    // função para checar se o e-mail parece válido
    const isValidEmail = (email) => {
        // expressão simples para checar o formato basico: algo@algo.algo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // impede que o formulário recarregue a página

        // pega os valores e remove espaços extras no começo/fim
        const nome = document.getElementById('nome').value.trim();
        const email = emailInput.value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        // validação 1: campos vazios (nome, e-mail, mensagem)
        if (nome === '' || email === '' || mensagem === '') {
            alert('erro: por favor, preencha todos os campos.');
            return; // para o envio
        }

        // validação 2: formato de e-mail
        if (!isValidEmail(email)) {
            alert('erro: por favor, insira um e-mail válido (ex: seu.nome@dominio.com).');
            return; // para o envio
        }

        // simulação de sucesso
        
        // limpa todos os campos do formulário
        contactForm.reset(); 

        // mensagem de confirmação para o usuário
        alert('mensagem enviada com sucesso! em breve entrarei em contato.');
    });
});