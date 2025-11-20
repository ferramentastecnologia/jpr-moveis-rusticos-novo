#!/bin/bash

# ============================================================
# JPR MÓVEIS - RAILWAY SETUP SCRIPT
# ============================================================
# Use este script para configurar Railway via CLI
# Pré-requisito: railway CLI instalado (npm i -g @railway/cli)
# ============================================================

BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${BLUE}  JPR MÓVEIS - RAILWAY SETUP${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}\n"

# ============================================================
# PASSO 1: Verificar Railway CLI
# ============================================================
echo -e "${YELLOW}[1/6] Verificando Railway CLI...${NC}"
if ! command -v railway &> /dev/null; then
    echo -e "${RED}❌ Railway CLI não está instalado${NC}"
    echo "Instale com: npm install -g @railway/cli"
    exit 1
fi

RAILWAY_VERSION=$(railway --version 2>/dev/null || echo "unknown")
echo -e "${GREEN}✅ Railway CLI encontrado (${RAILWAY_VERSION})${NC}\n"

# ============================================================
# PASSO 2: Fazer Login
# ============================================================
echo -e "${YELLOW}[2/6] Verificando autenticação Railway...${NC}"
if ! railway whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Não autenticado. Abrindo login...${NC}"
    railway login
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Falha na autenticação${NC}"
        exit 1
    fi
fi
echo -e "${GREEN}✅ Autenticado no Railway${NC}\n"

# ============================================================
# PASSO 3: Verificar/Criar Projeto
# ============================================================
echo -e "${YELLOW}[3/6] Configurando projeto Railway...${NC}"

# Tentar usar projeto existente ou criar novo
if [ -f ".railway/config.json" ]; then
    echo -e "${YELLOW}ℹ️  Usando projeto existente${NC}"
else
    echo -e "${YELLOW}⚠️  Inicializando novo projeto Railway...${NC}"
    railway init --name jpr-moveis-rusticos
fi

echo -e "${GREEN}✅ Projeto configurado${NC}\n"

# ============================================================
# PASSO 4: Adicionar PostgreSQL
# ============================================================
echo -e "${YELLOW}[4/6] Adicionando PostgreSQL...${NC}"

# Verificar se já existe
if railway service list 2>/dev/null | grep -q "postgres\|postgresql"; then
    echo -e "${YELLOW}ℹ️  PostgreSQL já existe${NC}"
else
    echo -e "${YELLOW}Criando PostgreSQL...${NC}"
    railway add --database postgresql
fi

echo -e "${GREEN}✅ PostgreSQL pronto${NC}\n"

# ============================================================
# PASSO 5: Configurar Variáveis
# ============================================================
echo -e "${YELLOW}[5/6] Configurando variáveis de ambiente...${NC}"

echo "Configurando variáveis..."

railway variables set NODE_ENV="production"
railway variables set PORT="3001"
railway variables set JWT_SECRET="$(openssl rand -base64 32)"

echo -e "${YELLOW}ℹ️  Variáveis obrigatórias configuradas${NC}"
echo -e "${YELLOW}ℹ️  IMPORTANTE: Configure estas variáveis no Dashboard:${NC}"
echo "  - FRONTEND_URL"
echo "  - FRONTEND_PROD_URL"
echo "  - ASAAS_API_KEY (opcional)"
echo "  - SENDGRID_API_KEY (opcional)"

echo -e "${GREEN}✅ Variáveis configuradas${NC}\n"

# ============================================================
# PASSO 6: Deploy
# ============================================================
echo -e "${YELLOW}[6/6] Iniciando deploy...${NC}"

echo -e "${YELLOW}ℹ️  Fazendo upload do código...${NC}"
railway up --force

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deploy iniciado com sucesso!${NC}\n"

    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✅ CONFIGURAÇÃO CONCLUÍDA!${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

    # Pegar informações
    echo -e "${YELLOW}Informações do seu projeto:${NC}"
    railway domain
    railway variables list

    echo -e "\n${YELLOW}Para ver logs em tempo real:${NC}"
    echo "  railway logs --follow"

    echo -e "\n${YELLOW}Para adicionar mais variáveis:${NC}"
    echo "  railway variables set CHAVE=valor"

    echo -e "\n${YELLOW}Para fazer novo deploy:${NC}"
    echo "  railway up"

    echo -e "\n${YELLOW}Para acessar o Dashboard:${NC}"
    echo "  railway open"

else
    echo -e "${RED}❌ Erro no deploy${NC}"
    echo -e "${YELLOW}Verifique os logs:${NC}"
    railway logs
    exit 1
fi

echo ""
echo -e "${GREEN}🚀 Sucesso! Seu backend está em produção no Railway!${NC}\n"
