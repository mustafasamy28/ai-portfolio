# Chatbot Setup Guide

## Environment Configuration (Step 11)

To complete the chatbot setup, you need to configure the OpenAI API key in Vercel:

### Steps:

1. **Get your OpenAI API Key**
   - Go to https://platform.openai.com/api-keys
   - Create a new API key if you don't have one
   - Copy the key (it starts with `sk-`)

2. **Add to Vercel Environment Variables**
   - Go to your Vercel project dashboard
   - Navigate to **Settings** → **Environment Variables**
   - Add a new variable:
     - **Name**: `OPENAI_API_KEY`
     - **Value**: Your OpenAI API key (paste the `sk-...` key)
     - **Environment**: Select all (Production, Preview, Development)
   - Click **Save**

3. **Redeploy**
   - After adding the environment variable, redeploy your application
   - The chatbot will now be able to use OpenAI GPT-4o-mini for fallback responses

### Testing

Once configured:
- Rule-based responses (keyword matches) will work immediately
- OpenAI fallback will work after the API key is configured
- Rate limiting (5 messages/day) is active
- Voice chat uses OpenAI Whisper for transcription

### Troubleshooting

- **"OPENAI_API_KEY is not configured"**: Make sure you've added the environment variable in Vercel and redeployed
- **FormData parsing errors in voice chat**: You may need to install a FormData parser library like `formidable` or `busboy` for production
- **CORS errors**: The serverless functions include CORS headers, but if you encounter issues, check your Vercel configuration

### Cost Estimation

- GPT-4o-mini: ~$0.002-0.01 per conversation
- Whisper API: ~$0.006 per minute of audio
- Low traffic (100 conversations/month): ~$0.20-1.00/month
- Moderate traffic (500 conversations/month): ~$1-5/month

