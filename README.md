# AI-Powered Marketing Strategy Generator

A comprehensive web application that helps startups and small businesses create personalized marketing strategies using AI and cultural intelligence.

## Features

- **Multi-step Business Information Collection**: Intuitive form to gather business details, target audience, and goals
- **Cultural Intelligence Analysis**: AI-powered analysis of target audience preferences and behaviors
- **Comprehensive Strategy Generation**: Brand messaging, content calendars, channel recommendations, and ad scripts
- **Professional Dashboard**: Clean, responsive interface with export capabilities

## AI Integration

### OpenAI GPT-4
- Generates cultural taste profiles based on business information
- Creates comprehensive marketing strategies with actionable recommendations
- Produces platform-specific content calendars and ad scripts

### Qloo API 
- Provides cultural intelligence data for enhanced audience analysis
- Maps cultural preferences to optimal marketing channels
- Identifies trending content formats relevant to target demographics

## Setup Instructions

### 1. Get API Keys

**OpenAI API Key:**
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Generate a new API key
4. Copy the key for use in your `.env` file

**Qloo API Key (Optional):**
1. Visit [Qloo Developers](https://www.qloo.com/developers)
2. Sign up for an account
3. Request API access
4. Copy the key for use in your `.env` file

### 2. Configure Environment Variables

Update the `.env` file in the project root:

```env
VITE_OPENAI_API_KEY=your_actual_openai_api_key_here
VITE_QLOO_API_KEY=your_actual_qloo_api_key_here
```

### 3. Run the Application

```bash
npm run dev
```

## How It Works

1. **Business Information Collection**: Users fill out a multi-step form with their business details, target audience, and marketing goals.

2. **Cultural Analysis**: The system analyzes the target audience using either Qloo's cultural intelligence API or GPT-4 to generate detailed taste profiles.

3. **Strategy Generation**: GPT-4 creates comprehensive marketing strategies including:
   - Brand messaging and taglines
   - 6-week content calendars
   - Channel recommendations with budget allocations
   - Influencer collaboration strategies
   - Platform-specific ad scripts

4. **Results Dashboard**: Users receive a comprehensive strategy report with actionable recommendations, copy-to-clipboard functionality, and export options.

## API Integration Details

### OpenAI Integration
- Uses GPT-4 for both cultural analysis and strategy generation
- Implements structured prompts for consistent, actionable output
- Includes error handling and fallback to mock data

### Qloo Integration
- Provides enhanced cultural intelligence when available
- Falls back to AI-generated insights if Qloo is unavailable
- Maps cultural data to marketing recommendations

## Security Notes

- API keys are stored in environment variables
- Client-side API calls are used for demo purposes
- In production, consider moving API calls to a secure backend
- Never commit API keys to version control

## Fallback Behavior

The application includes robust fallback mechanisms:
- If OpenAI is unavailable, uses industry-specific mock data
- If Qloo is unavailable, uses GPT-4 for cultural analysis
- Graceful error handling with user-friendly messages

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **AI Services**: OpenAI GPT-4, Qloo API
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Vite