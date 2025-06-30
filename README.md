# Rock Paper Scissors - Advanced Edition

A modern, feature-rich Rock Paper Scissors game built with React, TailwindCSS, and Framer Motion. This project demonstrates advanced frontend development skills including responsive design, animations, state management, and modern UI/UX practices.

## 🚀 Features 

### Core Gameplay -
- **Classic Rock Paper Scissors** with modern UI
- **Real-time game logic** with dynamic result calculation
- **Computer AI** with randomized choices
- **Score tracking** with detailed statistics

### Advanced Features -
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - Powered by Framer Motion for engaging interactions
- **Glass Morphism UI** - Modern backdrop blur effects and transparency
- **Particle Background** - Animated canvas background for visual appeal
- **Jack Sparrow Soundtrack** - Immersive background music with themed audio effects
- **Sound Effects** - Optional audio feedback for game events with different audio cues for win/lose/tie
- **Game History** - Track your recent games and performance
- **Streak System** - Monitor your winning streaks and best performance
- **Win Rate Analytics** - Visual progress bars and statistics

### Technical Highlights -
- **React 18** with modern hooks and functional components
- **TailwindCSS** for utility-first styling with custom animations
- **Framer Motion** for smooth, performant animations
- **Lucide React** for beautiful, consistent icons
- **Vite** for fast development and building
- **ESLint** for code quality and consistency

## 🎵 Audio Features

### Jack Sparrow Soundtrack
- **Background Music** - Immersive Jack Sparrow theme that loops continuously
- **Volume Control** - Toggle audio on/off with animated volume button
- **Game Event Sounds** - Different audio cues for win, lose, and tie scenarios
- **Browser Compatibility** - Handles autoplay restrictions gracefully
- **User Interaction** - Audio starts on first user interaction to comply with browser policies

### Audio Controls
- **Volume Toggle** - Click the volume icon in the top-right corner
- **Visual Feedback** - Animated button with pulsing indicator when audio is active
- **Auto-start** - Audio begins playing on first game interaction
- **Loop Mode** - Background music continuously loops for uninterrupted gameplay

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd rock-paper-scissors-advanced
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📦 Build for Production

```bash
npm run build
```

## 🎮 How to Play

1. **Choose your weapon** - Click on Rock, Paper, or Scissors
2. **Watch the computer think** - Animated loading state while computer makes its choice
3. **See the result** - Dynamic animations show the outcome
4. **Track your progress** - Monitor your score, streak, and win rate
5. **Review history** - Check your recent games and performance

## 🎨 Design Features

### Visual Design
- **Dark theme** with gradient backgrounds
- **Glass morphism effects** for modern UI elements
- **Custom color palette** with game-themed colors
- **Typography** using Inter and Orbitron fonts
- **Responsive grid layouts** that adapt to screen size

### Animations
- **Entrance animations** for all components
- **Hover effects** with scale and glow animations
- **Game state transitions** with smooth morphing
- **Particle system** for ambient background animation
- **Loading states** with rotating icons

### User Experience
- **Intuitive controls** with clear visual feedback
- **Accessibility features** with proper contrast and focus states
- **Mobile-first design** with touch-friendly buttons
- **Performance optimized** with efficient rendering

## 🏗️ Project Structure

```
src/
├── components/
│   ├── BackgroundParticles.jsx    # Animated background
│   ├── GameChoice.jsx             # Choice buttons
│   ├── ResultDisplay.jsx          # Game results
│   └── ScoreBoard.jsx             # Statistics display
├── App.jsx                        # Main application
├── App.css                        # Custom styles
├── index.css                      # Global styles
└── main.jsx                       # Entry point
```

## 🎯 Tier 2 Requirements Met

This project fulfills all Tier 2 Advanced Frontend requirements:

✅ **Framework Usage** - Built with React using modern hooks and functional components  
✅ **Dynamic Logic** - Complex game logic with state management and event processing  
✅ **Responsive Design** - Mobile-first approach with TailwindCSS  
✅ **CSS Preprocessor** - TailwindCSS with custom configurations and animations  
✅ **Modern UI/UX** - Glass morphism, animations, and intuitive design  
✅ **Advanced Features** - Score tracking, game history, analytics, and sound effects  

## 🚀 Deployment

This project can be easily deployed to:

- **Netlify** - Drag and drop the `dist` folder
- **Vercel** - Connect your GitHub repository
- **Railway** - Deploy with one click
- **Render** - Connect and deploy automatically

## 🎨 Customization

### Colors
Modify the color scheme in `tailwind.config.js`:
```javascript
colors: {
  'game-primary': '#6366f1',
  'game-secondary': '#8b5cf6',
  'game-accent': '#f59e0b',
  
}
```

### Animations
Customize animations in `tailwind.config.js`:
```javascript
animation: {
  'bounce-slow': 'bounce 2s infinite',
  'pulse-slow': 'pulse 3s infinite',
}
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your portfolio or learning purposes.

## 🎓 Learning Outcomes

This project demonstrates:
- Modern React development patterns
- Advanced CSS with TailwindCSS
- Animation implementation with Framer Motion
- Responsive design principles
- State management in React
- Component architecture
- Performance optimization
- User experience design

Perfect for showcasing advanced frontend development skills! 🚀 
