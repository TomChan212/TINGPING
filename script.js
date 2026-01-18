// Magic Rocks Configuration
const MAGIC_ROCKS = [
    { 
        key: 'Thunderheart', 
        name: '雷霆魔法石', 
        icon: '⚡',
        image: 'Thunderheart.png',
        description: '蘊含狂暴雷電之力，能瞬間喚醒沉睡的力量，象徵速度與決斷。'
    },
    { 
        key: 'Frostveil', 
        name: '冰霜魔法石', 
        icon: '❄️',
        image: 'Frostveil.png',
        description: '散發極寒氣息，可凍結時間般地減緩一切變化，象徵冷靜與理智。'
    },
    { 
        key: 'Vinescourge', 
        name: '毒藤魔法石', 
        icon: '🌿',
        image: 'Vinescourge.png',
        description: '以暗綠毒霧纏繞，能腐蝕束縛敵人，也提醒持有者慎用其力。'
    },
    { 
        key: 'Shadow Abyss', 
        name: '暗影魔法石', 
        icon: '🌑',
        image: 'Shadow Abyss.png',
        description: '如深淵般吸收光芒，讓持有者在黑暗中隱匿身形，象徵秘密與未知。'
    },
    { 
        key: 'Lumen Grace', 
        name: '光輝魔法石', 
        icon: '✨',
        image: 'Lumen Grace.png',
        description: '綻放聖潔光芒，能淨化邪惡與治癒創傷，象徵希望與重生。'
    }
];

// Get DOM elements
const greeting = document.getElementById('greeting');
const message = document.getElementById('message');
const button = document.getElementById('clickButton');
const rocksGrid = document.getElementById('rocksGrid');
const progressText = document.getElementById('progressText');
const scannerModal = document.getElementById('scannerModal');
const closeScanner = document.getElementById('closeScanner');
const messagePopup = document.getElementById('messagePopup');
const pandoraBox = document.getElementById('pandoraBox');
const rockInfoModal = document.getElementById('rockInfoModal');
const rockInfoConfirmBtn = document.getElementById('rockInfoConfirmBtn');
const rockInfoImage = document.getElementById('rockInfoImage');
const rockInfoName = document.getElementById('rockInfoName');
const rockInfoDescription = document.getElementById('rockInfoDescription');
const openBoxButton = document.getElementById('openBoxButton');
const bagContainer = document.getElementById('bagContainer');
const bagImage = document.getElementById('bagImage');
const rocksContent = document.getElementById('rocksContent');
const noRocksMessage = document.getElementById('noRocksMessage');
const noRocksConfirmBtn = document.getElementById('noRocksConfirmBtn');
const openBagBtn = document.getElementById('openBagBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeSettings = document.getElementById('closeSettings');

// Load collected rocks from localStorage
let collectedRocks = JSON.parse(localStorage.getItem('collectedRocks')) || [];
let qrScanner = null;

// Load settings from localStorage
let settings = JSON.parse(localStorage.getItem('settings')) || {
    fontSize: 'medium',
    language: 'traditional'
};

// Apply saved settings on page load
function applySettings() {
    // Apply font size
    document.body.className = document.body.className.replace(/font-size-\w+/g, '');
    document.body.classList.add(`font-size-${settings.fontSize}`);
    
    // Apply language (will be implemented with text content)
    applyLanguage(settings.language);
    
    // Update active buttons
    updateSettingButtons();
}

// Update active state of setting buttons
function updateSettingButtons() {
    document.querySelectorAll('.setting-option').forEach(btn => {
        const setting = btn.dataset.setting;
        const value = btn.dataset.value;
        if (settings[setting] === value) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Apply language
function applyLanguage(lang) {
    // This will be populated with actual translations
    // For now, just store the setting
    settings.language = lang;
    localStorage.setItem('settings', JSON.stringify(settings));
}

// Open settings modal
function openSettings() {
    settingsModal.classList.add('active');
    updateSettingButtons();
}

// Close settings modal
function closeSettingsModal() {
    settingsModal.classList.remove('active');
}

// Handle setting option click
function handleSettingChange(setting, value) {
    settings[setting] = value;
    localStorage.setItem('settings', JSON.stringify(settings));
    
    if (setting === 'fontSize') {
        document.body.className = document.body.className.replace(/font-size-\w+/g, '');
        document.body.classList.add(`font-size-${value}`);
    } else if (setting === 'language') {
        applyLanguage(value);
    }
    
    updateSettingButtons();
}

// Initialize the rocks display
function initializeRocks() {
    rocksGrid.innerHTML = '';
    
    // Only show collected rocks
    MAGIC_ROCKS.forEach((rock, index) => {
        const isCollected = collectedRocks.includes(rock.key);
        
        // Only create and display if collected
        if (isCollected) {
            const rockSlot = document.createElement('div');
            rockSlot.className = 'rock-slot collected';
            rockSlot.dataset.rock = rock.key;
            
            rockSlot.innerHTML = `
                <div class="rock-icon">${rock.icon}</div>
                <div class="rock-name">${rock.name}</div>
                <div class="rock-status">已收集</div>
            `;
            
            // Add click event for collected rocks
            rockSlot.style.cursor = 'pointer';
            rockSlot.addEventListener('click', function() {
                showRockInfo(rock);
            });
            
            rocksGrid.appendChild(rockSlot);
        }
    });
    
    updateProgress();
    checkBoxOpening();
    
    // Ensure bag is closed initially
    if (rocksContent) {
        rocksContent.style.display = 'none';
    }
    if (openBagBtn) {
        openBagBtn.style.display = 'block';
    }
}

// Update progress text
function updateProgress() {
    const count = collectedRocks.length;
    progressText.textContent = `進度: ${count}/5`;
}

// Check if box should open
function checkBoxOpening() {
    if (collectedRocks.length === 5) {
        pandoraBox.classList.add('box-open');
        message.textContent = '恭喜！潘多拉盒子已打開！';
        button.style.display = 'none';
        openBoxButton.style.display = 'block';
    } else {
        openBoxButton.style.display = 'none';
    }
}

// Show message popup
function showMessage(text, type = 'info') {
    messagePopup.textContent = text;
    messagePopup.className = `message-popup ${type} show`;
    
    setTimeout(() => {
        messagePopup.classList.remove('show');
    }, 2000);
}

// Show rock collection info
function showRockInfo(rock) {
    // Hide confirm button initially
    rockInfoConfirmBtn.style.display = 'none';
    
    // Set content
    rockInfoImage.alt = rock.name;
    rockInfoName.textContent = rock.name;
    rockInfoDescription.textContent = rock.description;
    
    // Show modal first
    rockInfoModal.classList.add('active');
    
    // Load image and show confirm button when image is loaded
    rockInfoImage.onload = function() {
        rockInfoConfirmBtn.style.display = 'block';
    };
    
    // Set image source (this will trigger onload)
    rockInfoImage.src = rock.image;
    
    // Fallback: if image fails to load or is cached, show button after a short delay
    setTimeout(() => {
        if (rockInfoImage.complete) {
            rockInfoConfirmBtn.style.display = 'block';
        }
    }, 100);
}

// Close rock info modal
function closeRockInfoModal() {
    rockInfoModal.classList.remove('active');
    // Hide confirm button when modal is closed
    rockInfoConfirmBtn.style.display = 'none';
}

// Open QR Scanner
function openScanner() {
    scannerModal.classList.add('active');
    
    // Initialize QR Scanner
    qrScanner = new Html5Qrcode("qr-reader");
    
    qrScanner.start(
        { facingMode: "environment" }, // Use back camera
        {
            fps: 10,
            qrbox: { width: 250, height: 250 }
        },
        (decodedText, decodedResult) => {
            // Successfully scanned
            handleScannedCode(decodedText);
        },
        (errorMessage) => {
            // Error ignored for continuous scanning
        }
    ).catch((err) => {
        console.error("Unable to start scanning", err);
        showMessage('無法啟動相機，請檢查權限設定', 'error');
        closeScannerModal();
    });
}

// Close QR Scanner
function closeScannerModal() {
    if (qrScanner) {
        qrScanner.stop().then(() => {
            qrScanner.clear();
            qrScanner = null;
        }).catch((err) => {
            console.error("Error stopping scanner", err);
        });
    }
    scannerModal.classList.remove('active');
}

// Handle scanned QR code
function handleScannedCode(scannedText) {
    // Normalize the scanned text (trim and handle variations)
    const normalizedText = scannedText.trim();
    
    // Check if it matches any magic rock key
    const rock = MAGIC_ROCKS.find(r => 
        r.key.toLowerCase() === normalizedText.toLowerCase() ||
        r.key.replace(/\s+/g, '').toLowerCase() === normalizedText.replace(/\s+/g, '').toLowerCase()
    );
    
    if (rock) {
        // Check if already collected
        if (collectedRocks.includes(rock.key)) {
            showMessage(`${rock.name} 已經收集過了！`, 'info');
            return;
        }
        
        // Add to collected rocks
        collectedRocks.push(rock.key);
        localStorage.setItem('collectedRocks', JSON.stringify(collectedRocks));
        
        // Update display
        initializeRocks();
        
        // Close scanner first
        closeScannerModal();
        
        // Show rock info modal after a short delay
        setTimeout(() => {
            showRockInfo(rock);
        }, 500);
        
    } else {
        showMessage('無效的魔法石！', 'error');
    }
}

// Event Listeners
button.addEventListener('click', function() {
    if (collectedRocks.length >= 5) {
        showMessage('所有魔法石已收集完成！', 'success');
        return;
    }
    openScanner();
});

closeScanner.addEventListener('click', closeScannerModal);

// Close scanner when clicking outside
scannerModal.addEventListener('click', function(e) {
    if (e.target === scannerModal) {
        closeScannerModal();
    }
});

// Close rock info modal with confirm button
rockInfoConfirmBtn.addEventListener('click', closeRockInfoModal);

// Open box button
openBoxButton.addEventListener('click', function() {
    window.location.href = 'box.html';
});

// Open bag to show collected rocks
function openBag() {
    rocksContent.style.display = 'block';
    openBagBtn.style.display = 'none';
    bagImage.style.transform = 'scale(0.95)';
    
    // Check if there are collected rocks
    const h3Element = rocksContent.querySelector('h3');
    if (collectedRocks.length === 0) {
        // Show no rocks message
        if (h3Element) h3Element.style.display = 'none';
        if (noRocksMessage) noRocksMessage.style.display = 'block';
        if (rocksGrid) rocksGrid.style.display = 'none';
        if (progressText) progressText.style.display = 'none';
    } else {
        // Show collected rocks
        if (h3Element) h3Element.style.display = 'block';
        if (noRocksMessage) noRocksMessage.style.display = 'none';
        if (rocksGrid) rocksGrid.style.display = 'grid';
        if (progressText) progressText.style.display = 'block';
    }
}

// Close bag
function closeBag() {
    rocksContent.style.display = 'none';
    openBagBtn.style.display = 'block';
    bagImage.style.transform = 'scale(1)';
}

// Close no rocks message
function closeNoRocksMessage() {
    closeBag(); // Close the bag
}

// Create particle effect
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    particlesContainer.innerHTML = '';
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        // Position particles more spread out around the bag
        // Use much wider distribution - from 0% to 100% of container
        // Use different distribution patterns to avoid clustering
        const angle = (i / 15) * Math.PI * 2; // Distribute in a circle
        const radius = 30 + Math.random() * 20; // Random radius between 30-50%
        const centerX = 50; // Center of container
        const centerY = 50;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        particle.style.left = x + '%';
        particle.style.top = y + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 1.5 + 2) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Open bag button
if (openBagBtn) {
    openBagBtn.addEventListener('click', openBag);
}

// No rocks confirm button
if (noRocksConfirmBtn) {
    noRocksConfirmBtn.addEventListener('click', closeNoRocksMessage);
}

// Settings event listeners
if (settingsBtn) {
    settingsBtn.addEventListener('click', openSettings);
}

if (closeSettings) {
    closeSettings.addEventListener('click', closeSettingsModal);
}

// Close settings when clicking outside
if (settingsModal) {
    settingsModal.addEventListener('click', function(e) {
        if (e.target === settingsModal) {
            closeSettingsModal();
        }
    });
}

// Setting option clicks
document.querySelectorAll('.setting-option').forEach(btn => {
    btn.addEventListener('click', function() {
        const setting = this.dataset.setting;
        const value = this.dataset.value;
        handleSettingChange(setting, value);
    });
});

// Initialize on page load
applySettings();
initializeRocks();
createParticles();

// Add smooth transition to greeting
greeting.style.transition = 'transform 0.2s ease';

console.log('潘多拉盒子網站已載入！');
