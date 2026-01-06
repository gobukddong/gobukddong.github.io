document.addEventListener("DOMContentLoaded", () => {
    const hiddenElements = document.querySelectorAll('#header > *, section h2, section h3, section p, section li, section .award-item');

    hiddenElements.forEach((el) => el.classList.add('scroll-hidden'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px"
    });

    hiddenElements.forEach((el) => observer.observe(el));
});


// 다크모드 버튼 기능
const darkModeBtn = document.getElementById('darkModeBtn');
if (darkModeBtn) {
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = darkModeBtn.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}