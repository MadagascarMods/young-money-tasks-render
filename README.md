# Young Money Tasks - Render.com Edition

Uma plataforma completa de tarefas e monetização com suporte a Pix, desenvolvida para ser hospedada na Render.com.

## 🚀 Funcionalidades

### Young Money Tasks (Principal)
- ✅ Interface moderna e responsiva
- ✅ Sistema de tarefas interativas
- ✅ Integração com Pix Assistindo
- ✅ Dashboard com estatísticas em tempo real
- ✅ Autenticação de usuários
- ✅ Histórico de transações

### Pix Assistindo Manager
- ✅ Simulação de assistir anúncios
- ✅ Diferentes tipos de anúncio (Recompensado/Intersticial)
- ✅ Cálculo automático de recompensas
- ✅ Atualização de saldo em tempo real
- ✅ Progresso de missão com barra visual
- ✅ Log detalhado de operações
- ✅ PWA (Progressive Web App)
- ✅ Modo escuro automático

## 📋 Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn
- Conta no Render.com

## 🔧 Instalação Local

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/young-money-tasks.git
cd young-money-tasks
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
PORT=3000
NODE_ENV=development
BACKEND_API_URL=https://pixassistindo.thm.app.br
RAILWAY_API_URL=https://monetag-postback-server-production.up.railway.app
CORS_ORIGIN=*
```

### 4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

## 🌐 Deploy na Render.com

### Método 1: Usando o Dashboard do Render.com

1. **Acesse o Render.com**
   - Vá para [render.com](https://render.com)
   - Faça login ou crie uma conta

2. **Conecte seu repositório GitHub**
   - Clique em "New +" → "Web Service"
   - Selecione seu repositório GitHub
   - Autorize o acesso

3. **Configure o serviço**
   - **Name:** `young-money-tasks`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (ou seu plano preferido)

4. **Adicione variáveis de ambiente**
   - `NODE_ENV` = `production`
   - `PORT` = `3000`
   - `CORS_ORIGIN` = `*`
   - `BACKEND_API_URL` = `https://pixassistindo.thm.app.br`
   - `RAILWAY_API_URL` = `https://monetag-postback-server-production.up.railway.app`

5. **Deploy**
   - Clique em "Create Web Service"
   - Aguarde o build e deploy completarem

### Método 2: Usando render.yaml (Recomendado)

1. O arquivo `render.yaml` já está configurado no projeto
2. Faça push para o GitHub
3. Render.com detectará automaticamente e usará as configurações do `render.yaml`

## 📁 Estrutura do Projeto

```
young-money-tasks/
├── public/                      # Arquivos estáticos
│   ├── index.html              # Página principal
│   ├── pix-assistindo.html     # Página do Pix Assistindo
│   ├── assets/                 # CSS e JS compilados
│   ├── pix-script.js           # Script do Pix Assistindo
│   ├── pix-style.css           # Estilos do Pix Assistindo
│   ├── anonymous-logo.png      # Logo
│   └── manifest.json           # Configuração PWA
│
├── server/
│   └── index.js                # Servidor Express
│
├── package.json                # Dependências do projeto
├── render.yaml                 # Configuração Render.com
├── .env.example                # Exemplo de variáveis de ambiente
├── .gitignore                  # Arquivos ignorados pelo Git
└── README.md                   # Este arquivo
```

## 🔌 Endpoints da API

### Pix Assistindo Backend

#### Buscar Usuário
```
POST /api/buscar_usuario
Content-Type: application/json

{
  "email": "usuario@email.com"
}
```

#### Atualizar Usuário
```
POST /api/atualizar_usuario
Content-Type: application/json

{
  "id": "123",
  "saldo": "0.12345",
  "views": 1
}
```

#### Atualizar Missão
```
POST /api/atualizar_missao
Content-Type: application/json

{
  "email": "usuario@email.com",
  "valor_pago": "0.00123"
}
```

#### Obter Configurações de Missão
```
GET /api/get_config_missao
```

#### Stats do Usuário (Railway)
```
GET /api/stats/user/{userId}
```

### Health Check
```
GET /health
```

Resposta:
```json
{
  "status": "ok",
  "timestamp": "2024-12-12T16:00:00.000Z",
  "environment": "production"
}
```

## 🛠️ Tecnologias Utilizadas

### Backend
- **Express.js** - Framework web
- **Axios** - Cliente HTTP
- **CORS** - Controle de origem cruzada
- **dotenv** - Gerenciamento de variáveis de ambiente

### Frontend
- **HTML5** - Markup
- **CSS3** - Estilos
- **JavaScript (ES6+)** - Lógica
- **Service Workers** - PWA
- **LocalStorage** - Persistência de dados

## 📝 Configuração de Recompensas

As recompensas são calculadas baseadas no tipo de anúncio:

### Anúncios Recompensados
- Valor aleatório entre `rewarded_min` e `rewarded_max`
- Padrão: R$ 0,001 a R$ 0,005

### Anúncios Intersticiais
- Valor fixo definido em `interstitial_reward`
- Padrão: R$ 0,002

As configurações são carregadas dinamicamente da API do backend.

## 🔒 Segurança

- ✅ CORS configurado adequadamente
- ✅ Variáveis sensíveis em `.env`
- ✅ Proxy de API para evitar exposição de URLs
- ✅ Validação de entrada no frontend
- ✅ Headers de segurança configurados
- ✅ Logging de operações para auditoria

## 🐛 Solução de Problemas

### Erro: "Cannot find module 'express'"
```bash
npm install
```

### Erro: "Port already in use"
```bash
# Mude a porta no arquivo .env
PORT=3001
```

### Erro: "CORS policy blocked"
- Verifique se `CORS_ORIGIN` está configurado corretamente
- Certifique-se de que o proxy está funcionando

### API não responde
- Verifique se as URLs das APIs estão corretas
- Teste a conectividade com `curl`
- Verifique os logs no console

### Configurações não carregam
- Verifique se o endpoint `/api/get_config_missao` está funcionando
- A aplicação usa valores padrão se não conseguir carregar

## 📊 Monitoramento

### Logs em Tempo Real
```bash
# No Render.com, acesse a aba "Logs"
# Você verá todos os eventos do servidor
```

### Health Check
```bash
curl https://seu-app.onrender.com/health
```

## 🚀 Melhorias Futuras

- [ ] Integração com banco de dados
- [ ] Sistema de autenticação avançado
- [ ] Dashboard administrativo
- [ ] Relatórios detalhados
- [ ] Notificações push
- [ ] Suporte a múltiplas moedas
- [ ] Integração com mais plataformas de anúncios

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique os logs do servidor
2. Consulte a documentação do Render.com
3. Verifique a conectividade com as APIs externas
4. Abra uma issue no GitHub

## 📄 Licença

MIT - Veja o arquivo LICENSE para detalhes

## 👥 Contribuidores

- Seu Nome - Desenvolvedor Principal

---

**Desenvolvido com ❤️ para a comunidade Young Money**

Última atualização: Dezembro 2024
