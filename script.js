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
    fontSize: 'medium'
};

// Load custom text content from localStorage
let customTexts = JSON.parse(localStorage.getItem('customTexts')) || {};

// Apply saved settings on page load
function applySettings() {
    // Apply font size
    document.body.className = document.body.className.replace(/font-size-\w+/g, '');
    document.body.classList.add(`font-size-${settings.fontSize}`);
    
    // Load custom texts
    loadCustomTexts();
    
    // Update active buttons
    updateSettingButtons();
    
    // Initialize text editing
    initializeTextEditing();
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

// Load custom texts from localStorage
function loadCustomTexts() {
    // Load custom text for each element if exists
    Object.keys(customTexts).forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element && customTexts[elementId]) {
            element.textContent = customTexts[elementId];
        }
    });
    
    // Load custom text for elements without ID
    if (customTexts['greeting'] && greeting) greeting.textContent = customTexts['greeting'];
    if (customTexts['message'] && message) message.textContent = customTexts['message'];
    if (customTexts['settingsBtn'] && settingsBtn) settingsBtn.textContent = customTexts['settingsBtn'];
    if (customTexts['openBagBtn'] && openBagBtn) openBagBtn.textContent = customTexts['openBagBtn'];
    if (customTexts['clickButton'] && button) button.textContent = customTexts['clickButton'];
    if (customTexts['openBoxButton'] && openBoxButton) openBoxButton.textContent = customTexts['openBoxButton'];
}

// Edit mode state
let editMode = false;

// Toggle edit mode for all text
function toggleEditMode() {
    editMode = !editMode;
    
    // Get all text elements including buttons
    const allTextElements = document.querySelectorAll('h1, h2, h3, p, label, span, button, .rock-name, .rock-status, .scanner-header h2, .scanner-hint, .settings-header h2');
    
    allTextElements.forEach(element => {
        // Skip close buttons (X buttons) and setting option buttons
        if (element.id === 'closeSettings' || element.id === 'closeScanner' || 
            element.classList.contains('setting-option') || 
            element.classList.contains('close-settings') ||
            element.classList.contains('close-scanner') ||
            element.textContent.trim() === '✕') {
            return;
        }
        
        if (editMode) {
            // Enable editing
            element.setAttribute('contenteditable', 'true');
            element.style.cursor = 'text';
            element.style.outline = '1px dashed rgba(52, 152, 219, 0.3)';
            element.style.minHeight = '20px';
            
            // Add visual indicator
            if (!element.dataset.editMode) {
                element.dataset.editMode = 'true';
            }
            
            // For buttons, prevent default click behavior when in edit mode
            if (element.tagName === 'BUTTON') {
                const originalClick = element.onclick;
                element.addEventListener('click', function(e) {
                    if (document.activeElement === this) {
                        // If already focused, allow editing
                        return;
                    }
                    // Otherwise, focus for editing
                    e.preventDefault();
                    e.stopPropagation();
                    this.focus();
                }, true);
            }
        } else {
            // Disable editing
            element.setAttribute('contenteditable', 'false');
            element.style.cursor = '';
            element.style.outline = '';
            element.style.minHeight = '';
            
            // Save edited text
            const elementId = element.id || element.className || element.tagName.toLowerCase();
            if (elementId && element.textContent) {
                // For buttons, use their ID or a combination
                if (element.tagName === 'BUTTON' && element.id) {
                    customTexts[element.id] = element.textContent;
                } else if (element.tagName === 'BUTTON' && !element.id) {
                    customTexts[`button-${element.textContent.substring(0, 10)}`] = element.textContent;
                } else {
                    customTexts[elementId] = element.textContent;
                }
            }
        }
    });
    
    // Save all custom texts
    localStorage.setItem('customTexts', JSON.stringify(customTexts));
    
    // Show/hide edit mode indicator
    if (editMode) {
        showEditModeIndicator();
    } else {
        hideEditModeIndicator();
    }
}

// Show edit mode indicator
function showEditModeIndicator() {
    let indicator = document.getElementById('editModeIndicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'editModeIndicator';
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #3498db;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-size: 14px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        `;
        indicator.textContent = '編輯模式：點擊任何文字即可編輯';
        document.body.appendChild(indicator);
    }
}

// Hide edit mode indicator
function hideEditModeIndicator() {
    const indicator = document.getElementById('editModeIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// Initialize text editing functionality
function initializeTextEditing() {
    // Make all text elements editable when in edit mode
    const allTextElements = document.querySelectorAll('h1, h2, h3, p, label, span, button, .rock-name, .rock-status');
    
    allTextElements.forEach(element => {
        // Skip close buttons and setting option buttons
        if (element.id === 'closeSettings' || element.id === 'closeScanner' || 
            element.classList.contains('setting-option') || 
            element.classList.contains('close-settings') ||
            element.classList.contains('close-scanner')) {
            return;
        }
        
        // Add focus/blur handlers for saving
        element.addEventListener('focus', function() {
            if (editMode) {
                this.style.outline = '2px dashed #3498db';
                this.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
            }
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.backgroundColor = '';
            
            // Save the edited text
            const elementId = this.id || this.className || this.tagName.toLowerCase();
            if (elementId && this.textContent) {
                customTexts[elementId] = this.textContent;
                localStorage.setItem('customTexts', JSON.stringify(customTexts));
            }
        });
        
        // Prevent default button behavior when in edit mode
        if (element.tagName === 'BUTTON') {
            element.addEventListener('click', function(e) {
                if (editMode && document.activeElement !== this) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.focus();
                }
            });
        }
    });
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
    if (setting === 'fontSize') {
        // Apply font size first
        settings[setting] = value;
        localStorage.setItem('settings', JSON.stringify(settings));
        document.body.className = document.body.className.replace(/font-size-\w+/g, '');
        document.body.classList.add(`font-size-${value}`);
        
        // Update setting buttons
        updateSettingButtons();
        
        // Enable edit mode after font size change
        if (!editMode) {
            toggleEditMode();
        }
    }
}

// Initialize the rocks display
function initializeRocks() {
    rocksGrid.innerHTML = '';
    
    // Default rock names (can be edited by user)
    const defaultRockNames = {
        'Thunderheart': '雷霆魔法石',
        'Frostveil': '冰霜魔法石',
        'Vinescourge': '毒藤魔法石',
        'Shadow Abyss': '暗影魔法石',
        'Lumen Grace': '光輝魔法石'
    };
    
    // Only show collected rocks
    MAGIC_ROCKS.forEach((rock, index) => {
        const isCollected = collectedRocks.includes(rock.key);
        
        // Only create and display if collected
        if (isCollected) {
            const rockSlot = document.createElement('div');
            rockSlot.className = 'rock-slot collected';
            rockSlot.dataset.rock = rock.key;
            
            const rockName = customTexts[`rock-${rock.key}-name`] || defaultRockNames[rock.key] || rock.key;
            const rockStatus = customTexts['rock-status'] || '已收集';
            
            rockSlot.innerHTML = `
                <div class="rock-icon">${rock.icon}</div>
                <div class="rock-name" data-rock-key="${rock.key}">${rockName}</div>
                <div class="rock-status">${rockStatus}</div>
            `;
            
            // Add click event for collected rocks
            rockSlot.style.cursor = 'pointer';
            rockSlot.addEventListener('click', function(e) {
                // Don't trigger if clicking on editable text
                if (e.target.contentEditable === 'true') return;
                showRockInfo(rock);
            });
            
            // Make rock name editable
            const rockNameElement = rockSlot.querySelector('.rock-name');
            rockNameElement.setAttribute('contenteditable', 'true');
            rockNameElement.style.cursor = 'text';
            rockNameElement.addEventListener('focus', function() {
                this.style.outline = '2px dashed #3498db';
                this.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
            });
            rockNameElement.addEventListener('blur', function() {
                this.style.outline = 'none';
                this.style.backgroundColor = 'transparent';
                customTexts[`rock-${rock.key}-name`] = this.textContent;
                localStorage.setItem('customTexts', JSON.stringify(customTexts));
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
    const progressLabel = customTexts['progress-label'] || '進度';
    progressText.textContent = `${progressLabel}: ${count}/5`;
}

// Check if box should open
function checkBoxOpening() {
    if (collectedRocks.length === 5) {
        pandoraBox.classList.add('box-open');
        const boxOpenedMsg = customTexts['box-opened'] || '恭喜！潘多拉盒子已打開！';
        message.textContent = boxOpenedMsg;
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
    
    const defaultRockNames = {
        'Thunderheart': '雷霆魔法石',
        'Frostveil': '冰霜魔法石',
        'Vinescourge': '毒藤魔法石',
        'Shadow Abyss': '暗影魔法石',
        'Lumen Grace': '光輝魔法石'
    };
    
    const defaultDescriptions = {
        'Thunderheart': '蘊含狂暴雷電之力，能瞬間喚醒沉睡的力量，象徵速度與決斷。',
        'Frostveil': '散發極寒氣息，可凍結時間般地減緩一切變化，象徵冷靜與理智。',
        'Vinescourge': '以暗綠毒霧纏繞，能腐蝕束縛敵人，也提醒持有者慎用其力。',
        'Shadow Abyss': '如深淵般吸收光芒，讓持有者在黑暗中隱匿身形，象徵秘密與未知。',
        'Lumen Grace': '綻放聖潔光芒，能淨化邪惡與治癒創傷，象徵希望與重生。'
    };
    
    const rockName = customTexts[`rock-${rock.key}-name`] || defaultRockNames[rock.key] || rock.key;
    const rockDescription = customTexts[`rock-${rock.key}-description`] || defaultDescriptions[rock.key] || '';
    
    // Set content
    rockInfoImage.alt = rockName;
    rockInfoName.textContent = rockName;
    rockInfoDescription.textContent = rockDescription;
    
    // Make description editable
    rockInfoDescription.setAttribute('contenteditable', 'true');
    rockInfoDescription.style.cursor = 'text';
    rockInfoDescription.addEventListener('blur', function() {
        customTexts[`rock-${rock.key}-description`] = this.textContent;
        localStorage.setItem('customTexts', JSON.stringify(customTexts));
    });
    
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
        const errorMsg = customTexts['camera-error'] || '無法啟動相機，請檢查權限設定';
        showMessage(errorMsg, 'error');
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
        const defaultRockNames = {
            'Thunderheart': '雷霆魔法石',
            'Frostveil': '冰霜魔法石',
            'Vinescourge': '毒藤魔法石',
            'Shadow Abyss': '暗影魔法石',
            'Lumen Grace': '光輝魔法石'
        };
        const rockName = customTexts[`rock-${rock.key}-name`] || defaultRockNames[rock.key] || rock.key;
        const alreadyCollectedMsg = customTexts['already-collected'] || '已經收集過了！';
        
        // Check if already collected
        if (collectedRocks.includes(rock.key)) {
            showMessage(`${rockName} ${alreadyCollectedMsg}`, 'info');
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
        const invalidMsg = customTexts['invalid-rock'] || '無效的魔法石！';
        showMessage(invalidMsg, 'error');
    }
}

// Event Listeners
button.addEventListener('click', function() {
    if (collectedRocks.length >= 5) {
        const allCollectedMsg = customTexts['all-collected'] || '所有魔法石已收集完成！';
        showMessage(allCollectedMsg, 'success');
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
