document.addEventListener('DOMContentLoaded', () => {
    // pegas os elementos que vão ser modificados
    const menuIcon = document.querySelector('.menu-icon');
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelectorAll('.sidebar a');
    // pegas os elementos do botao de tema para ser modificado
    const themeToggle = document.getElementById('theme-toggle');
    const iconSun = themeToggle.querySelector('.icon-sun');
    const iconMoon = themeToggle.querySelector('.icon-moon');
    const body = document.body;

    // função para aplicar o tema ao body e alternar os ícones visíveis
    const applyTheme = (isLight) => {
        if (isLight) {
            body.classList.add('light-theme');
        } else {
            body.classList.remove('light-theme');
        }
    };

    // função para carregar a preferência de tema ao iniciar o site
    const loadTheme = () => {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'light') {
            applyTheme(true);
        } else if (savedTheme === 'dark') {
            applyTheme(false);
        } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            // Se não houver preferência salva, verifica o padrão do sistema
            applyTheme(true);
        } else {
            // Padrão: modo escuro
            applyTheme(false);
        }
    };
    
    // evento para alternar o tema ao clicar no botão
    themeToggle.addEventListener('click', () => {
        const isLight = body.classList.contains('light-theme');
        applyTheme(!isLight); // Inverte o tema atual
        
        const theme = !isLight ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
    });
    
    // carrega o tema na inicialização da página
    loadTheme();
    
    //  abrir/fechar o menu lateral
    menuIcon.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        menuIcon.classList.toggle('active');
    });
    
    // fecha o menu lateral ao clicar em um link 
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(sidebar.classList.contains('open')){
                sidebar.classList.remove('open');
                menuIcon.classList.remove('active');
            }
        });
    });
});