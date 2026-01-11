document.addEventListener("DOMContentLoaded", () => {
    
    // --- System Monitor Logic ---
    const monitorBtn = document.getElementById('monitorBtn');
    const sysMonitor = document.getElementById('sysMonitor');
    
    if(monitorBtn && sysMonitor) {
        monitorBtn.addEventListener('click', () => {
            sysMonitor.classList.toggle('visible');
            monitorBtn.classList.toggle('active');
        });
    }

    // Simulate stats updates
    function updateStats() {
        // Header stats
        const cpuVal = Math.floor(Math.random() * 30) + 5; // 5-35%
        const memVal = (Math.random() * 2 + 3).toFixed(1); // 3.0-5.0 GB
        
        const headCpu = document.getElementById('cpu-stat');
        if(headCpu) headCpu.innerText = `${cpuVal}%`;

        // Widget stats
        const wCpu = document.getElementById('widget-cpu');
        const wMem = document.getElementById('widget-mem');
        const wNet = document.getElementById('widget-net');
        const barCpu = document.getElementById('bar-cpu');
        const barMem = document.getElementById('bar-mem');

        if(wCpu) wCpu.innerText = `${cpuVal}%`;
        if(barCpu) barCpu.style.width = `${cpuVal}%`;

        if(wMem) wMem.innerText = `${memVal}GB`;
        if(barMem) barMem.style.width = `${(parseFloat(memVal)/16)*100}%`; // Assuming 16GB max

        if(wNet) wNet.innerText = `${(Math.random() * 50).toFixed(1)}kb/s`;
    }
    setInterval(updateStats, 2000);
    updateStats();

    // Uptime counter
    const uptimeEl = document.getElementById('uptime');
    let seconds = 0;
    setInterval(() => {
        seconds++;
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        if(uptimeEl) uptimeEl.innerText = `${h}:${m}:${s}`;
    }, 1000);


    // --- Theme Toggle Logic ---
    const themeBtn = document.getElementById("themeBtn");
    
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const body = document.body;
            const icon = themeBtn.querySelector('i');
            
            body.classList.toggle('light-mode');
            
            if (body.classList.contains('light-mode')) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        });
    }

    // --- Command Palette Logic ---
    const dialog = document.getElementById("commandPalette");
    const cmdBtn = document.getElementById("cmdBtn");
    const cmdInput = document.getElementById("cmdInput");
    const cmdList = document.getElementById("cmdList");

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
        // [유지] whoami 커맨드: 간단한 알림으로 사용자 정보 표시
        {
            id: 'whoami',
            label: 'whoami',
            icon: 'fas fa-user-secret',
            action: () => alert("User: Guest\nRole: Visitor\nPermissions: Read-Only")
        },
        // [유지] date 커맨드: 현재 시간 표시
        {
            id: 'date',
            label: 'date',
            icon: 'fas fa-clock',
            action: () => alert(new Date().toString())
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
    const textToType = "Hello!\nI am Yang sangyun, majoring in Software.\nI am currently dedicating my research to Software Security, specifically diving deep into Web Hacking techniques.";
    
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