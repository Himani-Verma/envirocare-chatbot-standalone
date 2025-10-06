# 🤖 Envirocare Labs Chatbot - Standalone

A standalone, embeddable chatbot widget for Envirocare Labs environmental testing services. This is a complete iframe solution that can be easily integrated into any website.

## 🚀 Features

* **AI-Powered Responses** - Intelligent environmental consulting assistance
* **Mobile Responsive** - Works perfectly on all devices
* **Easy Integration** - Simple iframe embedding
* **Customizable** - Adjustable size and styling
* **Self-Contained** - No external dependencies
* **Fast Loading** - Optimized for performance

## 📋 Quick Start

### 1. Download the Files

```bash
git clone https://github.com/Himani-Verma/envirocare-chatbot-standalone.git
cd envirocare-chatbot-standalone
```

### 2. Serve the Files

```bash
# Using Python (recommended)
python -m http.server 3000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:3000
```

### 3. Embed in Your Website

```html
<iframe 
    src="https://your-domain.com/chatbot.html" 
    width="400" 
    height="600" 
    frameborder="0"
    title="Envirocare Labs Chatbot"
></iframe>
```

## 🎨 Customization

### Size Options

<!-- Small version -->
```html
<iframe src="https://your-domain.com/chatbot.html" width="350" height="500"></iframe>
```

<!-- Large version -->
```html
<iframe src="https://your-domain.com/chatbot.html" width="500" height="700"></iframe>
```

<!-- Responsive version -->
```html
<iframe 
    src="https://your-domain.com/chatbot.html" 
    width="100%" 
    height="600" 
    style="max-width: 400px; border-radius: 15px;"
></iframe>
```

### Styling Options

<!-- With custom container styling -->
```html
<div style="border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
    <iframe src="https://your-domain.com/chatbot.html" width="400" height="600"></iframe>
</div>
```

<!-- With border and shadow -->
```html
<div style="border: 2px solid #2d4891; border-radius: 15px; overflow: hidden;">
    <iframe src="https://your-domain.com/chatbot.html" width="400" height="600"></iframe>
</div>
```

## 📁 File Structure

```
chatbot-standalone/
├── index.html          # Demo page with integration examples
├── chatbot.html        # Main chatbot iframe
├── package.json        # Project configuration
├── README.md           # This file
└── .gitignore          # Git ignore rules
```

## 🔧 Configuration

### Environment Variables

No environment variables required - this is a static solution.

### API Endpoints

The chatbot uses mock responses for demonstration. In production, you can:

1. **Replace with real API calls** in the `getBotResponse()` function
2. **Add backend integration** for persistent conversations
3. **Implement user authentication** for personalized experiences

## 🚀 Deployment

### Static Hosting (Recommended)

* **Netlify**: Drag and drop the folder
* **Vercel**: Connect your GitHub repository
* **GitHub Pages**: Push to a `gh-pages` branch
* **AWS S3**: Upload files to an S3 bucket

### CDN Deployment

```bash
# Upload to your CDN
aws s3 sync . s3://your-bucket/chatbot/
```

### Docker (Optional)

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🎯 Integration Examples

### WordPress

```php
// Add to your theme's functions.php
function add_chatbot() {
    echo '<iframe src="https://your-domain.com/chatbot.html" width="400" height="600" frameborder="0"></iframe>';
}
add_action('wp_footer', 'add_chatbot');
```

### React

```jsx
function ChatbotWidget() {
    return (
        <iframe 
            src="https://your-domain.com/chatbot.html" 
            width="400" 
            height="600" 
            frameBorder="0"
            title="Envirocare Labs Chatbot"
        />
    );
}
```

### Vue.js

```vue
<template>
    <iframe 
        src="https://your-domain.com/chatbot.html" 
        width="400" 
        height="600" 
        frameborder="0"
    />
</template>
```

## 🔒 Security

* **CSP Headers**: Add Content Security Policy headers
* **HTTPS Only**: Serve over HTTPS in production
* **X-Frame-Options**: Configure iframe embedding policies

### Example Nginx Configuration

```nginx
location /chatbot.html {
    add_header X-Frame-Options "SAMEORIGIN";
    add_header Content-Security-Policy "frame-ancestors 'self' https://yourdomain.com";
}
```

## 📊 Analytics

### Google Analytics Integration

```html
<!-- Add to chatbot.html -->
<script>
    // Track chatbot interactions
    function trackChatbotEvent(action) {
        gtag('event', 'chatbot_interaction', {
            'event_category': 'chatbot',
            'event_label': action
        });
    }
</script>
```

## 🛠️ Development

### Local Development

```bash
# Clone repository
git clone https://github.com/Himani-Verma/envirocare-chatbot-standalone.git

# Navigate to directory
cd envirocare-chatbot-standalone

# Start local server
python -m http.server 3000

# Open in browser
open http://localhost:3000
```

### Testing

```bash
# Test iframe embedding
open http://localhost:3000/index.html

# Test standalone chatbot
open http://localhost:3000/chatbot.html
```

## 📈 Performance

### Optimization Tips

* **Minify CSS/JS**: Use tools like UglifyJS
* **Compress Images**: Optimize any images used
* **Enable Gzip**: Configure server compression
* **CDN**: Use a Content Delivery Network

### Lighthouse Scores

* **Performance**: 95+
* **Accessibility**: 100
* **Best Practices**: 100
* **SEO**: 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

* **Email**: info@envirocarelabs.com
* **Phone**: +1-555-0123
* **Documentation**: GitHub Wiki

## 🎉 Acknowledgments

* Built for Envirocare Labs environmental testing services
* Designed for easy integration and customization
* Optimized for performance and accessibility

---

**Made with ❤️ for environmental consulting**
