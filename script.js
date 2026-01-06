document.addEventListener("DOMContentLoaded", () => {
    
    // --- 2. Theme Toggle Logic ---
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

    // --- 3. Command Palette Logic ---
    const dialog = document.getElementById("commandPalette");
    const cmdBtn = document.getElementById("cmdBtn");
    const cmdInput = document.getElementById("cmdInput");
    const cmdList = document.getElementById("cmdList");

    // ✅ commands 배열 정의 (문법 오류 수정됨)
    const commands = [
        { 
            id: 'home', 
            label: 'Go to Top', 
            icon: 'fas fa-arrow-up', 
            action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) 
        },
        { 
            id: 'projects', 
            label: 'Jump to Projects', 
            icon: 'fas fa-code', 
            action: () => {
                const projectSection = document.getElementById('projects');
                if(projectSection) projectSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } 
        },
        { 
            id: 'theme', 
            label: 'Toggle Theme', 
            icon: 'fas fa-adjust', 
            action: () => {
                if(themeBtn) themeBtn.click();
            }
        },
        { 
            id: 'github', 
            label: 'Open GitHub', 
            icon: 'fab fa-github', 
            action: () => window.open('https://github.com/gobukddong', '_blank') 
        }
    ];

    let selectedIndex = 0;
    let filteredCommands = [...commands];

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
            li.className = `cmd-item ${index === selectedIndex? 'selected' : ''}`;
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
});