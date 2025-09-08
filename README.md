# ForexAI Pro - Advanced Trading Platform

A professional forex trading platform with AI-powered analysis, real-time data visualization, and subscription management.

## Features

- 🤖 **AI-Powered Analysis**: Advanced trading signals and market analysis
- 📊 **Real-time Charts**: Interactive price and volume charts
- 📰 **Market News**: Latest forex market news and updates
- 💳 **Subscription Management**: Multiple pricing tiers with Stripe integration
- 👨‍💼 **Admin Dashboard**: Comprehensive analytics and user management
- 🔐 **Secure Authentication**: Supabase-powered user authentication
- 📱 **Responsive Design**: Works perfectly on all devices

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Backend**: Supabase (Authentication, Database)
- **Payments**: Stripe integration ready
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your Supabase credentials

5. Start the development server:
   ```bash
   npm run dev
   ```

### Environment Variables

Create a `.env` file with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key (optional)
```

## Deployment

This project is configured for easy deployment on Netlify:

1. Connect your repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push to main branch

The `netlify.toml` file includes:
- Build configuration
- SPA routing redirects
- Security headers
- Asset caching

## Subscription Plans

- **Starter**: $19/month (was $29) - 5 currency pairs, 100 analyses
- **Professional**: $69/month (was $79) - 15 currency pairs, 1000 analyses
- **Enterprise**: $189/month (was $199) - Unlimited access

## Admin Features

Access admin dashboard with email: `admin@forexai.pro`

- User analytics and metrics
- Revenue tracking
- Subscription management
- Growth charts and insights

## API Integration

The platform supports integration with:
- TwelveData (Forex data)
- NewsAPI (Market news)
- Google Gemini (AI analysis)

## License

This project is licensed under the MIT License.

## Support

For support, email support@forexai.pro or create an issue in the repository.