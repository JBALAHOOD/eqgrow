# EQGrow - Emotional Intelligence Training Platform

A beautiful, modern web application for emotional intelligence training and personal growth. Built with clean HTML, CSS, and JavaScript - no frameworks or dependencies required.

## 🌟 Features

### 🏠 Home Dashboard
- **Daily EQ Exercises**: Rotating daily exercises focused on different EQ pillars
- **Progress Tracking**: Visual stats showing your streak, total exercises, and monthly progress
- **Quick Actions**: Easy access to assessment and journal features
- **Motivational Quotes**: Daily inspiration to keep you motivated

### 📊 EQ Assessment
- **10-Question Assessment**: Comprehensive evaluation of your emotional intelligence
- **Five EQ Pillars**: Self-awareness, self-regulation, empathy, social skills, and motivation
- **Detailed Results**: Percentage scores with category breakdown
- **Personalized Recommendations**: Actionable advice based on your results

### 📝 Reflection Journal
- **Daily Entries**: Write about your thoughts and emotions
- **Search Functionality**: Find past entries easily
- **Emotion Insights**: Track patterns in your emotional journey
- **Clean Interface**: Distraction-free writing experience

### 📚 Learn About EQ
- **Five Pillars Explained**: Detailed information about each EQ component
- **Visual Cards**: Beautiful, interactive learning cards
- **Practical Knowledge**: Understand how EQ impacts daily life

### 📈 Progress Tracking
- **Visual Progress**: See your growth over time
- **Activity Calendar**: Track your daily practice
- **Achievement System**: Celebrate your milestones

### 👤 Profile & Goals
- **Personal Information**: Manage your profile details
- **EQ Goals**: Set and track personal development goals
- **Customizable Settings**: Tailor the experience to your needs

## 🚀 Getting Started

### Local Development

1. **Download the files**:
   - `index.html`
   - `style.css`
   - `script.js`

2. **Open with Live Server**:
   - Install Live Server extension in VS Code
   - Right-click on `index.html` and select "Open with Live Server"
   - Or use any local server of your choice

3. **Alternative: Direct opening**:
   - Simply double-click `index.html` to open in your browser
   - Note: Some features may be limited without a local server

### Deployment

#### GitHub Pages
1. Create a new repository on GitHub
2. Upload the three files (`index.html`, `style.css`, `script.js`)
3. Go to Settings → Pages
4. Select "Deploy from a branch" and choose your main branch
5. Your site will be available at `https://yourusername.github.io/repository-name`

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to your project folder
3. Run `vercel` and follow the prompts
4. Your site will be deployed instantly

#### Netlify
1. Drag and drop your project folder to [netlify.com](https://netlify.com)
2. Your site will be live immediately
3. Customize your domain in the dashboard

## 🎨 Design Features

### Beautiful UI
- **Glass Morphism**: Modern glass-like effects with backdrop blur
- **Gradient Backgrounds**: Subtle, animated gradients for visual appeal
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Smooth Animations**: Delightful micro-interactions throughout

### Color Scheme
- **Sage Green**: Primary color representing growth and calm
- **Lavender Purple**: Secondary color for creativity and wisdom
- **Amber Gold**: Accent color for motivation and energy
- **Rose Pink**: Highlight color for emotional elements

### Typography
- **System Fonts**: Clean, readable typography using system fonts
- **Hierarchical Design**: Clear visual hierarchy for easy scanning
- **Accessible**: High contrast ratios for readability

## 📱 Responsive Design

The website is fully responsive and works beautifully on:
- **Mobile phones** (320px+)
- **Tablets** (768px+)
- **Desktop** (1024px+)
- **Large screens** (1440px+)

### Mobile Features
- **Collapsible Sidebar**: Hamburger menu for mobile navigation
- **Touch-Friendly**: Large buttons and touch targets
- **Optimized Layout**: Single-column layout on small screens

## 💾 Data Storage

All user data is stored locally in the browser using:
- **localStorage**: For user preferences and progress
- **Session Storage**: For temporary data during the session
- **No External Dependencies**: Complete privacy and offline functionality

### Data Persistence
- **User Progress**: Streaks, completed exercises, assessment results
- **Journal Entries**: All your reflections are saved locally
- **Settings**: Personal preferences and goals

## 🔧 Customization

### Adding Google AdSense
1. Sign up for Google AdSense
2. Add your AdSense code to the `<head>` section of `index.html`:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"></script>
   ```
3. Place ad units where desired in the HTML structure

### Customizing Colors
Edit the CSS custom properties in `style.css`:
```css
:root {
    --sage-500: #your-color;
    --lavender-500: #your-color;
    --amber-500: #your-color;
}
```

### Adding New Features
The modular JavaScript structure makes it easy to add new features:
- Add new pages to the navigation
- Create new components in the HTML
- Extend the AppState object for new data
- Add event listeners for new interactions

## 🛠 Technical Details

### File Structure
```
eqgrow/
├── index.html          # Main HTML file
├── style.css           # All styles and responsive design
├── script.js           # All JavaScript functionality
└── README.md           # This documentation
```

### Browser Support
- **Chrome** 80+
- **Firefox** 75+
- **Safari** 13+
- **Edge** 80+

### Performance
- **Lightweight**: No external dependencies
- **Fast Loading**: Optimized CSS and JavaScript
- **Efficient**: Minimal DOM manipulation
- **Smooth**: Hardware-accelerated animations

## 🎯 Key Benefits

### For Users
- **Privacy-First**: All data stays on your device
- **Offline Capable**: Works without internet connection
- **Fast Performance**: Instant loading and smooth interactions
- **Beautiful Design**: Modern, calming interface

### For Developers
- **Easy to Deploy**: Single HTML file with everything included
- **Easy to Customize**: Clean, well-documented code
- **SEO Friendly**: Semantic HTML structure
- **Accessible**: WCAG compliant design

## 🚀 Future Enhancements

Potential additions you could implement:
- **Export Data**: Download your progress as PDF/CSV
- **Social Features**: Share achievements with friends
- **Reminders**: Browser notifications for daily exercises
- **Advanced Analytics**: Detailed progress charts
- **Offline PWA**: Install as a mobile app

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs. The code is well-documented and easy to extend.

---

**Built with ❤️ for emotional intelligence development**

Transform your emotional intelligence journey with EQGrow - where personal growth meets beautiful design.