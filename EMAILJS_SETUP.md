# EmailJS Setup Instructions

To make the contact form functional and send emails to minkaungkhant.k2@gmail.com, follow these steps:

## 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Sign up for a free account (allows 200 emails/month)

## 2. Add Email Service
- In EmailJS Dashboard, go to "Email Services"
- Click "Add New Service"
- Choose "Gmail"
- Connect your Gmail account (minkaungkhant.k2@gmail.com)
- Note down the **Service ID** (e.g., "service_abc123")

## 3. Create Email Template
- Go to "Email Templates"
- Click "Create New Template"
- Use this template:

**Subject:** New Contact Form Message: {{subject}}

**Content:**
```
Hello Min Kaung Khant,

You have received a new message from your portfolio contact form:

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
Reply to: {{reply_to}}
```

- Save the template and note down the **Template ID** (e.g., "template_xyz789")

## 4. Get Public Key
- Go to "Account" → "API Keys"
- Copy your **Public Key** (e.g., "abcdefghijklmnop")

## 5. Update Configuration
Edit `js/email-config.js` and replace:

```javascript
const EMAIL_CONFIG = {
    PUBLIC_KEY: 'your_actual_public_key_here',
    SERVICE_ID: 'your_service_id_here', 
    TEMPLATE_ID: 'your_template_id_here'
};
```

## 6. Test the Form
- Open your portfolio
- Fill out the contact form
- Submit and check your Gmail inbox

## Security Note
The Public Key is safe to expose in frontend code. EmailJS handles the secure email sending on their servers.

## Troubleshooting
- Check browser console for any error messages
- Verify all IDs are correct in email-config.js
- Ensure Gmail service is properly connected in EmailJS dashboard
- Check EmailJS usage limits in your dashboard
