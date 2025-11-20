#!/bin/bash

# ============================================================
# JPR MÓVEIS - RAILWAY DEPLOY VIA CLI
# ============================================================
# Pré-requisito: railway CLI instalado
# npm install -g @railway/cli
# ============================================================

BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${BLUE}  JPR MÓVEIS - RAILWAY DEPLOY${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}\n"

# ============================================================
# PASSO 1: Verificar Railway CLI
# ============================================================
echo -e "${YELLOW}[1/5] Verificando Railway CLI...${NC}"
if ! command -v railway &> /dev/null; then
    echo -e "${RED}❌ Railway CLI não está instalado${NC}"
    echo "Instale com: npm install -g @railway/cli"
    exit 1
fi

RAILWAY_VERSION=$(railway --version 2>/dev/null || echo "unknown")
echo -e "${GREEN}✅ Railway CLI encontrado${NC}\n"

# ============================================================
# PASSO 2: Login no Railway
# ============================================================
echo -e "${YELLOW}[2/5] Fazendo login no Railway...${NC}"
echo -e "${YELLOW}⚠️  Um navegador será aberto para você fazer login${NC}"
echo -e "${YELLOW}⚠️  Autorize o acesso ao Railway${NC}\n"

railway login

if ! railway whoami &> /dev/null; then
    echo -e "${RED}❌ Falha na autenticação${NC}"
    exit 1
fi

RAILWAY_USER=$(railway whoami 2>/dev/null || echo "unknown")
echo -e "${GREEN}✅ Autenticado como: ${RAILWAY_USER}${NC}\n"

# ============================================================
# PASSO 3: Inicializar Projeto
# ============================================================
echo -e "${YELLOW}[3/5] Inicializando projeto Railway...${NC}"

if [ -f ".railway/config.json" ]; then
    echo -e "${YELLOW}ℹ️  Usando projeto existente${NC}"
else
    echo -e "${YELLOW}⚠️  Criando novo projeto Railroad...${NC}"
    railway init --name jpr-moveis-rusticos
fi

echo -e "${GREEN}✅ Projeto inicializado${NC}\n"

# ============================================================
# PASSO 4: Adicionar PostgreSQL
# ============================================================
echo -e "${YELLOW}[4/5] Adicionando PostgreSQL...${NC}"

# Verificar se já existe
if railway service list 2>/dev/null | grep -q "postgres\|postgresql"; then
    echo -e "${YELLOW}ℹ️  PostgreSQL já existe${NC}"
else
    echo -e "${YELLOW}Criando PostgreSQL...${NC}"
    railway add --database postgresql
fi

echo -e "${GREEN}✅ PostgreSQL configurado${NC}\n"

# ============================================================
# PASSO 5: Deploy
# ============================================================
echo -e "${YELLOW}[5/5] Iniciando deploy...${NC}"

echo -e "${YELLOW}ℹ️  Fazendo upload do código...${NC}"
railway up --force

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deploy iniciado com sucesso!${NC}\n"

    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✅ DEPLOY COMPLETO!${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

    echo -e "${YELLOW}📊 Informações do seu projeto:${NC}"
    echo ""
    echo "URL do Backend:"
    railway domain
    echo ""

    echo -e "${YELLOW}📋 Variáveis de Ambiente:${NC}"
    railway variables list
    echo ""

    echo -e "${YELLOW}🔍 Ver logs em tempo real:${NC}"
    echo "  railway logs --follow"
    echo ""

    echo -e "${YELLOW}➕ Adicionar mais variáveis:${NC}"
    echo "  railway variables set CHAVE=valor"
    echo ""

    echo -e "${YELLOW}🔄 Fazer novo deploy:${NC}"
    echo "  railway up"
    echo ""

    echo -e "${YELLOW}📱 Abrir Dashboard:${NC}"
    echo "  railway open"
    echo ""

else
    echo -e "${RED}❌ Erro no deploy${NC}"
    echo -e "${YELLOW}Verifique os logs:${NC}"
    railway logs
    exit 1
fi

echo ""
echo -e "${GREEN}🚀 Seu backend está em produção no Railway!${NC}\n"

# ============================================================
# PRÓXIMOS PASSOS
# ============================================================
echo -e "${YELLOW}📝 Próximos Passos:${NC}"
echo ""
echo "1. Configure variáveis de ambiente:"
echo "   railway variables set JWT_SECRET=sua-chave"
echo "   railway variables set FRONTEND_PROD_URL=seu-dominio.com"
echo ""
echo "2. Teste o health check:"
echo "   curl https://seu-projeto-railway.app/health"
echo ""
echo "3. Atualize o frontend com a URL:"
echo "   app-novo.js → const API = 'https://seu-projeto-railway.app'"
echo ""
echo "4. Deploy no Netlify"
echo ""

echo -e "${GREEN}✅ Sucesso! Backend em produção! 🎉${NC}\n"
