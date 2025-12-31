const darkModeBtn = document.getElementById('darkModeBtn');
const body = document.body;
const icon = darkModeBtn.querySelector('i');

darkModeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if(body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});
