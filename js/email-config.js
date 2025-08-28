// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/
// 2. Create a free account
// 3. Add an email service (Gmail)
// 4. Create an email template
// 5. Get your Public Key, Service ID, and Template ID
// 6. Replace the values below

const EMAIL_CONFIG = {
    // Get from EmailJS Dashboard -> Account -> API Keys
    PUBLIC_KEY: 'prjIZlyUwDG8noyXF',
    
    // Get from EmailJS Dashboard -> Email Services
    SERVICE_ID: 'service_y6aydpo',
    
    // Get from EmailJS Dashboard -> Email Templates
    TEMPLATE_ID: 'template_nakxnuh', // Original template
    VISITOR_TEMPLATE_ID: 'template_xvpv19h' // New template with visitor info
};

// Initialize EmailJS
function initEmailJS() {
    // Initialize EmailJS with the public key
    if (EMAIL_CONFIG.PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
        emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
        return true;
    }
    return false;
}

// Export for use in script.js
window.EMAIL_CONFIG = EMAIL_CONFIG;
window.initEmailJS = initEmailJS;
