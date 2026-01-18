// Translations
const translations = {
    traditional: {
        title: '潘多拉盒子',
        greeting: '潘多拉盒子',
        message: '集齊魔法石便可把盒子打開',
        settingsBtn: '設定',
        openBagBtn: '打開收集布袋',
        collectedItems: '已收集的物品',
        progress: '進度',
        emptyMessage: '空無一物',
        confirm: '確認',
        collectButton: '收集魔法石',
        openBoxButton: '看看裡面有甚麼',
        scanQR: '掃描二維碼',
        scanHint: '將二維碼對準相機',
        settings: '設定',
        fontSize: '字體大細',
        language: '語言',
        large: '大',
        medium: '中',
        small: '細',
        traditional: '繁',
        simplified: '簡',
        english: 'Eng',
        boxOpened: '恭喜！潘多拉盒子已打開！',
        allCollected: '所有魔法石已收集完成！',
        alreadyCollected: '已經收集過了！',
        invalidRock: '無效的魔法石！',
        cameraError: '無法啟動相機，請檢查權限設定',
        rocks: {
            Thunderheart: { name: '雷霆魔法石', description: '蘊含狂暴雷電之力，能瞬間喚醒沉睡的力量，象徵速度與決斷。' },
            Frostveil: { name: '冰霜魔法石', description: '散發極寒氣息，可凍結時間般地減緩一切變化，象徵冷靜與理智。' },
            Vinescourge: { name: '毒藤魔法石', description: '以暗綠毒霧纏繞，能腐蝕束縛敵人，也提醒持有者慎用其力。' },
            'Shadow Abyss': { name: '暗影魔法石', description: '如深淵般吸收光芒，讓持有者在黑暗中隱匿身形，象徵秘密與未知。' },
            'Lumen Grace': { name: '光輝魔法石', description: '綻放聖潔光芒，能淨化邪惡與治癒創傷，象徵希望與重生。' }
        },
        status: '已收集'
    },
    simplified: {
        title: '潘多拉盒子',
        greeting: '潘多拉盒子',
        message: '集齐魔法石便可把盒子打开',
        settingsBtn: '设定',
        openBagBtn: '打开收集布袋',
        collectedItems: '已收集的物品',
        progress: '进度',
        emptyMessage: '空无一物',
        confirm: '确认',
        collectButton: '收集魔法石',
        openBoxButton: '看看里面有什么',
        scanQR: '扫描二维码',
        scanHint: '将二维码对准相机',
        settings: '设定',
        fontSize: '字体大小',
        language: '语言',
        large: '大',
        medium: '中',
        small: '细',
        traditional: '繁',
        simplified: '简',
        english: 'Eng',
        boxOpened: '恭喜！潘多拉盒子已打开！',
        allCollected: '所有魔法石已收集完成！',
        alreadyCollected: '已经收集过了！',
        invalidRock: '无效的魔法石！',
        cameraError: '无法启动相机，请检查权限设定',
        rocks: {
            Thunderheart: { name: '雷霆魔法石', description: '蕴含狂暴雷电之力，能瞬间唤醒沉睡的力量，象征速度与决断。' },
            Frostveil: { name: '冰霜魔法石', description: '散发极寒气息，可冻结时间般地减缓一切变化，象征冷静与理智。' },
            Vinescourge: { name: '毒藤魔法石', description: '以暗绿毒雾缠绕，能腐蚀束缚敌人，也提醒持有者慎用其力。' },
            'Shadow Abyss': { name: '暗影魔法石', description: '如深渊般吸收光芒，让持有者在黑暗中隐匿身形，象征秘密与未知。' },
            'Lumen Grace': { name: '光辉魔法石', description: '绽放圣洁光芒，能净化邪恶与治愈创伤，象征希望与重生。' }
        },
        status: '已收集'
    },
    english: {
        title: 'Pandora\'s Box',
        greeting: 'Pandora\'s Box',
        message: 'Collect all magic stones to open the box',
        settingsBtn: 'Settings',
        openBagBtn: 'Open Collection Bag',
        collectedItems: 'Collected Items',
        progress: 'Progress',
        emptyMessage: 'Empty',
        confirm: 'Confirm',
        collectButton: 'Collect Magic Stone',
        openBoxButton: 'See What\'s Inside',
        scanQR: 'Scan QR Code',
        scanHint: 'Point camera at QR code',
        settings: 'Settings',
        fontSize: 'Font Size',
        language: 'Language',
        large: 'Large',
        medium: 'Medium',
        small: 'Small',
        traditional: 'Traditional',
        simplified: 'Simplified',
        english: 'English',
        boxOpened: 'Congratulations! Pandora\'s Box is opened!',
        allCollected: 'All magic stones collected!',
        alreadyCollected: 'already collected!',
        invalidRock: 'Invalid magic stone!',
        cameraError: 'Unable to start camera, please check permissions',
        rocks: {
            Thunderheart: { name: 'Thunderheart Stone', description: 'Contains violent thunder power, can instantly awaken dormant strength, symbolizing speed and determination.' },
            Frostveil: { name: 'Frostveil Stone', description: 'Emits extreme cold, can slow down all changes like freezing time, symbolizing calmness and reason.' },
            Vinescourge: { name: 'Vinescourge Stone', description: 'Wrapped in dark green toxic mist, can corrode and bind enemies, reminding the holder to use its power carefully.' },
            'Shadow Abyss': { name: 'Shadow Abyss Stone', description: 'Absorbs light like an abyss, allows the holder to hide in darkness, symbolizing secrets and the unknown.' },
            'Lumen Grace': { name: 'Lumen Grace Stone', description: 'Radiates holy light, can purify evil and heal wounds, symbolizing hope and rebirth.' }
        },
        status: 'Collected'
    }
};

// Magic Rocks Configuration
const MAGIC_ROCKS = [
    { 
        key: 'Thunderheart', 
        icon: '⚡',
        image: 'Thunderheart.png'
    },
    { 
        key: 'Frostveil', 
        icon: '❄️',
        image: 'Frostveil.png'
    },
    { 
        key: 'Vinescourge', 
        icon: '🌿',
        image: 'Vinescourge.png'
    },
    { 
        key: 'Shadow Abyss', 
        icon: '🌑',
        image: 'Shadow Abyss.png'
    },
    { 
        key: 'Lumen Grace', 
        icon: '✨',
        image: 'Lumen Grace.png'
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

// Get current translation
function getTranslation(key) {
    const lang = settings.language || 'traditional';
    const t = translations[lang];
    if (!t) return key;
    
    // Handle nested keys like rocks.Thunderheart.name
    const keys = key.split('.');
    let value = t;
    for (const k of keys) {
        value = value?.[k];
    }
    return value || key;
}

// Apply language
function applyLanguage(lang) {
    settings.language = lang;
    localStorage.setItem('settings', JSON.stringify(settings));
    
    const t = translations[lang] || translations.traditional;
    
    // Update page title
    document.title = t.title;
    
    // Update static text elements
    if (settingsBtn) settingsBtn.textContent = t.settingsBtn;
    if (greeting) greeting.textContent = t.greeting;
    if (message) message.textContent = t.message;
    if (openBagBtn) openBagBtn.textContent = t.openBagBtn;
    if (button) button.textContent = t.collectButton;
    if (openBoxButton) openBoxButton.textContent = t.openBoxButton;
    
    // Update scanner modal
    const scannerTitle = document.querySelector('.scanner-header h2');
    if (scannerTitle) scannerTitle.textContent = t.scanQR;
    const scannerHint = document.querySelector('.scanner-hint');
    if (scannerHint) scannerHint.textContent = t.scanHint;
    
    // Update settings modal
    const settingsTitle = document.querySelector('.settings-header h2');
    if (settingsTitle) settingsTitle.textContent = t.settings;
    const fontSizeLabel = document.querySelectorAll('.setting-item label')[0];
    if (fontSizeLabel) fontSizeLabel.textContent = t.fontSize;
    const languageLabel = document.querySelectorAll('.setting-item label')[1];
    if (languageLabel) languageLabel.textContent = t.language;
    
    // Update setting option buttons
    document.querySelectorAll('.setting-option[data-setting="fontSize"]').forEach((btn, index) => {
        const values = ['large', 'medium', 'small'];
        btn.textContent = t[values[index]];
    });
    
    document.querySelectorAll('.setting-option[data-setting="language"]').forEach((btn, index) => {
        const values = ['traditional', 'simplified', 'english'];
        btn.textContent = t[values[index]];
    });
    
    // Update collected items header
    const collectedHeader = document.querySelector('.rocks-content h3');
    if (collectedHeader) collectedHeader.textContent = t.collectedItems;
    
    // Update empty message
    const emptyMsg = document.querySelector('.no-rocks-message p');
    if (emptyMsg) emptyMsg.textContent = t.emptyMessage;
    if (noRocksConfirmBtn) noRocksConfirmBtn.textContent = t.confirm;
    if (rockInfoConfirmBtn) rockInfoConfirmBtn.textContent = t.confirm;
    
    // Reinitialize rocks display to update names
    initializeRocks();
    
    // Update progress text
    updateProgress();
}

// Open settings modal
function openSettings() {
    if (!settingsModal) {
        console.error('Settings modal not found');
        return;
    }
    console.log('Opening settings modal');
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
    const t = translations[settings.language] || translations.traditional;
    
    // Only show collected rocks
    MAGIC_ROCKS.forEach((rock, index) => {
        const isCollected = collectedRocks.includes(rock.key);
        
        // Only create and display if collected
        if (isCollected) {
            const rockSlot = document.createElement('div');
            rockSlot.className = 'rock-slot collected';
            rockSlot.dataset.rock = rock.key;
            
            const rockInfo = t.rocks[rock.key] || { name: rock.key, description: '' };
            
            rockSlot.innerHTML = `
                <div class="rock-icon">${rock.icon}</div>
                <div class="rock-name">${rockInfo.name}</div>
                <div class="rock-status">${t.status}</div>
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
    const t = translations[settings.language] || translations.traditional;
    progressText.textContent = `${t.progress}: ${count}/5`;
}

// Check if box should open
function checkBoxOpening() {
    if (collectedRocks.length === 5) {
        pandoraBox.classList.add('box-open');
        const t = translations[settings.language] || translations.traditional;
        message.textContent = t.boxOpened;
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
    
    const t = translations[settings.language] || translations.traditional;
    const rockInfo = t.rocks[rock.key] || { name: rock.key, description: '' };
    
    // Set content
    rockInfoImage.alt = rockInfo.name;
    rockInfoName.textContent = rockInfo.name;
    rockInfoDescription.textContent = rockInfo.description;
    
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
        const t = translations[settings.language] || translations.traditional;
        showMessage(t.cameraError, 'error');
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
        const t = translations[settings.language] || translations.traditional;
        const rockInfo = t.rocks[rock.key] || { name: rock.key };
        
        // Check if already collected
        if (collectedRocks.includes(rock.key)) {
            showMessage(`${rockInfo.name} ${t.alreadyCollected}`, 'info');
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
        const t = translations[settings.language] || translations.traditional;
        showMessage(t.invalidRock, 'error');
    }
}

// Event Listeners
button.addEventListener('click', function() {
    if (collectedRocks.length >= 5) {
        const t = translations[settings.language] || translations.traditional;
        showMessage(t.allCollected, 'success');
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
function initializeSettings() {
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Settings button clicked');
            openSettings();
        });
    } else {
        console.error('Settings button not found');
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
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        applySettings();
        initializeRocks();
        createParticles();
        initializeSettings();
    });
} else {
    // DOM already loaded
    applySettings();
    initializeRocks();
    createParticles();
    initializeSettings();
}

// Add smooth transition to greeting
greeting.style.transition = 'transform 0.2s ease';

console.log('潘多拉盒子網站已載入！');
