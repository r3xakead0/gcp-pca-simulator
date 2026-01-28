# Professional Cloud Architect Exam Simulator

A comprehensive web-based exam simulator for Google Cloud Professional Cloud Architect certification preparation. This interactive tool provides practice questions with immediate feedback, progress tracking, and detailed results analysis.

## 🚀 Features

- ✅ Interactive exam simulation with real-time feedback
- ✅ Support for single and multiple correct answers per question
- ✅ Collapsible question navigation panel
- ✅ Detailed performance analytics and scoring
- ✅ Responsive design for desktop and mobile devices
- ✅ SEO optimized with proper metadata and schema markup
- ✅ GitHub integration with source code reference
- ✅ Cloudflare Pages deployment ready

## 📋 Prerequisites

- Web browser with JavaScript support
- Questions stored in JSON format in the `questions/` directory

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/r3xakead0/gcp-pca-simulator.git
cd gcp-pca-simulator
```

2. Place your question files in the `questions/` directory as numbered JSON files (e.g., `1.json`, `2.json`, etc.)

3. Open `index.html` in your preferred web browser

## 📁 Project Structure

```
gcp-pca-simulator/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── questions/          # Question JSON files
│   ├── 1.json
│   ├── 2.json
│   └── ...
├── README.md           # Documentation
├── sitemap.xml         # SEO sitemap
├── robots.txt          # SEO configuration
└── .github/
    └── workflows/
        └── deploy.yml  # CI/CD workflow
```

## 📝 Question Format

Each question file in the `questions/` directory should follow this format:

```json
{
  "published_iso": "2023-01-15T10:30:00Z",
  "number": 1,
  "question": "Your question text here...",
  "options": [
    {
      "key": "A",
      "text": "First option text"
    },
    {
      "key": "B", 
      "text": "Second option text"
    }
  ],
  "answers": {
    "platform": ["A"]  // Correct answer key(s)
  }
}
```

## 🔧 Configuration

### Environment Variables

For Cloudflare Pages deployment, set these secrets in your GitHub repository:

- `CLOUDFLARE_API_TOKEN`: Cloudflare API token with Pages permissions
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID
- `CLOUDFLARE_PROJECT_NAME`: Cloudflare Pages project name

### Customization

You can customize the following aspects:

- **Styling**: Modify `styles.css` to change the appearance
- **Functionality**: Update `script.js` for custom behavior
- **SEO**: Edit meta tags in `index.html` for your domain
- **Questions**: Add or modify JSON files in the `questions/` directory

## 🚀 Deployment

### Manual Deployment

Upload all files to your preferred web hosting service, ensuring the directory structure is preserved.

### Cloudflare Pages (Recommended)

The repository includes a GitHub Actions workflow for automated deployment to Cloudflare Pages:

1. Fork this repository
2. Connect to Cloudflare Pages
3. Configure the required secrets in GitHub
4. Push changes to trigger automatic deployment

### Local Development

Serve the files using any local HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

## 📊 Usage

1. Launch the application in your web browser
2. Questions will load automatically from the `questions/` directory
3. Select answers and submit for immediate feedback
4. Use the navigation panel to move between questions
5. Review detailed results after completing the exam
6. Use the collapse/expand feature for the question panel

## 🔍 SEO Features

- Proper meta tags and Open Graph protocol
- Schema.org structured data
- Responsive design
- Semantic HTML structure
- Sitemap and robots.txt included
- Dynamic meta tag updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐙 GitHub Repository

Source code: [https://github.com/r3xakead0/gcp-pca-simulator](https://github.com/r3xakead0/gcp-pca-simulator)

## 📞 Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/r3xakead0/gcp-pca-simulator).

---

Made with ❤️ by r3xakead0

[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://cloudflare.com)