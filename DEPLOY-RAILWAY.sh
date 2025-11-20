#!/bin/bash

# Script de Deploy Rápido - Railway
# Rosa Mexicano Vouchers

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   🚀 Deploy Backend Rosa Mexicano - Railway              ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar se está no diretório correto
if [ ! -f "server-vouchers.js" ]; then
    echo -e "${RED}❌ Erro: Execute este script no diretório do projeto!${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Instruções para Deploy no Railway:${NC}"
echo ""
echo -e "${YELLOW}OPÇÃO 1: Deploy Automático via GitHub (Recomendado)${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣  Acesse: https://railway.app/new"
echo "2️⃣  Clique em 'Deploy from GitHub repo'"
echo "3️⃣  Selecione: ferramentastecnologia/rosa-mexicano-vouchers"
echo "4️⃣  Aguarde o deploy automático"
echo ""
echo -e "${GREEN}✅ Railway detecta automaticamente Node.js e faz o build!${NC}"
echo ""

echo -e "${YELLOW}OPÇÃO 2: Deploy via CLI (Requer Login)${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Execute os seguintes comandos:"
echo ""
echo -e "${BLUE}railway login${NC}          # Abre navegador para login"
echo -e "${BLUE}railway init${NC}           # Cria novo projeto"
echo -e "${BLUE}railway up${NC}             # Faz o deploy"
echo ""

echo -e "${YELLOW}📝 Configurar Variáveis de Ambiente:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Após o deploy, configure estas variáveis no Railway:"
echo ""
echo -e "${GREEN}OBRIGATÓRIAS:${NC}"
echo "  • NODE_ENV=production"
echo "  • PORT=3000"
echo "  • ADMIN_USERNAME=admin"
echo "  • ADMIN_PASSWORD=${RED}SuaSenhaForte123!${NC} ${YELLOW}(ALTERE!)${NC}"
echo ""
echo -e "${BLUE}ASAAS (Pagamentos):${NC}"
echo "  • ASAAS_API_KEY=sua_chave_do_asaas"
echo ""
echo -e "${BLUE}EMAIL (Opcional):${NC}"
echo "  • EMAIL_USER=seu_email@gmail.com"
echo "  • EMAIL_PASS=sua_senha_de_app"
echo ""

echo ""
echo -e "${GREEN}🌐 Após o deploy, você receberá uma URL como:${NC}"
echo -e "   ${BLUE}https://rosa-mexicano-vouchers.up.railway.app${NC}"
echo ""

echo -e "${YELLOW}⚡ Próximos passos:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Copie a URL do Railway"
echo "2. Atualize o arquivo _redirects com a URL"
echo "3. Faça novo deploy no Netlify"
echo "4. Teste o sistema completo!"
echo ""

# Perguntar se quer abrir o Railway
echo ""
read -p "Deseja abrir o Railway no navegador agora? (s/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo -e "${GREEN}🌐 Abrindo Railway...${NC}"
    open "https://railway.app/new" 2>/dev/null || xdg-open "https://railway.app/new" 2>/dev/null
    sleep 2
fi

echo ""
echo -e "${GREEN}✅ Quando o deploy estiver completo, execute:${NC}"
echo -e "   ${BLUE}./atualizar-url-railway.sh <URL_DO_RAILWAY>${NC}"
echo ""
