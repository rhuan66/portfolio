document.addEventListener('DOMContentLoaded', () => {
    // selecionar os elementos que vão ser modificados
    const menuIcon = document.querySelector('.menu-icon')
    const sidebar = document.querySelector('.sidebar')
    const navLinks = document.querySelectorAll('.sidebar a')

    //funcao para abrir e fechar o menu quando quicar no icone
    menuIcon.addEventListener('click', () => {
        sidebar.classList.toggle('open')
        menuIcon.classList.toggle('active')
    })
    //fecha o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(sidebar.classList.contains('open')){
                sidebar.classList.remove('open')
                menuIcon.classList.remove('active')
            }
        })

    })

})