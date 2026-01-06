# AI Features Setup - Google Gemini Integration

## Overview

The AI Tuner and AI Mechanic now use **Google's Gemini AI** (the same AI powering Antigravity) instead of GPT or DeepSeek!

## Features

### 🔧 AI Tuner
- Powered by Gemini 2.0 Flash Exp
- Analyzes datalogs (boost, AFR, timing)
- Provides custom ECU tuning advice
- Vehicle-aware recommendations based on your garage setup
- Supports all major ECU platforms (JB4, Cobb, MHD, ECUTEK)

### 🛠️ AI Mechanic
- Powered by Gemini 2.0 Flash Exp
- Diagnoses fault codes and mechanical issues
- Installation guidance
- Maintenance schedules
- Vehicle-specific troubleshooting

## Setup Instructions

### 1. Get a Gemini API Key (FREE!)

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy your new API key

### 2. Configure Your Project

1. Navigate to your project folder:
   ```bash
   cd C:\Users\burri\OneDrive\Desktop\first_project_Jamie_hamza\amtuning-local
   ```

2. Create a `.env` file (copy from example):
   ```bash
   copy .env.example .env
   ```

3. Open `.env` in your text editor and add your API key:
   ```
   VITE_GEMINI_API_KEY=YOUR_ACTUAL_API_KEY_HERE
   ```

4. Save the file

### 3. Restart Your Dev Server

If your dev server is running, restart it to load the new environment variable:

```bash
# Stop the server (Ctrl+C)
# Then restart it
npm run dev
```

## Demo Mode

If you **don't** configure an API key, the AI will run in **demo mode** with basic fallback responses. You'll see a message indicating "demo mode active" when you interact with the AI features.

## Cost

Gemini 2.0 Flash Exp is **FREE** with generous limits:
- 15 requests per minute
- 1,500 requests per day
- More than enough for testing and moderate use!

For production use, you may want to upgrade to a paid tier, but the free tier is perfect for development.

## Testing

1. Navigate to **AI Tuner** page
2. Try asking: "I need a Stage 2 tune for my car"
3. The AI should respond with personalized advice based on your garage setup!

## API Reference

- **Model**: `gemini-2.0-flash-exp`
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent`
- **Documentation**: https://ai.google.dev/docs

## Troubleshooting

### "Demo mode active" message
- Your API key is not set or invalid
- Check your `.env` file has the correct key
- Make sure you restarted the dev server after adding the key

### API errors in console
- Check your API key is valid
- Ensure you haven't exceeded rate limits
- Verify your internet connection

### AI responses are slow
- First request may be slower (cold start)
- Subsequent requests should be fast
- Check your network connection

## Privacy & Security

⚠️ **IMPORTANT**: Never commit your `.env` file to version control!

The `.gitignore` file already excludes `.env` files, but always double-check before pushing to GitHub.

---

**Need help?** Check the [Google AI documentation](https://ai.google.dev/docs) or contact support.
