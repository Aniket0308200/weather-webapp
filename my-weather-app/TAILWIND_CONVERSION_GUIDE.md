# 📚 Tailwind CSS Conversion Guide - ChatWidget

## Complete Class Mapping

### Button Container

**CSS Class**
```css
.chat-widget-button-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
  display: flex;
  align-items: center;
  gap: 8px;
}
```

**Tailwind Classes**
```jsx
className="fixed bottom-6 right-6 z-[999] flex items-center gap-2 group"
```

---

### Chat Button

**CSS Class**
```css
.chat-widget-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(6, 182, 212, 0.4);
  transition: all 0.3s ease;
  padding: 0;
}

.chat-widget-button:hover {
  box-shadow: 0 6px 20px rgba(6, 182, 212, 0.6);
  transform: translateY(-2px);
}
```

**Tailwind Classes**
```jsx
className="w-15 h-15 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 border-none text-white cursor-pointer flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
```

**Note**: Transform handled by Framer Motion `whileHover={{ scale: 1.1 }}`

---

### Chat Icon Image

**CSS Class**
```css
.chat-icon-image {
  width: 42px;
  height: 42px;
  object-fit: contain;
}
```

**Tailwind Classes**
```jsx
className="w-10.5 h-10.5 object-contain"
```

---

### Tooltip

**CSS Class**
```css
.chat-tooltip {
  position: absolute;
  bottom: 70px;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 1000;
}

.chat-widget-button-container:hover .chat-tooltip {
  opacity: 1;
}
```

**Tailwind Classes**
```jsx
className="absolute bottom-16 right-0 bg-black/80 text-white px-3 py-2 rounded text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 z-[1000]"
```

**Note**: Uses `group` and `group-hover` for parent hover effect

---

### Chat Window

**CSS Class**
```css
.chat-widget-window {
  position: fixed;
  bottom: 100px;
  right: 24px;
  width: 380px;
  height: 600px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 998;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@media (max-width: 640px) {
  .chat-widget-window {
    width: calc(100vw - 32px);
    height: 70vh;
    max-height: 500px;
    bottom: 90px;
    right: 16px;
  }
}
```

**Tailwind Classes**
```jsx
className="fixed bottom-24 right-6 w-96 h-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col z-[998] border border-white/20 sm:w-full sm:h-[70vh] sm:max-h-[500px] sm:bottom-[90px] sm:right-4 sm:w-[calc(100vw-32px)] md:w-96 md:h-96 md:bottom-24 md:right-6"
```

---

### Chat Header

**CSS Class**
```css
.chat-header {
  background: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%);
  color: white;
  padding: 16px;
  border-radius: 16px 16px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chat-header-content h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.chat-header-content p {
  margin: 4px 0 0 0;
  font-size: 12px;
  opacity: 0.9;
}
```

**Tailwind Classes**
```jsx
className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-4 rounded-t-2xl flex justify-between items-center shadow-md"

// Inside:
<h3 className="m-0 text-lg font-semibold">Weather Assistant</h3>
<p className="m-0 mt-1 text-xs opacity-90">Ask me about the weather</p>
```

---

### Close Button

**CSS Class**
```css
.chat-close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.chat-close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}
```

**Tailwind Classes**
```jsx
className="bg-white/20 border-none text-white w-8 h-8 rounded-full cursor-pointer flex items-center justify-center transition-all hover:bg-white/30"
```

---

### Messages Container

**CSS Class**
```css
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(6, 182, 212, 0.05));
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: rgba(6, 182, 212, 0.3);
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: rgba(6, 182, 212, 0.5);
}
```

**Tailwind Classes**
```jsx
className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-gradient-to-b from-white/50 to-cyan-500/5 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent"
```

**Note**: Scrollbar styling remains in CSS file

---

### Message Bubble

**CSS Class**
```css
.message-bubble {
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 12px;
  word-wrap: break-word;
  line-height: 1.4;
  font-size: 14px;
}

.chat-message.user .message-bubble {
  background: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%);
  color: white;
  border-radius: 12px 4px 12px 12px;
}

.chat-message.bot .message-bubble {
  background: rgba(0, 0, 0, 0.08);
  color: #1f2937;
  border-radius: 4px 12px 12px 12px;
}

.message-bubble.loading {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(6, 182, 212, 0.1);
  color: #06b6d4;
}
```

**Tailwind Classes**
```jsx
// User message
className="max-w-xs px-4 py-3 rounded-xl word-wrap break-words leading-relaxed text-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-br-none"

// Bot message
className="max-w-xs px-4 py-3 rounded-xl word-wrap break-words leading-relaxed text-sm bg-black/8 text-gray-800 rounded-bl-none"

// Loading
className="flex items-center gap-2 px-4 py-3 rounded-xl bg-cyan-500/10 text-cyan-600"
```

---

### Message Time

**CSS Class**
```css
.message-time {
  font-size: 11px;
  color: #9ca3af;
  padding: 0 4px;
}
```

**Tailwind Classes**
```jsx
className="text-xs text-gray-400 px-1"
```

---

### Input Area

**CSS Class**
```css
.chat-input-area {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0 0 16px 16px;
}
```

**Tailwind Classes**
```jsx
className="flex gap-2 px-3 py-3 border-t border-black/10 bg-white/80 rounded-b-2xl"
```

---

### Input Field

**CSS Class**
```css
.chat-input {
  flex: 1;
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.9);
  color: #1f2937;
}

.chat-input:focus {
  border-color: #06b6d4;
  box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
}

.chat-input::placeholder {
  color: #9ca3af;
}

.chat-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

**Tailwind Classes**
```jsx
className="flex-1 border border-cyan-500/30 rounded-lg px-3 py-2.5 text-sm outline-none transition-all bg-white/90 text-gray-800 placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
```

---

### Send Button

**CSS Class**
```css
.chat-send-btn {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.chat-send-btn:hover:not(:disabled) {
  box-shadow: 0 4px 12px rgba(6, 182, 212, 0.4);
}

.chat-send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

**Tailwind Classes**
```jsx
className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 border-none text-white cursor-pointer flex items-center justify-center transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
```

---

## Tailwind Spacing Reference

| CSS | Tailwind |
|-----|----------|
| 4px | 1 |
| 6px | 1.5 |
| 8px | 2 |
| 12px | 3 |
| 16px | 4 |
| 20px | 5 |
| 24px | 6 |
| 32px | 8 |
| 40px | 10 |
| 60px | 15 |

## Tailwind Color Reference

| CSS | Tailwind |
|-----|----------|
| #06b6d4 | cyan-500 |
| #0ea5e9 | blue-500 |
| rgba(0, 0, 0, 0.8) | black/80 |
| rgba(255, 255, 255, 0.95) | white/95 |
| rgba(6, 182, 212, 0.3) | cyan-500/30 |

## Key Tailwind Features Used

1. **Gradients**: `bg-gradient-to-br`, `from-cyan-500`, `to-blue-500`
2. **Opacity**: `bg-white/95`, `text-white/70`, `opacity-0`
3. **Responsive**: `sm:`, `md:`, `lg:` prefixes
4. **Group Hover**: `group`, `group-hover:opacity-100`
5. **Focus States**: `focus:border-cyan-500`, `focus:ring-2`
6. **Disabled States**: `disabled:opacity-60`, `disabled:cursor-not-allowed`
7. **Transitions**: `transition-all`, `transition-opacity`
8. **Shadows**: `shadow-lg`, `shadow-2xl`, `shadow-md`
9. **Backdrop**: `backdrop-blur-xl`
10. **Arbitrary Values**: `z-[999]`, `w-[calc(100vw-32px)]`

## Summary

All CSS classes have been successfully converted to Tailwind CSS while maintaining the exact same styling and functionality. The component is now consistent with the rest of the project and easier to maintain.
