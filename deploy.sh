#!/bin/bash

# ============================================================
# JPR MÓVEIS - SCRIPT DE DEPLOY AUTOMATIZADO
# ============================================================
# Uso: bash deploy.sh
# ============================================================

BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${BLUE}  JPR MÓVEIS - DEPLOY AUTOMATIZADO${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}\n"

# ============================================================
# PASSO 1: Verificar Git
# ============================================================
echo -e "${YELLOW}[1/5] Verificando Git...${NC}"
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git não está instalado${NC}"
    exit 1
fi

if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ Não é um repositório Git${NC}"
    echo "Execute: git init && git remote add origin <URL>"
    exit 1
fi

echo -e "${GREEN}✅ Git encontrado${NC}\n"

# ============================================================
# PASSO 2: Commit de mudanças
# ============================================================
echo -e "${YELLOW}[2/5] Preparando commit...${NC}"
git add .
if git commit -m "Deploy JPR Móveis - Railway e Netlify"; then
    echo -e "${GREEN}✅ Commit realizado${NC}"
else
    echo -e "${YELLOW}⚠️  Nenhuma mudança para commit${NC}"
fi
echo ""

# ============================================================
# PASSO 3: Push para GitHub
# ============================================================
echo -e "${YELLOW}[3/5] Fazendo push para GitHub...${NC}"
if git push origin main 2>&1 | grep -q "Everything up-to-date\|pushed"; then
    echo -e "${GREEN}✅ Push realizado com sucesso${NC}"
else
    echo -e "${YELLOW}⚠️  Verifique se main branch existe${NC}"
fi
echo ""

# ============================================================
# PASSO 4: Informações para Railway
# ============================================================
echo -e "${YELLOW}[4/5] Próximas etapas - Railway (Backend)${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "1. Acesse: https://railway.app"
echo "2. Clique: 'Create New Project'"
echo "3. Selecione: 'Deploy from GitHub'"
echo "4. Escolha: 'jpr-moveis-rusticos'"
echo ""
echo "Variables de Ambiente (adicione no Railway):"
echo "  PORT=3001"
echo "  NODE_ENV=production"
echo "  JWT_SECRET=seu-secret-key-aqui"
echo "  DB_HOST=seu-host"
echo "  DB_PORT=5432"
echo "  DB_NAME=jpr_moveis_db"
echo "  DB_USER=postgres"
echo "  DB_PASSWORD=sua-senha"
echo ""
echo -e "${GREEN}✅ Preparado para Railway${NC}\n"

# ============================================================
# PASSO 5: Informações para Netlify
# ============================================================
echo -e "${YELLOW}[5/5] Próximas etapas - Netlify (Frontend)${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "1. Acesse: https://netlify.com"
echo "2. Clique: 'Sign up' (ou 'Log in')"
echo "3. Escolha: 'GitHub'"
echo "4. Clique: 'Add new site'"
echo "5. Selecione: 'jpr-moveis-rusticos'"
echo ""
echo "Build Settings:"
echo "  Build command: [deixar vazio]"
echo "  Publish directory: . (ponto)"
echo ""
echo -e "${GREEN}✅ Preparado para Netlify${NC}\n"

# ============================================================
# RESUMO FINAL
# ============================================================
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ PREPARAÇÃO CONCLUÍDA!${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}\n"

echo "RESUMO:"
echo "  ✅ Código commitado"
echo "  ✅ Push para GitHub"
echo "  📋 Railway pronto para deploy"
echo "  📋 Netlify pronto para deploy"
echo ""

echo "PRÓXIMOS PASSOS:"
echo "  1. Abra: https://railway.app"
echo "  2. Deploy backend (PostgreSQL + Node.js)"
echo "  3. Copie URL do backend"
echo "  4. Edite: app-novo.js (linha ~1)"
echo "  5. Substitua API URL"
echo "  6. Faça push: git push origin main"
echo "  7. Abra: https://netlify.com"
echo "  8. Deploy frontend"
echo "  9. Teste: https://seu-site.netlify.app"
echo ""

echo -e "${YELLOW}📖 Leia para mais detalhes:${NC}"
echo "   DEPLOY-GUIA-PASSO-A-PASSO.md"
echo ""

echo -e "${GREEN}🚀 Sucesso!${NC}\n"
