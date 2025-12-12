import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Host', 'User-Agent']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// API Proxy Routes for Pix Assistindo Backend
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'https://pixassistindo.thm.app.br';
const RAILWAY_API_URL = process.env.RAILWAY_API_URL || 'https://monetag-postback-server-production.up.railway.app';

// Proxy: Buscar Usuário
app.post('/api/buscar_usuario', async (req, res) => {
  try {
    console.log('[PROXY] Buscando usuário:', req.body.email);
    
    const response = await axios.post(
      `${BACKEND_API_URL}/backend/buscar_usuario.php`,
      req.body,
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Host': 'pixassistindo.thm.app.br',
          'User-Agent': 'okhttp/4.11.0'
        }
      }
    );
    
    console.log('[PROXY] Resposta recebida:', response.status);
    res.json(response.data);
  } catch (error) {
    console.error('[PROXY] Erro ao buscar usuário:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Erro ao buscar usuário',
      message: error.message
    });
  }
});

// Proxy: Atualizar Usuário
app.post('/api/atualizar_usuario', async (req, res) => {
  try {
    console.log('[PROXY] Atualizando usuário:', req.body.id);
    
    const response = await axios.post(
      `${BACKEND_API_URL}/backend/atualizar_usuario.php`,
      req.body,
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Host': 'pixassistindo.thm.app.br',
          'User-Agent': 'okhttp/4.11.0'
        }
      }
    );
    
    console.log('[PROXY] Usuário atualizado com sucesso');
    res.json(response.data);
  } catch (error) {
    console.error('[PROXY] Erro ao atualizar usuário:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Erro ao atualizar usuário',
      message: error.message
    });
  }
});

// Proxy: Atualizar Missão
app.post('/api/atualizar_missao', async (req, res) => {
  try {
    console.log('[PROXY] Atualizando missão para:', req.body.email);
    
    const response = await axios.post(
      `${BACKEND_API_URL}/backend/atualizar_missao.php`,
      req.body,
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Host': 'pixassistindo.thm.app.br',
          'User-Agent': 'okhttp/4.11.0'
        }
      }
    );
    
    console.log('[PROXY] Missão atualizada com sucesso');
    res.json(response.data);
  } catch (error) {
    console.error('[PROXY] Erro ao atualizar missão:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Erro ao atualizar missão',
      message: error.message
    });
  }
});

// Proxy: Obter Configurações de Missão
app.get('/api/get_config_missao', async (req, res) => {
  try {
    console.log('[PROXY] Obtendo configurações de missão');
    
    const response = await axios.get(
      `${BACKEND_API_URL}/backend/get_config_missao.php`,
      {
        headers: {
          'Host': 'pixassistindo.thm.app.br',
          'User-Agent': 'okhttp/4.11.0'
        }
      }
    );
    
    console.log('[PROXY] Configurações obtidas com sucesso');
    res.json(response.data);
  } catch (error) {
    console.error('[PROXY] Erro ao obter configurações:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Erro ao obter configurações',
      message: error.message
    });
  }
});

// Proxy: Stats do Usuário (Railway)
app.get('/api/stats/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('[PROXY] Obtendo stats do usuário:', userId);
    
    const response = await axios.get(
      `${RAILWAY_API_URL}/api/stats/user/${userId}`
    );
    
    console.log('[PROXY] Stats obtidos com sucesso');
    res.json(response.data);
  } catch (error) {
    console.error('[PROXY] Erro ao obter stats:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Erro ao obter stats',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV
  });
});

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: NODE_ENV === 'development' ? err.message : 'An error occurred'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Young Money Tasks Server`);
  console.log(`📍 Running on http://localhost:${PORT}`);
  console.log(`🔧 Environment: ${NODE_ENV}`);
  console.log(`🌐 CORS enabled for: ${process.env.CORS_ORIGIN || '*'}`);
  console.log(`\n✅ Server ready to accept connections\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});
