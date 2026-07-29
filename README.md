# 🎂 Birthday Story - Premium Animated Birthday Website

A beautiful, mobile-first animated birthday website built with vanilla HTML, CSS, and JavaScript. Perfect for celebrating someone special with an emotional, cinematic experience.

## Live demo visit
https://birthday.alamincyber.com

## ✨ Features

- **5 Beautiful Pages** with smooth transitions
- **Animations**: Confetti, fireworks, floating hearts, butterflies, and more
- **Glassmorphism Design** with soft gradients and pink theme
- **Fully Responsive** - works perfectly on mobile, tablet, and desktop
- **Easy Customization** - edit everything through `config.js`
- **Offline Support** - works without internet connection
- **Accessibility** - keyboard navigation and screen reader support
- **Performance** - 60fps animations, no heavy libraries
- **Music Support** - include background music with play/mute controls

## 📁 Project Structure

```
birthday-story/
├── index.html           # Main HTML file
├── css/
│   └── style.css        # All styles and animations
├── js/
│   ├── app.js          # Main application logic
│   ├── config.js       # All editable content
│   └── animations.js   # Animation utilities
├── assets/
│   ├── images/
│   │   ├── photo1.jpg  # Page 2 photo
│   │   ├── photo2.jpg  # Page 3 photo
│   │   ├── photo3.jpg  # Page 4 photo
│   │   └── photo4.jpg  # Page 5 photo
│   └── audio/
│       └── music.mp3   # Background music
└── README.md           # This file
```

## 🚀 Quick Start

### 1. Extract the Project
Extract the birthday-story folder to your computer.

### 2. Open in Browser
Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

### 3. Customize Content
Edit `js/config.js` to personalize the birthday message (see Customization section below).

### 4. Add Photos
Replace the placeholder images in `assets/images/`:
- `photo1.jpg` - Used on Page 2
- `photo2.jpg` - Used on Page 3
- `photo3.jpg` - Used on Page 4
- `photo4.jpg` - Reserved for future use

### 5. Add Music (Optional)
Replace `assets/audio/music.mp3` with your chosen background music file.

## 🎨 Customization Guide

### Edit Person Information

Open `js/config.js` and update the person section:

```javascript
person: {
    name: "Al Amin",          // Change to the birthday person's name
    dateOfBirth: "February 21",    // Their date of birth
},
```

### Edit Messages

Update the content section in `config.js`:

```javascript
content: {
    // Page 1 - Opening Title
    openingTitle: "Happy Birthday ❤️",

    // Page 2 - Main Message
    page2: {
        photo: "assets/images/photo1.jpg",
        message: "Your custom birthday message here...",
    },

    // Page 3 - Special Moment
    page3: {
        photo: "assets/images/photo2.jpg",
        title: "A Special Year",
        message: "Tell them what makes them special...",
    },

    // Page 4 - Memories
    page4: {
        photo: "assets/images/photo3.jpg",
        memories: [
            "Memory One: First time we met...",
            "Memory Two: That funny thing you did...",
            "Memory Three: Your amazing quality...",
            "Memory Four: Thank you for...",
        ],
    },

    // Page 5 - The Letter
    page5: {
        letterTitle: "A Letter For You",
        letterContent: `Dear [Name],

Your complete heartfelt letter goes here.
You can write as much as you want.
It will scroll if needed.

With love,
[Your Name]`,
    },
},
```

### Change Theme Colors

Edit the theme section in `config.js`:

```javascript
theme: {
    primaryPink: "#FFB6D9",
    lightPink: "#FFE5F0",
    rose: "#E75480",
    peach: "#FFCBA4",
    white: "#FFFFFF",
    black: "#0a0a0a",
},
```

Or use any hex colors you prefer! Popular alternatives:
- **Purple Theme**: `#D8B5D8`, `#E6D0E6`, `#9D4E9D`
- **Blue Theme**: `#ADD8E6`, `#E0F0FF`, `#4169E1`
- **Green Theme**: `#90EE90`, `#E0FFE0`, `#228B22`

### Control Animations

In `config.js`, enable or disable animations:

```javascript
animations: {
    enableConfetti: true,           // Confetti on page 1
    enableFireworks: true,          // Fireworks on page 1
    enableFloatingHearts: true,     // Floating hearts
    enableParticles: true,          // Particle effects
    enableButterflies: true,        // Butterflies on page 3
    typingSpeed: 150,               // Speed in milliseconds (lower = faster)
},
```

### Music Control

Enable/disable and configure music:

```javascript
music: {
    enabled: true,                  // Set to false to disable music
    autoplay: true,                 // Try to autoplay (may be blocked)
    file: "assets/audio/music.mp3", // Path to your music file
},
```

## 📱 Page Breakdown

### Page 1: Opening Story
- Title with typing animation
- Confetti explosion
- Fireworks display
- Floating hearts
- Button to continue

**Customizable**: `config.content.openingTitle`

### Page 2: Photo & Info
- Circular photo
- Person's name
- Date of birth
- Birthday message
- All inside a beautiful glass card

**Customizable**:
- Photo: Replace `assets/images/photo1.jpg`
- `config.person.name`
- `config.person.dateOfBirth`
- `config.content.page2.message`

### Page 3: Split Layout
- Large photo on left
- Message on right
- Animated floating image
- Cute animated hearts
- Floating butterflies

**Customizable**:
- Photo: Replace `assets/images/photo2.jpg`
- `config.content.page3.title`
- `config.content.page3.message`

### Page 4: Memory Gallery
- Main photo
- 4 memory paragraphs that fade in
- Floating flowers
- Smooth scrolling

**Customizable**:
- Photo: Replace `assets/images/photo3.jpg`
- `config.content.page4.memories` (array of 4 strings)

### Page 5: Final Letter
- Animated night sky with stars and fireflies
- Beautiful glass letter card
- Long-form birthday letter
- Typing animation
- Floating hearts

**Customizable**:
- `config.content.page5.letterTitle`
- `config.content.page5.letterContent` (can be very long)

## 🎵 Adding Music

1. Find or create an MP3 file of your chosen song
2. Replace `assets/audio/music.mp3` with your file
3. Keep the filename as `music.mp3` or update the path in `config.js`

**Note**: If using copyrighted music, ensure you have the rights to use it.

## 🖼️ Using Your Own Photos

1. Prepare 4 high-quality photos:
   - `photo1.jpg` - Portrait style for page 2 (square or portrait)
   - `photo2.jpg` - Any style for page 3
   - `photo3.jpg` - Any style for page 4
   - `photo4.jpg` - Reserved for future

2. Place them in `assets/images/` folder
3. Keep the filenames as shown or update the paths in `config.js`

**Recommended**: Use JPG or PNG, ideally 1-2MB or less for faster loading.

## ⌨️ Navigation

### Mouse/Touch
- Click the "Next →" button to go forward
- Click the "← Back" button to go back

### Keyboard
- **→ Right Arrow or Space** - Next page
- **← Left Arrow** - Previous page

### Music Control
- Click the speaker icon (🔊/🔇) to toggle music on/off

## 🌐 Sharing

### Local File
Simply share the entire `birthday-story` folder. Recipients can open it by double-clicking `index.html`.

### Online Hosting (Recommended)
For best experience, upload to a web host:

**Free Options**:
- **Netlify**: Drag and drop your folder at netlify.com
- **Vercel**: Connect your folder at vercel.com
- **GitHub Pages**: Push to GitHub and enable pages
- **Surge**: CLI tool, very simple deployment

**Steps for Netlify** (easiest):
1. Go to netlify.com
2. Drag and drop your `birthday-story` folder
3. Share the generated link

## 🔧 Troubleshooting

### Music isn't playing
- Browsers often block autoplay. Click the speaker icon to play manually.
- Check that `music.mp3` file exists and is not corrupted.
- Ensure the file path in `config.js` is correct.

### Photos aren't showing
- Verify image files exist in `assets/images/`
- Check file paths in `config.js` match your files
- Try using JPG instead of PNG, or vice versa

### Animations seem slow
- Check browser performance (close other tabs)
- Reduce animation count in `config.js`
- Try `typingSpeed: 100` for faster typing

### Text isn't displaying correctly
- Ensure you didn't accidentally delete quotes in `config.js`
- Check for special characters that need escaping
- Use `\n` for line breaks in multi-line text

## 🎓 Development

### Project Technologies
- **HTML5** - Semantic structure
- **CSS3** - Animations, gradients, flexbox, grid
- **Vanilla JavaScript** - No frameworks or libraries
- **CSS Variables** - Easy theme customization

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Tips
- Images should be optimized (under 2MB each)
- Music file should be MP3 (smaller than WAV/FLAC)
- Animations use GPU acceleration for smooth 60fps
- No external libraries means fast loading

## 📝 License

This project is free to use and modify for personal use. Perfect for birthdays, anniversaries, and special celebrations!

## 🎉 Have Fun!

This is meant to bring joy and celebrate someone special. Feel free to modify colors, add more photos, customize every detail, and make it perfect for your loved one.

---

**Need help?** Double-check that:
1. All files are in the correct folders
2. File paths in `config.js` match your actual files
3. You're using a modern browser
4. JavaScript is enabled in your browser

Enjoy creating the perfect birthday surprise! 🎂💝
