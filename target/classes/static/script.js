// State Management
let state = {
    vendors: [],
    isLoading: false,
    currentVendor: null,
    searchTerm: ''
};

/* filepath: /src/main/resources/static/script.js */
// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const sidebar = document.querySelector('.sidebar');

mobileMenuToggle?.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 1024 &&
      !e.target.closest('.sidebar') &&
      !e.target.closest('.mobile-menu-toggle')) {
    sidebar.classList.remove('active');
  }
});

// Lazy Loading Configuration
const lazyLoadConfig = {
    page: 0,
    size: 10,
    loading: false,
    hasMore: true
};

// Enhanced Notification System
const toast = {
    success: (message) => {
        Toastify({
            text: message,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "var(--success)",
            stopOnFocus: true
        }).showToast();
    },
    error: (message) => {
        Toastify({
            text: message,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "var(--danger)",
            stopOnFocus: true
        }).showToast();
    }
};

// Intersection Observer for Lazy Loading
const observerCallback = (entries) => {
    if (entries[0].isIntersecting && !lazyLoadConfig.loading && lazyLoadConfig.hasMore) {
        loadMoreVendors();
    }
};

const observer = new IntersectionObserver(observerCallback, {
    root: null,
    threshold: 0.1
});

// Enhanced Vendor Loading with Error Handling
async function loadMoreVendors() {
    if (lazyLoadConfig.loading) return;
    
    lazyLoadConfig.loading = true;
    try {
        showSkeletonLoader();
        const response = await fetch(`/cloudvendor?page=${lazyLoadConfig.page}&size=${lazyLoadConfig.size}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const vendors = await response.json();
        
        if (Array.isArray(vendors)) {
            if (vendors.length < lazyLoadConfig.size) {
                lazyLoadConfig.hasMore = false;
            }
            
            if (vendors.length > 0) {
                appendVendors(vendors);
                lazyLoadConfig.page++;
            } else if (lazyLoadConfig.page === 0) {
                displayEmptyState();
            }
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error('Error loading vendors:', error);
        if (lazyLoadConfig.page === 0) {
            displayErrorState(error.message);
        } else {
            toast.error('Failed to load more vendors');
        }
    } finally {
        lazyLoadConfig.loading = false;
        hideSkeletonLoader();
    }
}

function displayEmptyState() {
    const vendorsDiv = document.getElementById('vendorsList');
    vendorsDiv.innerHTML = `
        <div class="empty-state">
            <h3>No Vendors Found</h3>
            <p>Start by adding your first vendor!</p>
        </div>
    `;
}

function displayErrorState(message) {
    const vendorsDiv = document.getElementById('vendorsList');
    vendorsDiv.innerHTML = `
        <div class="error-state">
            <h3>Failed to Load Vendors</h3>
            <p>${message}</p>
            <button onclick="retryLoading()" class="btn btn-primary">Retry</button>
        </div>
    `;
}

function retryLoading() {
    lazyLoadConfig.page = 0;
    lazyLoadConfig.hasMore = true;
    loadMoreVendors();
}

function appendVendors(vendors) {
    const vendorsDiv = document.getElementById('vendorsList');
    
    vendors.forEach((vendor, index) => {
        const vendorElement = document.createElement('div');
        vendorElement.className = 'vendor-card';
        vendorElement.innerHTML = `
            <div class="vendor-info">
                <h3>${vendor.vendorName || 'Unnamed Vendor'}</h3>
                <p>ID: ${vendor.vendorId || 'No ID'}</p>
            </div>
            <div class="vendor-actions">
                <button onclick="editVendor('${vendor.vendorId}')" class="btn btn-secondary">
                    Edit
                </button>
                <button onclick="deleteVendor('${vendor.vendorId}')" class="btn btn-danger">
                    Delete
                </button>
            </div>
        `;
        
        vendorElement.style.animationDelay = `${index * 100}ms`;
        vendorsDiv.appendChild(vendorElement);
    });
}

// Enhanced UI Helpers
function showSkeletonLoader() {
    const loader = document.querySelector('.skeleton-loader');
    if (loader) {
        loader.classList.remove('hidden');
    }
}

function hideSkeletonLoader() {
    const loader = document.querySelector('.skeleton-loader');
    if (loader) {
        loader.classList.add('hidden');
    }
}

// Intersection Observer for Fade-in Animations
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Initialize Fade Animations
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Mobile Navigation
document.querySelector('.mobile-nav-toggle')?.addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('active');
});

// Enhanced CRUD Operations with Better Error Handling
async function createVendor(event) {
    event.preventDefault();
    showLoader();
    
    try {
        const vendor = {
            vendorId: document.getElementById('vendorId').value,
            vendorName: document.getElementById('vendorName').value
        };

        // Determine if we're updating or creating
        const isUpdate = !!state.currentVendor;
        const method = isUpdate ? 'PUT' : 'POST';
        
        const response = await fetch('/cloudvendor', {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vendor)
        });

        if (!response.ok) {
            throw new Error(`Failed to ${isUpdate ? 'update' : 'create'} vendor`);
        }
        
        toast.success(`Vendor ${isUpdate ? 'updated' : 'created'} successfully`);
        resetForm();
        
        // Refresh vendors list and dashboard
        await Promise.all([
            getAllVendors(),
            updateDashboardStats()
        ]);
        
        // Show vendors section after successful creation
        showSection('vendors');
        
    } catch (error) {
        toast.error(error.message);
    } finally {
        hideLoader();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Observe sentinel for infinite scroll
    const sentinel = document.getElementById('sentinel');
    observer.observe(sentinel);
    
    // Initialize fade-in animations
    document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
    
    // Initialize event listeners
    document.getElementById('vendorForm').addEventListener('submit', createVendor);
    
    // Load initial vendors
    loadMoreVendors();
});

// Enhanced Notifications
function showNotification(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-message">${message}</span>
      <button class="toast-close">&times;</button>
    </div>
  `;
  
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  
  toast.querySelector('.toast-close').onclick = () => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  };
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// UI Helpers
function showLoader() {
    state.isLoading = true;
    document.querySelector('.loader').classList.add('active');
}

function hideLoader() {
    state.isLoading = false;
    document.querySelector('.loader').classList.remove('active');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Enhanced CRUD Operations
async function updateVendor() {
    showLoader();
    try {
        const vendor = {
            vendorId: document.getElementById('vendorId').value,
            vendorName: document.getElementById('vendorName').value
        };

        const response = await fetch('/cloudvendor', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vendor)
        });

        if (!response.ok) throw new Error('Failed to update vendor');
        
        showNotification('Vendor updated successfully', 'success');
        await getAllVendors();
    } catch (error) {
        showNotification(error.message, 'error');
    } finally {
        hideLoader();
    }
}

async function deleteVendor(vendorId) {
    if (!confirm('Are you sure you want to delete this vendor?')) return;
    
    showLoader();
    try {
        const response = await fetch(`/cloudvendor/${vendorId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete vendor');
        
        showNotification('Vendor deleted successfully', 'success');
        await getAllVendors();
    } catch (error) {
        showNotification(error.message, 'error');
    } finally {
        hideLoader();
    }
}

async function searchVendor() {
    const vendorId = document.getElementById('searchId').value;
    if (!vendorId) {
        showNotification('Please enter a vendor ID', 'warning');
        return;
    }

    showLoader();
    try {
        const response = await fetch(`/cloudvendor/${vendorId}`);
        if (!response.ok) throw new Error('Vendor not found');
        
        const data = await response.json();
        displayVendors([data]);
    } catch (error) {
        showNotification(error.message, 'error');
        displayVendors([]);
    } finally {
        hideLoader();
    }
}

async function getAllVendors() {
    showLoader();
    try {
        const response = await fetch('/cloudvendor');
        if (!response.ok) throw new Error('Failed to fetch vendors');
        
        const data = await response.json();
        state.vendors = data;
        displayVendors(data);
    } catch (error) {
        showNotification(error.message, 'error');
        displayVendors([]);
    } finally {
        hideLoader();
    }
}

function displayVendors(vendors) {
    const vendorsDiv = document.getElementById('vendorsList');
    if (!vendorsDiv) return;

    vendorsDiv.innerHTML = '';
    
    if (!Array.isArray(vendors) || vendors.length === 0) {
        vendorsDiv.innerHTML = '<p class="no-data"><i class="fas fa-info-circle"></i> No vendors found</p>';
        return;
    }

    vendors.forEach((vendor, index) => {
        const vendorElement = document.createElement('div');
        vendorElement.className = 'vendor-card';
        vendorElement.innerHTML = `
            <div class="vendor-info">
                <h3><i class="fas fa-user"></i> ${vendor.vendorName || 'Unnamed Vendor'}</h3>
                <p><i class="fas fa-id-card"></i> ID: ${vendor.vendorId || 'No ID'}</p>
            </div>
            <div class="vendor-actions">
                <button onclick="editVendor('${vendor.vendorId}')" class="btn btn-secondary">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button onclick="deleteVendor('${vendor.vendorId}')" class="btn btn-danger">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        
        setTimeout(() => vendorElement.classList.add('animate-in'), index * 100);
        vendorsDiv.appendChild(vendorElement);
    });
}

// Enhanced Edit Functionality
function editVendor(vendorId) {
    const vendor = state.vendors.find(v => v.vendorId === vendorId);
    if (!vendor) {
        toast.error('Vendor not found');
        return;
    }

    // Show vendors section
    showSection('vendors');

    // Update form
    const vendorIdInput = document.getElementById('vendorId');
    const vendorNameInput = document.getElementById('vendorName');
    const submitBtn = document.getElementById('submitBtn');
    
    if (vendorIdInput && vendorNameInput && submitBtn) {
        vendorIdInput.value = vendor.vendorId;
        vendorNameInput.value = vendor.vendorName;
        submitBtn.textContent = 'Update Vendor';
        
        // Add edit mode styling
        const formCard = document.querySelector('.form-card');
        if (formCard) {
            formCard.classList.add('edit-mode');
        }
        
        state.currentVendor = vendor;

        // Scroll to form
        formCard?.scrollIntoView({ behavior: 'smooth' });
    }
}

// Enhanced Section Management
function initializeSections() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-item');

    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => section.classList.remove('active'));
        
        // Remove active class from all nav items
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Highlight active nav items
        document.querySelectorAll(`[data-section="${sectionId}"]`).forEach(link => {
            link.classList.add('active');
        });

        // Update URL without scrolling
        history.replaceState(null, null, `#${sectionId}`);
        
        // Update stats if dashboard
        if (sectionId === 'dashboard') {
            updateDashboardStats();
        }
    }

    // Add click handlers to all nav items
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.dataset.section;
            showSection(sectionId);
        });
    });

    // Handle initial load
    const currentHash = window.location.hash.slice(1) || 'dashboard';
    showSection(currentHash);
}

// Dashboard Stats
async function updateDashboardStats() {
    const totalVendorsElement = document.getElementById('totalVendors');
    if (!totalVendorsElement) {
        console.error('Dashboard element not found');
        return;
    }

    try {
        const response = await fetch('/cloudvendor');
        if (!response.ok) {
            throw new Error('Failed to fetch vendors');
        }
        const vendors = await response.json();
        
        // Update total vendors count
        totalVendorsElement.textContent = Array.isArray(vendors) ? vendors.length : 0;
        
        // Calculate additional stats if needed
        const activeVendors = vendors.filter(v => v.active).length;
        updateStatCard('activeVendors', activeVendors);
        
    } catch (error) {
        console.error('Error updating dashboard:', error);
        totalVendorsElement.textContent = '0';
        showNotification('Failed to load dashboard stats', 'error');
    }
}

// Helper function to safely update stat cards
function updateStatCard(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

// Enhanced Settings Management
function initializeSettings() {
    initializeTheme();
    
    const settingsForm = document.getElementById('settingsForm');
    const themeSelect = document.getElementById('themeSelect');

    if (themeSelect) {
        // Apply theme changes immediately when selected
        themeSelect.addEventListener('change', (e) => {
            const newTheme = e.target.value;
            applyTheme(newTheme);
            // Show confirmation toast
            toast.success(`Theme changed to ${newTheme}`);
        });
    }

    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const settings = {
                theme: themeSelect?.value || 'light',
                itemsPerPage: parseInt(document.getElementById('itemsPerPage')?.value || '10')
            };
            saveSettings(settings);
            toast.success('Settings saved successfully');
        });
    }
}

// Enhanced Theme Management
function applyTheme(theme) {
    // Set data-theme attribute on document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Store theme preference
    localStorage.setItem('theme', theme);
    
    // Update select value if it exists
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
        themeSelect.value = theme;
    }
}

function initializeTheme() {
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    // ...rest of initialization code...
});

function loadSettings() {
    try {
        const saved = localStorage.getItem('vendorManagementSettings');
        return saved ? JSON.parse(saved) : {
            theme: 'light',
            itemsPerPage: 10
        };
    } catch (error) {
        console.error('Error loading settings:', error);
        return {
            theme: 'light',
            itemsPerPage: 10
        };
    }
}

function saveSettings(settings) {
    try {
        localStorage.setItem('vendorManagementSettings', JSON.stringify(settings));
        lazyLoadConfig.size = settings.itemsPerPage;
    } catch (error) {
        console.error('Error saving settings:', error);
        toast.error('Failed to save settings');
    }
}

function applySettings(settings) {
    if (!settings) return;
    
    // Apply theme
    applyTheme(settings.theme);
    
    // Update form values
    const themeSelect = document.getElementById('themeSelect');
    const itemsPerPage = document.getElementById('itemsPerPage');
    
    if (themeSelect) themeSelect.value = settings.theme;
    if (itemsPerPage) itemsPerPage.value = settings.itemsPerPage;
    
    // Update lazy loading configuration
    lazyLoadConfig.size = settings.itemsPerPage;
}

// Initialize with saved theme
document.addEventListener('DOMContentLoaded', () => {
    const settings = loadSettings();
    applyTheme(settings.theme);
    // ...existing initialization code...
});

// Reset form after update
function resetForm() {
    const form = document.getElementById('vendorForm');
    const submitBtn = document.getElementById('submitBtn');
    if (form && submitBtn) {
        form.reset();
        submitBtn.textContent = 'Add Vendor';
        state.currentVendor = null;
        
        // Remove edit mode styling if it exists
        const formCard = document.querySelector('.form-card');
        if (formCard) {
            formCard.classList.remove('edit-mode');
        }
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initializeSections();
    initializeSettings();
    // ...existing initialization code...
});

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    getAllVendors();
    document.getElementById('vendorForm').addEventListener('submit', createVendor);
    document.getElementById('updateBtn').addEventListener('click', (e) => {
        e.preventDefault();
        if (state.currentVendor) {
            createVendor(new Event('submit'));
        } else {
            toast.error('No vendor selected for update');
        }
    });
});

// Add sound effects
function playClickSound() {
    const audio = new Audio('data:audio/mp3;base64,...');
    audio.play().catch(() => {});
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', playClickSound);
});

// Add window hash change handler
window.addEventListener('hashchange', () => {
    const sectionId = window.location.hash.slice(1) || 'dashboard';
    showSection(sectionId);
    if (sectionId === 'dashboard') {
        updateDashboardStats();
    }
});

// Show section helper
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => section.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));

    const targetSection = document.getElementById(sectionId);
    const targetLink = document.querySelector(`[data-section="${sectionId}"]`);

    if (targetSection && targetLink) {
        targetSection.classList.add('active');
        targetLink.classList.add('active');
    }
}

// Enhanced Dashboard Stats
async function updateDashboardStats() {
    try {
        const response = await fetch('/cloudvendor');
        if (!response.ok) {
            throw new Error('Failed to fetch vendors');
        }
        const vendors = await response.json();
        
        // Update total vendors count
        const totalVendorsElement = document.getElementById('totalVendors');
        if (totalVendorsElement) {
            totalVendorsElement.textContent = Array.isArray(vendors) ? vendors.length : 0;
        }

        // Update last updated timestamp
        const lastUpdatedElement = document.getElementById('lastUpdated');
        if (lastUpdatedElement) {
            lastUpdatedElement.textContent = new Date().toLocaleString();
        }
        
        // Store vendors in state
        state.vendors = vendors;
        
    } catch (error) {
        console.error('Error updating dashboard:', error);
        toast.error('Failed to load dashboard stats');
    }
}

// Enhanced Create/Update Vendor
async function createVendor(event) {
    event.preventDefault();
    showLoader();
    
    try {
        const vendorId = document.getElementById('vendorId').value;
        const vendorName = document.getElementById('vendorName').value;

        if (!vendorId || !vendorName) {
            throw new Error('Please fill in all fields');
        }

        const vendor = { vendorId, vendorName };
        const method = state.currentVendor ? 'PUT' : 'POST';
        
        const response = await fetch('/cloudvendor', {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vendor)
        });

        if (!response.ok) {
            throw new Error(`Failed to ${state.currentVendor ? 'update' : 'create'} vendor`);
        }
        
        // Show success message
        toast.success(`Vendor ${state.currentVendor ? 'updated' : 'created'} successfully`);
        
        // Reset form and state
        resetForm();
        
        // Refresh data
        await Promise.all([
            getAllVendors(),
            updateDashboardStats()
        ]);

    } catch (error) {
        toast.error(error.message);
    } finally {
        hideLoader();
    }
}

// Enhanced Initialize Function
function initializeApp() {
    try {
        // Initialize sections
        initializeSections();
        
        // Initialize settings
        initializeSettings();
        
        // Add form submit handler
        const vendorForm = document.getElementById('vendorForm');
        if (vendorForm) {
            vendorForm.addEventListener('submit', createVendor);
        }

        // Add update button handler
        const updateBtn = document.getElementById('updateBtn');
        if (updateBtn) {
            updateBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (state.currentVendor) {
                    createVendor(new Event('submit'));
                } else {
                    toast.error('No vendor selected for update');
                }
            });
        }

        // Load initial data
        updateDashboardStats();
        getAllVendors();

        // Initialize observers
        const sentinel = document.getElementById('sentinel');
        if (sentinel) {
            observer.observe(sentinel);
        }

        // Initialize fade animations
        document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
    } catch (error) {
        console.error('Error initializing app:', error);
        toast.error('Failed to initialize application');
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', initializeApp);

// Remove duplicate event listener
// ...remove the existing DOMContentLoaded event listener that calls getAllVendors...

// Enhanced Display Vendors Function
function displayVendors(vendors) {
    const vendorsDiv = document.getElementById('vendorsList');
    if (!vendorsDiv) return;

    vendorsDiv.innerHTML = '';
    
    if (!Array.isArray(vendors) || vendors.length === 0) {
        vendorsDiv.innerHTML = '<p class="no-data"><i class="fas fa-info-circle"></i> No vendors found</p>';
        return;
    }

    vendors.forEach((vendor, index) => {
        const vendorElement = document.createElement('div');
        vendorElement.className = 'vendor-card';
        vendorElement.innerHTML = `
            <div class="vendor-info">
                <h3><i class="fas fa-user"></i> ${vendor.vendorName || 'Unnamed Vendor'}</h3>
                <p><i class="fas fa-id-card"></i> ID: ${vendor.vendorId || 'No ID'}</p>
            </div>
            <div class="vendor-actions">
                <button onclick="editVendor('${vendor.vendorId}')" class="btn btn-secondary">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button onclick="deleteVendor('${vendor.vendorId}')" class="btn btn-danger">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        
        setTimeout(() => vendorElement.classList.add('animate-in'), index * 100);
        vendorsDiv.appendChild(vendorElement);
    });
}

// Enhanced Mobile Menu Management
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('overlay');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu(force = null) {
        const shouldOpen = force !== null ? force : !sidebar.classList.contains('active');
        
        menuToggle.classList.toggle('active', shouldOpen);
        sidebar.classList.toggle('active', shouldOpen);
        overlay.classList.toggle('active', shouldOpen);
        body.classList.toggle('menu-open', shouldOpen);
    }

    // Handle menu toggle click
    menuToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking overlay
    overlay?.addEventListener('click', () => toggleMenu(false));

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                toggleMenu(false);
                
                // Delay section switch for smooth animation
                setTimeout(() => {
                    const sectionId = link.getAttribute('data-section');
                    showSection(sectionId);
                }, 300);
            }
        });
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            toggleMenu(false);
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            toggleMenu(false);
        }
    });
}

// Update initialization
document.addEventListener('DOMContentLoaded', () => {
    // Add overlay element to DOM
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    initializeMobileMenu();
    // ...rest of existing initialization code...
});

function validateInventorId(input) {
    // Remove any non-numeric characters
    input.value = input.value.replace(/[^0-9]/g, '');
    
    if (input.value === '') {
        input.setCustomValidity('Inventor ID is required and must be a number');
    } else {
        input.setCustomValidity('');
    }
}

function validateVendorId(input) {
    // Remove any decimal points and non-numeric characters
    input.value = input.value.replace(/[^\d]/g, '');
    
    // Convert to integer
    let value = parseInt(input.value);
    
    // Ensure it's a valid number
    if (isNaN(value)) {
        input.value = '';
        input.setCustomValidity('Vendor ID must be a valid integer number');
    } else {
        input.value = value;
        input.setCustomValidity('');
    }
}