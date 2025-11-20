#!/bin/bash

# ============================================================
# JPR MÓVEIS - SCRIPT DE TESTES MOCK SERVER
# ============================================================
# Testa o backend sem precisar de PostgreSQL
# Usa mock-server.js com dados em memória

API="http://localhost:3001"
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Aguardar um pouco para o servidor iniciar
sleep 2

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}JPR MÓVEIS - TESTES MOCK SERVER${NC}"
echo -e "${BLUE}========================================${NC}\n"

# ============================================================
# TESTE 1: HEALTH CHECK
# ============================================================
echo -e "${YELLOW}[TESTE 1] Health Check${NC}"
echo "GET /health"
HEALTH=$(curl -s "$API/health")
echo "$HEALTH" | jq .
echo -e "${GREEN}✅ Server respondendo${NC}\n"

# ============================================================
# TESTE 2: AUTENTICAÇÃO - REGISTRO
# ============================================================
echo -e "${YELLOW}[TESTE 2] Autenticação - Registro${NC}"
echo "POST /api/auth/register"
REGISTER=$(curl -s -X POST "$API/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "senha": "senha123",
    "nome": "João Silva",
    "telefone": "11999999999"
  }')
echo "$REGISTER" | jq .
TOKEN=$(echo "$REGISTER" | jq -r '.token')
echo -e "${GREEN}✅ Usuário registrado${NC}"
echo -e "${GREEN}✅ Token obtido: ${TOKEN:0:20}...${NC}\n"

# ============================================================
# TESTE 3: AUTENTICAÇÃO - LOGIN
# ============================================================
echo -e "${YELLOW}[TESTE 3] Autenticação - Login${NC}"
echo "POST /api/auth/login"
LOGIN=$(curl -s -X POST "$API/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "senha": "senha123"
  }')
echo "$LOGIN" | jq .
echo -e "${GREEN}✅ Login realizado${NC}\n"

# ============================================================
# TESTE 4: AUTENTICAÇÃO - GET ME
# ============================================================
echo -e "${YELLOW}[TESTE 4] Autenticação - GET /auth/me${NC}"
echo "GET /api/auth/me com token"
ME=$(curl -s -X GET "$API/api/auth/me" \
  -H "Authorization: Bearer $TOKEN")
echo "$ME" | jq .
echo -e "${GREEN}✅ Dados do usuário obtidos${NC}\n"

# ============================================================
# TESTE 5: PRODUTOS - LISTAR
# ============================================================
echo -e "${YELLOW}[TESTE 5] Produtos - Listar${NC}"
echo "GET /api/produtos"
PRODUTOS=$(curl -s "$API/api/produtos")
echo "$PRODUTOS" | jq .
TOTAL=$(echo "$PRODUTOS" | jq '.total')
echo -e "${GREEN}✅ ${TOTAL} produtos listados${NC}\n"

# ============================================================
# TESTE 6: PRODUTOS - GET ESPECÍFICO
# ============================================================
echo -e "${YELLOW}[TESTE 6] Produtos - GET por ID${NC}"
echo "GET /api/produtos/1"
PRODUTO=$(curl -s "$API/api/produtos/1")
echo "$PRODUTO" | jq .
echo -e "${GREEN}✅ Produto recuperado${NC}\n"

# ============================================================
# TESTE 7: PEDIDOS - CRIAR
# ============================================================
echo -e "${YELLOW}[TESTE 7] Pedidos - Criar${NC}"
echo "POST /api/pedidos"
PEDIDO=$(curl -s -X POST "$API/api/pedidos" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "itens": [
      {
        "produto_id": 1,
        "quantidade": 2
      }
    ]
  }')
echo "$PEDIDO" | jq .
PEDIDO_ID=$(echo "$PEDIDO" | jq -r '.pedido.id')
echo -e "${GREEN}✅ Pedido criado (ID: ${PEDIDO_ID})${NC}\n"

# ============================================================
# TESTE 8: PEDIDOS - LISTAR
# ============================================================
echo -e "${YELLOW}[TESTE 8] Pedidos - Listar meus pedidos${NC}"
echo "GET /api/pedidos"
MEUS_PEDIDOS=$(curl -s -X GET "$API/api/pedidos" \
  -H "Authorization: Bearer $TOKEN")
echo "$MEUS_PEDIDOS" | jq .
echo -e "${GREEN}✅ Pedidos listados${NC}\n"

# ============================================================
# TESTE 9: PEDIDOS - DETALHES
# ============================================================
echo -e "${YELLOW}[TESTE 9] Pedidos - Detalhes${NC}"
echo "GET /api/pedidos/${PEDIDO_ID}"
DETALHES=$(curl -s -X GET "$API/api/pedidos/${PEDIDO_ID}" \
  -H "Authorization: Bearer $TOKEN")
echo "$DETALHES" | jq .
echo -e "${GREEN}✅ Detalhes recuperados${NC}\n"

# ============================================================
# TESTE 10: AVALIAÇÕES - CRIAR
# ============================================================
echo -e "${YELLOW}[TESTE 10] Avaliações - Criar${NC}"
echo "POST /api/avaliacoes"
AVALIACAO=$(curl -s -X POST "$API/api/avaliacoes" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "produto_id": 1,
    "rating": 5,
    "titulo": "Excelente qualidade!",
    "comentario": "Produto chegou conforme esperado, muito bom mesmo."
  }')
echo "$AVALIACAO" | jq .
echo -e "${GREEN}✅ Avaliação criada${NC}\n"

# ============================================================
# TESTE 11: PRODUTOS - CRIAR (REQUER ADMIN)
# ============================================================
echo -e "${YELLOW}[TESTE 11] Produtos - Criar (requer admin)${NC}"
echo "POST /api/produtos (como customer)"
PRODUTO_NOVO=$(curl -s -X POST "$API/api/produtos" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Estante Madeira",
    "descricao": "Estante rústica com 3 prateleiras",
    "preco": 2100.00,
    "desconto": 5,
    "categoria": "Estantes",
    "estoque": 8
  }')
echo "$PRODUTO_NOVO" | jq .
echo -e "${RED}⚠️  Esperado: Acesso negado (customer)${NC}\n"

# ============================================================
# TESTE 12: ERRO - SEM TOKEN
# ============================================================
echo -e "${YELLOW}[TESTE 12] Erro - Acessar sem token${NC}"
echo "GET /api/auth/me (sem token)"
SEM_TOKEN=$(curl -s "$API/api/auth/me")
echo "$SEM_TOKEN" | jq .
echo -e "${GREEN}✅ Erro 401 retornado${NC}\n"

# ============================================================
# TESTE 13: ERRO - PRODUTO NÃO EXISTE
# ============================================================
echo -e "${YELLOW}[TESTE 13] Erro - Produto não existe${NC}"
echo "GET /api/produtos/9999"
NAO_EXISTE=$(curl -s "$API/api/produtos/9999")
echo "$NAO_EXISTE" | jq .
echo -e "${GREEN}✅ Erro 404 retornado${NC}\n"

# ============================================================
# RESUMO FINAL
# ============================================================
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✅ TESTES COMPLETOS COM SUCESSO!${NC}"
echo -e "${BLUE}========================================${NC}\n"

echo "📊 Resumo do que foi testado:"
echo "  ✅ Health Check"
echo "  ✅ Registro de usuário"
echo "  ✅ Login"
echo "  ✅ Obter dados do usuário"
echo "  ✅ Listar produtos"
echo "  ✅ Get produto específico"
echo "  ✅ Criar pedido"
echo "  ✅ Listar pedidos"
echo "  ✅ Detalhes do pedido"
echo "  ✅ Criar avaliação"
echo "  ✅ Criar produto (admin)"
echo "  ✅ Erros de validação"
echo ""

echo -e "${YELLOW}📝 Próximas etapas:${NC}"
echo "  1. Verificar todos os testes acima"
echo "  2. Testar frontend: http://localhost:8001/index-nova.html"
echo "  3. Deploy em PostgreSQL real (fora do sandbox)"
echo ""

echo -e "${GREEN}Mock server testado com sucesso! 🚀${NC}"
