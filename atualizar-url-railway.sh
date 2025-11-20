#!/bin/bash

# Script para atualizar URL do Railway no projeto
# Uso: ./atualizar-url-railway.sh https://seu-projeto.up.railway.app

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

if [ -z "$1" ]; then
    echo -e "${RED}❌ Erro: URL do Railway não fornecida${NC}"
    echo ""
    echo "Uso: ./atualizar-url-railway.sh <URL_DO_RAILWAY>"
    echo ""
    echo "Exemplo:"
    echo "  ./atualizar-url-railway.sh https://rosa-mexicano.up.railway.app"
    exit 1
fi

RAILWAY_URL=$1

# Remover barra no final se existir
RAILWAY_URL=${RAILWAY_URL%/}

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   🔄 Atualizando URL do Backend                          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${BLUE}URL do Railway:${NC} ${GREEN}${RAILWAY_URL}${NC}"
echo ""

# Atualizar arquivo _redirects
echo -e "${YELLOW}📝 Atualizando _redirects...${NC}"

cat > _redirects << EOF
# API Redirect para Railway Backend
/api/*  ${RAILWAY_URL}/api/:splat  200

# SPA redirect
/*  /index.html  200
EOF

echo -e "${GREEN}✅ Arquivo _redirects atualizado${NC}"
echo ""

# Testar se backend está respondendo
echo -e "${YELLOW}🧪 Testando conectividade com o backend...${NC}"

if curl -s --max-time 10 "${RAILWAY_URL}/health" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend está respondendo!${NC}"

    # Mostrar resposta
    echo ""
    echo -e "${BLUE}Resposta do health check:${NC}"
    curl -s "${RAILWAY_URL}/health" | jq . 2>/dev/null || curl -s "${RAILWAY_URL}/health"
    echo ""
else
    echo -e "${RED}⚠️  Backend não está respondendo ainda${NC}"
    echo -e "${YELLOW}   Aguarde alguns minutos e tente novamente${NC}"
    echo ""
fi

# Commit e push
echo -e "${YELLOW}📦 Fazendo commit das alterações...${NC}"

git add _redirects
git commit -m "Atualiza URL do backend Railway

URL: ${RAILWAY_URL}

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

echo ""
echo -e "${YELLOW}🚀 Fazendo push para GitHub...${NC}"
git push origin main

echo ""
echo -e "${GREEN}✅ Alterações enviadas!${NC}"
echo ""

# Deploy no Netlify
echo -e "${YELLOW}🌐 Fazendo deploy no Netlify...${NC}"
netlify deploy --prod

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ✅ Deploy Completo!                                     ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}🌐 URLs do Sistema:${NC}"
echo ""
echo -e "  Frontend:  ${GREEN}https://rosamexicanovouchers.netlify.app${NC}"
echo -e "  Backend:   ${GREEN}${RAILWAY_URL}${NC}"
echo -e "  Admin:     ${GREEN}https://rosamexicanovouchers.netlify.app/admin-login.html${NC}"
echo ""
echo -e "${YELLOW}🔐 Credenciais:${NC}"
echo -e "  Usuário: ${BLUE}admin${NC}"
echo -e "  Senha:   ${RED}(configurada no Railway)${NC}"
echo ""
echo -e "${GREEN}✨ Sistema pronto para uso!${NC}"
echo ""
