#!/usr/bin/env ts-node
/**
 * SaaS Code Generator (TypeScript)
 * Generates a complete full-stack SaaS application with TypeScript
 */

import fs = require('fs');
import path = require('path');
import { SaaSCandidate } from './types';

export class SaaSCodeGenerator {
  private saas: SaaSCandidate;
  private projectName: string;
  private outputDir: string;

  constructor(saasData: SaaSCandidate) {
    this.saas = saasData;
    this.projectName = saasData.name.toLowerCase().replace(/\s+/g, '-');
    this.outputDir = `./generated-clones/${this.projectName}`;
  }

  public async generateClone(): Promise<string> {
    console.log(`🚀 Generating ${this.saas.name} TypeScript clone...`);
    
    try {
      await this.createProjectStructure();
      await this.generateFrontend();
      await this.generateBackend();
      await this.generateDocumentation();
      
      console.log(`✅ TypeScript clone generated successfully at: ${this.outputDir}`);
      console.log(`🔧 Next steps:`);
      console.log(`   cd ${this.outputDir}`);
      console.log(`   cd frontend && npm install && npm run dev`);
      
      return this.outputDir;
      
    } catch (error) {
      console.error('❌ TypeScript generation failed:', (error as Error).message);
      throw error;
    }
  }

  private async createProjectStructure(): Promise<void> {
    console.log('📁 Creating TypeScript project structure...');
    
    const dirs = [
      this.outputDir,
      `${this.outputDir}/frontend/src/pages`,
      `${this.outputDir}/frontend/src/components`,
      `${this.outputDir}/frontend/src/types`,
      `${this.outputDir}/frontend/src/styles`,
      `${this.outputDir}/backend/src`,
      `${this.outputDir}/backend/src/types`
    ];

    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  private async generateFrontend(): Promise<void> {
    console.log('⚛️ Generating Next.js TypeScript frontend...');
    
    // Package.json with TypeScript
    const packageJson = {
      name: `${this.projectName}-frontend`,
      version: "1.0.0",
      private: true,
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
        "type-check": "tsc --noEmit"
      },
      dependencies: {
        "next": "14.0.0",
        "react": "^18.0.0",
        "react-dom": "^18.0.0",
        "tailwindcss": "^3.3.0"
      },
      devDependencies: {
        "typescript": "^5.0.0",
        "@types/node": "^20.0.0",
        "@types/react": "^18.0.0",
        "@types/react-dom": "^18.0.0"
      }
    };

    fs.writeFileSync(
      `${this.outputDir}/frontend/package.json`,
      JSON.stringify(packageJson, null, 2)
    );

    // TypeScript config
    const tsConfig = {
      compilerOptions: {
        target: "es5",
        lib: ["dom", "dom.iterable", "es6"],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "node",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "preserve",
        incremental: true
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
      exclude: ["node_modules"]
    };

    fs.writeFileSync(
      `${this.outputDir}/frontend/tsconfig.json`,
      JSON.stringify(tsConfig, null, 2)
    );

    // Generate TypeScript types
    const frontendTypes = `// Frontend TypeScript definitions
export interface Feature {
  name: string;
  description: string;
  isActive: boolean;
}

export interface DashboardStats {
  totalItems: number;
  activeItems: number;
  completedItems: number;
}
`;

    fs.writeFileSync(`${this.outputDir}/frontend/src/types/index.ts`, frontendTypes);

    // Generate main TypeScript page
    const homePage = `import React from 'react';
import Head from 'next/head';

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => (
  <div className="text-center p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
      <span className="text-blue-600 font-bold">✓</span>
    </div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Home: React.FC = () => {
  const features: string[] = ${JSON.stringify(this.saas.features)};

  return (
    <>
      <Head>
        <title>${this.saas.name} - TypeScript</title>
        <meta name="description" content="${this.saas.description || this.saas.name} - Built with TypeScript" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <header className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">
              ${this.saas.name} <span className="text-sm text-blue-500">TS</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              ${this.saas.description || this.saas.name}
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Built with TypeScript for maximum type safety and developer experience
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm mb-8">
              <span className="mr-2">💪</span>
              100% Type Safe • Zero Runtime Type Errors
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(this.saas.features.length, 4)} gap-8 mt-12">
              {features.map((feature: string, index: number) => (
                <FeatureCard
                  key={index}
                  title={feature}
                  description={\`Type-safe \${feature} implementation\`}
                />
              ))}
            </div>

            <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <h2 className="text-2xl font-bold mb-4">TypeScript Powered! 🚀</h2>
              <div className="grid md:grid-cols-3 gap-4 text-center mb-6">
                <div>
                  <div className="text-2xl mb-2">🛡️</div>
                  <div className="font-semibold">Type Safety</div>
                  <div className="text-sm text-gray-600">Catch errors at compile time</div>
                </div>
                <div>
                  <div className="text-2xl mb-2">🧠</div>
                  <div className="font-semibold">IntelliSense</div>
                  <div className="text-sm text-gray-600">Better autocomplete & refactoring</div>
                </div>
                <div>
                  <div className="text-2xl mb-2">📚</div>
                  <div className="font-semibold">Self-Documenting</div>
                  <div className="text-sm text-gray-600">Types serve as documentation</div>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-md hover:from-blue-700 hover:to-purple-700 transition-colors">
                  Start Building
                </button>
                <button className="bg-white text-gray-800 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors border">
                  View TypeScript Code
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-gray-900 text-white py-12 mt-20">
          <div className="container mx-auto px-4 text-center">
            <p>© 2026 ${this.saas.name} TypeScript Clone</p>
            <p className="text-gray-400 mt-2">Built with TypeScript + Next.js for #dayXofkillingSaaS</p>
            <div className="mt-4 inline-flex items-center px-3 py-1 bg-blue-600 rounded-full text-sm">
              <span className="mr-2">⚡</span>
              Type-Safe SaaS Development
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;`;

    fs.writeFileSync(`${this.outputDir}/frontend/src/pages/index.tsx`, homePage);

    // Generate Tailwind config
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

    fs.writeFileSync(`${this.outputDir}/frontend/tailwind.config.js`, tailwindConfig);

    // Generate CSS
    const globalCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors;
  }
}`;

    fs.writeFileSync(`${this.outputDir}/frontend/src/styles/globals.css`, globalCss);
  }

  private async generateBackend(): Promise<void> {
    console.log('🔧 Generating Express TypeScript backend...');
    
    // Package.json for TypeScript backend
    const packageJson = {
      name: `${this.projectName}-backend`,
      version: "1.0.0",
      description: `TypeScript Backend for ${this.saas.name}`,
      main: "dist/server.js",
      scripts: {
        start: "node dist/server.js",
        dev: "ts-node-dev src/server.ts",
        build: "tsc",
        "type-check": "tsc --noEmit"
      },
      dependencies: {
        "express": "^4.18.0",
        "cors": "^2.8.5",
        "helmet": "^7.0.0"
      },
      devDependencies: {
        "typescript": "^5.0.0",
        "@types/node": "^20.0.0",
        "@types/express": "^4.17.0",
        "@types/cors": "^2.8.0",
        "ts-node-dev": "^2.0.0"
      }
    };

    fs.writeFileSync(
      `${this.outputDir}/backend/package.json`,
      JSON.stringify(packageJson, null, 2)
    );

    // TypeScript config for backend
    const tsConfig = {
      compilerOptions: {
        target: "es2020",
        module: "commonjs",
        outDir: "./dist",
        rootDir: "./src",
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true
      },
      include: ["src/**/*"],
      exclude: ["node_modules", "dist"]
    };

    fs.writeFileSync(
      `${this.outputDir}/backend/tsconfig.json`,
      JSON.stringify(tsConfig, null, 2)
    );

    // Backend types
    const backendTypes = `// Backend TypeScript definitions
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface HealthStatus {
  status: string;
  service: string;
  version: string;
  typescript: boolean;
  timestamp: string;
}`;

    fs.writeFileSync(`${this.outputDir}/backend/src/types/index.ts`, backendTypes);

    // TypeScript server
    const serverTs = `import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ApiResponse, HealthStatus } from './types';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check with TypeScript info
app.get('/api/health', (req: Request, res: Response<HealthStatus>) => {
  res.json({ 
    status: 'OK', 
    service: '${this.saas.name} TypeScript API',
    version: '1.0.0',
    typescript: true,
    timestamp: new Date().toISOString()
  });
});

// Demo endpoint
app.get('/api/demo', (req: Request, res: Response<ApiResponse>) => {
  res.json({
    success: true,
    message: 'TypeScript ${this.saas.name} API is running!',
    data: {
      features: [${this.saas.features.map(f => `'${f}'`).join(', ')}],
      typeScript: true,
      typeSafe: true
    }
  });
});

${this.saas.features.map(feature => {
  const endpoint = feature.toLowerCase().replace(/\s+/g, '');
  return `
// ${feature} endpoint (TypeScript)
app.get('/api/${endpoint}', (req: Request, res: Response<ApiResponse>) => {
  res.json({
    success: true,
    message: 'Type-safe ${feature} endpoint',
    data: { feature: '${feature}', typescript: true }
  });
});`;
}).join('')}

// Error handler
app.use((req: Request, res: Response<ApiResponse>) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found',
    message: 'TypeScript API endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(\`🚀 ${this.saas.name} TypeScript API running on port \${PORT}\`);
  console.log(\`💪 Full TypeScript type safety enabled\`);
});`;

    fs.writeFileSync(`${this.outputDir}/backend/src/server.ts`, serverTs);
  }

  private async generateDocumentation(): Promise<void> {
    console.log('📚 Generating TypeScript documentation...');
    
    const readme = `# ${this.saas.name} Clone (TypeScript Edition) 💪

> ${this.saas.description || 'A modern SaaS application'} - Now with full TypeScript support!

## 🚀 Features (Type-Safe)

${this.saas.features.map(feature => `- ✅ **${feature}** - Full TypeScript implementation with type safety`).join('\n')}

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, **TypeScript**, Tailwind CSS
- **Backend**: Node.js, Express.js, **TypeScript**
- **Type Safety**: 100% TypeScript coverage
- **Development**: Hot reload with type checking
- **Deployment**: Vercel (frontend) + Railway (backend)

## 💪 TypeScript Benefits

- **Compile-time error detection** - Catch bugs before runtime
- **IntelliSense support** - Better autocomplete and refactoring
- **Self-documenting code** - Types serve as documentation
- **Safer refactoring** - Confidence when making changes
- **Better team collaboration** - Clear interfaces and contracts

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+
- TypeScript knowledge recommended
- npm or yarn

### 1. Frontend (TypeScript + Next.js)
\`\`\`bash
cd frontend
npm install
npm run type-check  # Verify TypeScript compilation
npm run dev         # Start with hot reload
# Visit http://localhost:3000
\`\`\`

### 2. Backend (TypeScript + Express)
\`\`\`bash
cd backend
npm install
npm run type-check  # Verify TypeScript compilation
npm run dev         # Start with ts-node-dev
# API running on http://localhost:5000
\`\`\`

### 3. Production Build
\`\`\`bash
# Frontend
cd frontend
npm run build       # TypeScript compilation + Next.js build

# Backend
cd backend  
npm run build       # TypeScript compilation to ./dist
npm start          # Run compiled JavaScript
\`\`\`

## 📊 Project Stats

- **Generated on**: ${new Date().toLocaleDateString()}
- **Language**: TypeScript (100% coverage)
- **Type Safety**: Fully type-safe
- **Category**: ${this.saas.category || 'SaaS'}  
- **Features**: ${this.saas.features.length} (all typed)
- **Build Time**: ~${this.saas.features.length * 2} hours

## 🔧 TypeScript API Endpoints

| Endpoint | Method | Response Type | Description |
|----------|--------|---------------|-------------|
| \`/api/health\` | GET | \`HealthStatus\` | Health check with TS info |
| \`/api/demo\` | GET | \`ApiResponse\` | Demo endpoint |
${this.saas.features.map(feature => {
  const endpoint = feature.toLowerCase().replace(/\s+/g, '');
  return `| \`/api/${endpoint}\` | GET | \`ApiResponse\` | ${feature} (type-safe) |`;
}).join('\n')}

## 📝 Type Definitions

### Frontend Types (\`frontend/src/types/index.ts\`)
\`\`\`typescript
interface Feature {
  name: string;
  description: string;
  isActive: boolean;
}

interface DashboardStats {
  totalItems: number;
  activeItems: number;
  completedItems: number;
}
\`\`\`

### Backend Types (\`backend/src/types/index.ts\`)
\`\`\`typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface HealthStatus {
  status: string;
  service: string;
  typescript: boolean;
  timestamp: string;
}
\`\`\`

## 🔍 Type Checking

Run type checking without compilation:

\`\`\`bash
# Frontend
cd frontend && npm run type-check

# Backend  
cd backend && npm run type-check

# Both should show "No TypeScript errors found"
\`\`\`

## 🚀 Deployment (TypeScript)

### Frontend (Vercel)
\`\`\`bash
cd frontend
npm run type-check  # Ensure no type errors
npm run build       # Build with TypeScript
vercel --prod
\`\`\`

### Backend (Railway)
\`\`\`bash
cd backend
npm run type-check  # Ensure no type errors  
npm run build       # Compile TypeScript
# Railway will run the compiled JavaScript
\`\`\`

## 🐦 Twitter Campaign (TypeScript Focus)

### Sample Tweets:
\`\`\`
🔥 Just built ${this.saas.name} clone in TypeScript! 
💪 100% type safety + ${this.saas.features.length} features
⚡ Next.js + Express + TypeScript = perfect combo
#dayXofkillingSaaS #typescript #buildinpublic

🛡️ Why TypeScript for SaaS?
✅ Catch bugs at compile time
✅ Better refactoring confidence  
✅ Self-documenting code
✅ Team collaboration wins
#typescript #saas #webdev
\`\`\`

## 🎯 Development Tips

1. **Use strict TypeScript** - Enable all strict compiler options
2. **Define interfaces first** - Plan your data structures
3. **Leverage IntelliSense** - Let TypeScript guide you
4. **Type your API responses** - Use generic ApiResponse<T>
5. **Regular type checking** - Run \`npm run type-check\` frequently

## 📚 Learning Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Next.js with TypeScript](https://nextjs.org/docs/basic-features/typescript)
- [Express with TypeScript](https://blog.logrocket.com/how-to-set-up-node-typescript-express/)

## 🤝 Contributing

1. Fork the repository
2. Ensure all code is properly typed
3. Run type checking: \`npm run type-check\`
4. No TypeScript errors allowed
5. Submit a pull request

## 📄 License

MIT License - Build type-safe SaaS applications!

---

**Built with ❤️ and TypeScript for maximum developer experience**

*Type safety + rapid SaaS development = winning combination! 🚀*

### 🏆 TypeScript > JavaScript for production SaaS! 💪`;

    fs.writeFileSync(`${this.outputDir}/README.md`, readme);
  }
}

export default SaaSCodeGenerator;
