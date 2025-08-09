# Politics AI Demo

A prototype AI-assisted political discussion web app built with React, Node.js, and OpenAI GPT-3.5-turbo. Deployable on Vercel.

## Features

- **AI Chat Interface**: Real-time political discussion with AI assistant
- **Responsive Design**: Works on mobile and desktop
- **Clean UI**: Modern chat interface with message bubbles
- **Error Handling**: Graceful error handling for API failures
- **Loading States**: Visual feedback during AI responses

## Tech Stack

- **Frontend**: React with styled-components
- **Backend**: Vercel Serverless Functions
- **AI**: OpenAI GPT-3.5-turbo
- **Deployment**: Vercel

## Project Structure

```
politics-ai-demo/
├── frontend/           # React app
│   ├── src/
│   │   ├── pages/     # Page components
│   │   └── App.jsx    # Main app component
│   └── package.json
├── api/               # Vercel serverless functions
│   └── chat.js        # Chat API endpoint
├── vercel.json        # Vercel configuration
└── package.json       # Root dependencies
```

## Setup

### Prerequisites

- Node.js 16+ 
- npm or yarn
- OpenAI API key

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd politics-ai-demo
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies (for API)
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables**
   In your Vercel dashboard, add the `OPENAI_API_KEY` environment variable.

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

## API Endpoints

### POST /api/chat

Send a message to the AI assistant.

**Request:**
```json
{
  "message": "What are your thoughts on climate change policy?"
}
```

**Response:**
```json
{
  "reply": "Climate change policy is a complex issue that requires balancing environmental protection with economic considerations..."
}
```

## Routes

- `/` or `/chat` - Main chat interface
- `/test` - Political leaning quiz (reserved for future)
- `/match` - Anonymous matching (reserved for future)

## Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key (required)

## Development

### Adding New Features

1. **Frontend**: Add components in `frontend/src/`
2. **API**: Add serverless functions in `api/`
3. **Styling**: Use styled-components for consistent styling

### Testing

```bash
# Test frontend
cd frontend
npm test

# Test API locally
npm run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License
