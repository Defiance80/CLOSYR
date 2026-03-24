# CLOSYR™ - Deal Intelligence & Escrow Operating System

> **Where deals don't just close — they converge.**

A modern, AI-powered Deal Intelligence and Escrow Operating System built for the future of real estate transactions.

## 🚀 Features

### Phase 1 - Foundation (Current)
- **Deal Health Scoring** - Real-time health monitoring with 0-100 scoring system
- **Transaction Command Center** - Three-panel interface for comprehensive deal management
- **Document Intelligence** - AI-powered document categorization and status tracking
- **WatchDog Fraud Detection** - Real-time fraud alerts and risk assessment
- **Interactive Dashboard** - Mission control for all active deals
- **Responsive Design** - Mobile-first, glassmorphic UI with dark theme

### Core Modules
- 📊 **Dashboard** - Deal health overview, stats, and next-best-action recommendations
- 🔄 **Transactions** - Full transaction lifecycle management
- 📄 **Documents** - Intelligent document management with auto-categorization
- 💬 **Communications** - Centralized party communication hub
- 💰 **Funds** - Secure escrow fund tracking and management
- ⚡ **Automation** - Workflow automation (Coming in Phase 2)
- 📈 **Analytics** - Advanced reporting and insights (Coming in Phase 2)
- 👥 **Client Portal** - Client-facing interface (Coming in Phase 2)
- 🔌 **Integrations** - Third-party service connections (Coming in Phase 2)

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS v3 (Vercel-optimized), shadcn/ui components
- **Animations**: Framer Motion
- **Typography**: Inter font family
- **Icons**: Lucide React
- **Charts**: Recharts
- **Build**: Turbopack for fast development

## 🎨 Design System

### Colors
- **Background**: #0B0F14 (Deep dark base)
- **Primary Blue**: #3B82F6 (CLOSYR brand blue)
- **Success Green**: #22C55E (Health scores, approvals)
- **Gold Accent**: #D4AF37 (Premium features, highlights)

### Design Philosophy
- **Glassmorphism**: Subtle backdrop-blur effects with semi-transparent cards
- **Mission Control Aesthetic**: Bloomberg Terminal meets modern fintech
- **Dark-First**: Designed for professional environments
- **Intentional Interactions**: Every click feels purposeful and fluid

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone git@github.com:Defiance80/CLOSYR.git
cd CLOSYR

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Demo Credentials
- **Email**: `demo@closyr.ai`
- **Password**: `closyrdemo123`

## 📦 Deployment

### Vercel (Recommended)
The application is optimized for Vercel deployment:

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel deploy
```

### Other Platforms
Standard Next.js deployment process:

```bash
npm run build
npm start
```

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Main dashboard
│   ├── transactions/      # Transaction management
│   ├── documents/         # Document intelligence
│   ├── login/            # Authentication
│   └── ...               # Other modules
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── layout/           # Layout components
└── lib/                  # Utility functions
```

## 🎯 Phase Roadmap

### Phase 1 ✅ - Foundation (Current)
- Core dashboard and navigation
- Transaction command center
- Document management basics
- Deal health scoring
- WatchDog fraud detection UI

### Phase 2 🔄 - Intelligence (Planned)
- Advanced automation workflows
- AI-powered insights and predictions  
- Real-time collaboration features
- Mobile applications
- Advanced analytics and reporting

### Phase 3 🔮 - Scale (Future)
- Multi-market expansion
- Enterprise features
- Advanced integrations
- Machine learning optimizations

## 🔧 Development

### Key Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Style
- TypeScript for type safety
- ESLint + Next.js config for code quality
- Prettier formatting (via ESLint)
- Tailwind CSS for styling

## 🧪 Demo Data

The application includes comprehensive mock data for demonstration:
- 3+ sample transactions at various stages
- Document examples with AI categorization
- Real-time activity feeds
- Health score calculations
- Party information and communications

## 🔐 Security Features

- **WatchDog Fraud Detection**: Real-time monitoring of suspicious activities
- **Secure Document Handling**: Encrypted document storage and transmission
- **Multi-factor Authentication**: Enhanced security for user accounts
- **Audit Trails**: Complete transaction history tracking
- **Role-based Access**: Granular permission system

## 📱 Browser Support

- Chrome 90+ (Recommended)
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

This is a prototype/demo application. For production use, contact GoKoncentrate.

## 📄 License

Proprietary - All rights reserved.

## 👨‍💻 Developed by GoKoncentrate

**CLOSYR™** is developed by GoKoncentrate, specialists in modern fintech and real estate technology solutions.

---

*Built with ❤️ for the future of real estate transactions*