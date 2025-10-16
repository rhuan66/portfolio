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


    // Lógica do Modal de Projetos (ADICIONADO)
    const projectModal = document.getElementById('project-modal');
    const closeButton = projectModal.querySelector('.close-button');
    const projectElements = document.querySelectorAll('.project');
    
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const mediaContainer = document.getElementById('media-container'); 


    // Função para montar e exibir o player correto (video ou iframe)
    const buildMediaPlayer = (url) => {
        // Limpa o conteúdo anterior
        mediaContainer.innerHTML = ''; 
        let playerHTML = '';

        // Converte o URL para minúsculas para facilitar a checagem
        const lowerUrl = url.toLowerCase();

        if (!url || url.trim() === '') {
             playerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 50px 0;">Nenhum vídeo de demonstração disponível para este projeto.</p>`;
        } else if (lowerUrl.includes('youtube.com/embed/') || lowerUrl.includes('vimeo.com/')) {
            // Se for um link de incorporação (YouTube, Vimeo, etc.), usa iframe
            playerHTML = `<iframe title="Vídeo de Demonstração" width="100%" height="315" src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        } else if (lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.webm') || lowerUrl.endsWith('.ogg')) {
            // Se for um arquivo de vídeo (MP4, WebM, etc.), usa a tag <video>
            // Adicionado 'autoplay' e 'muted' para compatibilidade com a maioria dos navegadores modernos
            playerHTML = `<video width="100%" height="100%" controls autoplay muted>
                              <source src="${url}" type="video/${url.split('.').pop()}">
                              Seu navegador não suporta a tag de vídeo.
                          </video>`;
        } else {
            // Caso o URL não seja reconhecido
            playerHTML = `<p style="color: var(--text-muted); text-align: center;">Não foi possível carregar a mídia. URL inválida ou não suportada: ${url}</p>`;
        }
        
        // Insere o código HTML gerado no contêiner
        mediaContainer.innerHTML = playerHTML;
    }


    // Função para abrir o modal
    const openModal = (title, description, videoUrl) => {
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        // Monta o player com base no URL
        buildMediaPlayer(videoUrl); 
        
        projectModal.style.display = 'block';
        body.style.overflow = 'hidden'; // Evita a rolagem da página principal
    };

    // Função para fechar o modal
    const closeModal = () => {
        projectModal.style.display = 'none';
        mediaContainer.innerHTML = ''; // Limpa o player para PARAR a reprodução
        body.style.overflow = ''; // Restaura a rolagem da página
    };

    // 1. Adiciona o listener de clique a cada elemento de projeto
    projectElements.forEach(project => {
        project.addEventListener('click', () => {
            const title = project.getAttribute('data-title');
            const description = project.getAttribute('data-description');
            const videoUrl = project.getAttribute('data-video-url');
            
            // Verifica se os dados necessários existem antes de abrir
            if (title && description) { 
                openModal(title, description, videoUrl || ''); 
            } else {
                // Ação de fallback ou alerta se faltarem dados essenciais
                // alert('Erro: Dados essenciais do projeto ausentes.');
            }
        });
    });

    // 2. Listener para fechar o modal no botão 'x'
    closeButton.addEventListener('click', closeModal);

    // 3. Listener para fechar o modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            closeModal();
        }
    });

    // 4. Listener para fechar o modal na tecla ESC
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && projectModal.style.display === 'block') {
            closeModal();
        }
    });
});