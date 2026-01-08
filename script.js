document.addEventListener("DOMContentLoaded", () => {
    
    // [삭제됨] GSAP 스크롤 애니메이션 코드는 제거했습니다.

    // --- 1. Theme Toggle Logic ---
    const themeBtn = document.getElementById("themeBtn");
    
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const body = document.body;
            const icon = themeBtn.querySelector('i');
            
            // Toggle the class
            body.classList.toggle('light-mode');
            
            // Check current state AFTER toggle
            if (body.classList.contains('light-mode')) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        });
    }

    // --- 2. Command Palette Logic ---
    const dialog = document.getElementById("commandPalette");
    const cmdBtn = document.getElementById("cmdBtn");
    const cmdInput = document.getElementById("cmdInput");
    const cmdList = document.getElementById("cmdList");

    // [수정] 비어있던 명령어 리스트를 채웠습니다 (이게 비어있으면 터미널이 작동 안 함)
    const commands = [
        {
            id: 'top',
            label: 'Go to Top',
            icon: 'fas fa-arrow-up',
            action: () => window.scrollTo({ top: 0, behavior: 'smooth' })

        },
        {
            id: 'bottom',
            label: 'Go to Bottom',
            icon: 'fas fa-arrow-down',
            action: () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })

        },
        { 
            id: 'projects', 
            label: 'Go to Projects', 
            icon: 'fas fa-folder-open', 
            action: () => scrollTo('.project-card') 
        },
        { 
            id: 'stats', 
            label: 'View GitHub Stats', 
            icon: 'fas fa-chart-pie', 
            action: () => scrollTo('.stats-card') 
        },
        { 
            id: 'stack', 
            label: 'Check Tech Stack', 
            icon: 'fas fa-layer-group', 
            action: () => scrollTo('.stack-card') 
        },
        { 
            id: 'contact', 
            label: 'Contact Me', 
            icon: 'fas fa-envelope', 
            action: () => scrollTo('.social-card') 
        },

        {
            id: 'ls',
            label: 'ls',
            icon: 'fas fa-folder-open',
            action: () => {
                alert(
                    "drwxr-xr-x  root  yang  4096  ./Profile\n" +
                    "drwxr-xr-x  root  yang  4096  ./Stats\n" +
                    "drwxr-xr-x  root  yang  4096  ./Projects\n" +
                    "drwxr-xr-x  root  yang  4096  ./Stack\n" +
                    "-rw-r--r--  root  yang  2048  awards.txt\n" +
                    "-rwxr-x---  root  yang  1024  contact.sh"
                );
            }
        },

        {
            id: 'clear',
            label: 'clear', 
            icon: 'fas fa-eraser',
            action: () => {
               
                window.scrollTo({ top: 0, behavior: 'auto' });
                
           
                const flash = document.createElement('div');
                flash.style.position = 'fixed';
                flash.style.top = '0';
                flash.style.left = '0';
                flash.style.width = '100vw';
                flash.style.height = '100vh';
                flash.style.backgroundColor = '#000';
                flash.style.zIndex = '9999';
                flash.style.opacity = '1';
                flash.style.transition = 'opacity 0.5s ease';
                
                document.body.appendChild(flash);
                
              
                setTimeout(() => {
                    flash.style.opacity = '0';
                    setTimeout(() => flash.remove(), 100);
                }, 700);
            }
        }
    ];

    let selectedIndex = 0;
    let filteredCommands = [...commands];

    function scrollTo(selector) {
        const el = document.querySelector(selector);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    const openPalette = () => {
        if (dialog) {
            dialog.showModal();
            cmdInput.value = '';
            filterCommands('');
            cmdInput.focus();
        }
    };

    const closePalette = () => {
        if (dialog) dialog.close();
    };

    if (cmdBtn) {
        cmdBtn.addEventListener("click", openPalette);
    }
    
    document.addEventListener("keydown", (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
            e.preventDefault(); 
            if (dialog && dialog.open) closePalette();
            else openPalette();
        }
    });

    if (dialog) {
        dialog.addEventListener("click", (e) => {
            const rect = dialog.getBoundingClientRect();
            const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
            rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
            if (!isInDialog) dialog.close();
        });
    }

    function renderCommands() {
        if (!cmdList) return;
        cmdList.innerHTML = '';
        filteredCommands.forEach((cmd, index) => {
            const li = document.createElement("li");
            li.className = `cmd-item ${index === selectedIndex ? 'selected' : ''}`;
            li.innerHTML = `
                <span><i class="${cmd.icon}"></i> ${cmd.label}</span>
                <span style="font-size:0.8em; opacity:0.5;">↵</span>
            `;
            li.addEventListener("click", () => executeCommand(cmd));
            li.addEventListener("mouseenter", () => {
                selectedIndex = index;
                const items = cmdList.querySelectorAll('.cmd-item');
                items.forEach(item => item.classList.remove('selected'));
                li.classList.add('selected');
            });
            cmdList.appendChild(li);
        });
        
        if (filteredCommands.length === 0) {
            cmdList.innerHTML = '<li class="cmd-item" style="justify-content:center; color: var(--muted);">No commands found</li>';
        }
    }

    function filterCommands(query) {
        if (!query) {
            filteredCommands = [...commands];
        } else {
            const lowerQuery = query.toLowerCase();
            filteredCommands = commands.filter(cmd => 
                cmd.label.toLowerCase().includes(lowerQuery) || cmd.id.includes(lowerQuery)
            );
        }
        selectedIndex = 0;
        renderCommands();
    }

    function executeCommand(cmd) {
        closePalette();
        cmd.action();
    }

    if (cmdInput) {
        cmdInput.addEventListener("input", (e) => {
            filterCommands(e.target.value);
        });

        cmdInput.addEventListener("keydown", (e) => {
            if (e.key === "ArrowDown") {
                selectedIndex = (selectedIndex + 1) % filteredCommands.length;
                renderCommands();
                e.preventDefault();
            } else if (e.key === "ArrowUp") {
                selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
                renderCommands();
                e.preventDefault();
            } else if (e.key === "Enter") {
                if (filteredCommands[selectedIndex]) {
                    executeCommand(filteredCommands[selectedIndex]);
                }
            } else if (e.key === "Escape") {
                closePalette();
            }
        });
    }

    const textElement = document.querySelector('.role-text');
    
    const textToType = "Hello!\nI am Yang sangyun, majoring in Software.\nSkilled in C, Python, Linux, and JavaScript.\nI am currently dedicating my research to Software Security, specifically diving deep into Web Hacking techniques.";
    
    if (textElement && !window.isTypingRunning) {
        window.isTypingRunning = true;
        textElement.textContent = "";  
        
        let typeIndex = 0;

        function typeWriter() {
            if (typeIndex < textToType.length) {
                
                textElement.textContent += textToType.charAt(typeIndex);
                typeIndex++;
                
                const randomSpeed = Math.random() * 100 + 20;
                setTimeout(typeWriter, randomSpeed);
            }
        }

        setTimeout(typeWriter, 1000);
    }
    
});