#!/bin/bash

# ============================================
# FIGMA QUICK START
# Luis Alves Mesas para Festas
# ============================================

set -e

BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "================================================"
echo "   FIGMA QUICK START"
echo "   Luis Alves Mesas para Festas"
echo "================================================"
echo -e "${NC}"

# Verificar diretório
if [ ! -f "figma-auto-generator.js" ]; then
    echo -e "${RED}❌ Erro: Execute este script no diretório do projeto${NC}"
    exit 1
fi

# Menu
echo ""
echo "Escolha uma opção:"
echo ""
echo "1) Gerar todos os arquivos (tokens + plugin)"
echo "2) Apenas gerar design tokens"
echo "3) Apenas gerar plugin Figma"
echo "4) Abrir preview HTML no navegador"
echo "5) Abrir guia completo"
echo "6) Abrir Figma Desktop"
echo "7) Listar todos os arquivos gerados"
echo "8) Criar arquivo .env com token Figma"
echo "9) Sair"
echo ""

read -p "Digite a opção (1-9): " option

case $option in
    1)
        echo -e "${YELLOW}🔄 Gerando todos os arquivos...${NC}"
        node figma-auto-generator.js
        echo ""
        node figma-plugin-generator.js
        echo ""
        echo -e "${GREEN}✅ Todos os arquivos gerados com sucesso!${NC}"
        echo ""
        echo "Arquivos criados:"
        echo "  - figma-project-data.json"
        echo "  - figma-design-tokens.css"
        echo "  - figma-design-tokens-full.json"
        echo "  - figma-plugin/code.js"
        echo "  - figma-plugin/manifest.json"
        echo "  - figma-plugin/ui.html"
        ;;

    2)
        echo -e "${YELLOW}🎨 Gerando design tokens...${NC}"
        node figma-auto-generator.js
        echo ""
        echo -e "${GREEN}✅ Design tokens gerados!${NC}"
        echo ""
        echo "Arquivos:"
        echo "  - figma-design-tokens.css"
        echo "  - figma-design-tokens-full.json"
        ;;

    3)
        echo -e "${YELLOW}🔌 Gerando plugin Figma...${NC}"
        node figma-plugin-generator.js
        echo ""
        echo -e "${GREEN}✅ Plugin gerado!${NC}"
        echo ""
        echo "Próximos passos:"
        echo "  1. Abrir Figma Desktop"
        echo "  2. Plugins → Development → Import plugin from manifest"
        echo "  3. Selecionar: figma-plugin/manifest.json"
        ;;

    4)
        echo -e "${YELLOW}🌐 Abrindo preview HTML...${NC}"
        if [ -f "FIGMA-PROJECT-PREVIEW.html" ]; then
            open FIGMA-PROJECT-PREVIEW.html
            echo -e "${GREEN}✅ Preview aberto no navegador${NC}"
        else
            echo -e "${RED}❌ Arquivo FIGMA-PROJECT-PREVIEW.html não encontrado${NC}"
        fi
        ;;

    5)
        echo -e "${YELLOW}📖 Abrindo guia completo...${NC}"
        if [ -f "FIGMA-AUTO-SETUP-GUIDE.md" ]; then
            open FIGMA-AUTO-SETUP-GUIDE.md
            echo -e "${GREEN}✅ Guia aberto${NC}"
        else
            echo -e "${RED}❌ Arquivo FIGMA-AUTO-SETUP-GUIDE.md não encontrado${NC}"
        fi
        ;;

    6)
        echo -e "${YELLOW}🎨 Abrindo Figma Desktop...${NC}"
        if [ -d "/Applications/Figma.app" ]; then
            open -a "Figma"
            echo -e "${GREEN}✅ Figma aberto${NC}"
            echo ""
            echo "Próximos passos:"
            echo "  1. Plugins → Development → Import plugin from manifest"
            echo "  2. Selecionar: $(pwd)/figma-plugin/manifest.json"
            echo "  3. Executar plugin: Luis Alves Mesas Auto Generator"
        else
            echo -e "${YELLOW}⚠️  Figma Desktop não encontrado${NC}"
            echo ""
            echo "Baixe em: https://www.figma.com/downloads/"
        fi
        ;;

    7)
        echo -e "${YELLOW}📁 Listando arquivos gerados...${NC}"
        echo ""

        if [ -f "figma-project-data.json" ]; then
            size=$(ls -lh figma-project-data.json | awk '{print $5}')
            echo -e "${GREEN}✅${NC} figma-project-data.json ($size)"
        else
            echo -e "${RED}❌${NC} figma-project-data.json (não existe)"
        fi

        if [ -f "figma-design-tokens.css" ]; then
            size=$(ls -lh figma-design-tokens.css | awk '{print $5}')
            echo -e "${GREEN}✅${NC} figma-design-tokens.css ($size)"
        else
            echo -e "${RED}❌${NC} figma-design-tokens.css (não existe)"
        fi

        if [ -f "figma-design-tokens-full.json" ]; then
            size=$(ls -lh figma-design-tokens-full.json | awk '{print $5}')
            echo -e "${GREEN}✅${NC} figma-design-tokens-full.json ($size)"
        else
            echo -e "${RED}❌${NC} figma-design-tokens-full.json (não existe)"
        fi

        if [ -d "figma-plugin" ]; then
            echo -e "${GREEN}✅${NC} figma-plugin/"
            if [ -f "figma-plugin/code.js" ]; then
                size=$(ls -lh figma-plugin/code.js | awk '{print $5}')
                echo -e "   ${GREEN}✅${NC} code.js ($size)"
            fi
            if [ -f "figma-plugin/manifest.json" ]; then
                size=$(ls -lh figma-plugin/manifest.json | awk '{print $5}')
                echo -e "   ${GREEN}✅${NC} manifest.json ($size)"
            fi
            if [ -f "figma-plugin/ui.html" ]; then
                size=$(ls -lh figma-plugin/ui.html | awk '{print $5}')
                echo -e "   ${GREEN}✅${NC} ui.html ($size)"
            fi
        else
            echo -e "${RED}❌${NC} figma-plugin/ (não existe)"
        fi

        echo ""
        echo "Documentação:"

        if [ -f "FIGMA-AUTO-SETUP-GUIDE.md" ]; then
            size=$(ls -lh FIGMA-AUTO-SETUP-GUIDE.md | awk '{print $5}')
            echo -e "${GREEN}✅${NC} FIGMA-AUTO-SETUP-GUIDE.md ($size)"
        fi

        if [ -f "FIGMA-PROJECT-PREVIEW.html" ]; then
            size=$(ls -lh FIGMA-PROJECT-PREVIEW.html | awk '{print $5}')
            echo -e "${GREEN}✅${NC} FIGMA-PROJECT-PREVIEW.html ($size)"
        fi

        if [ -f "FIGMA-ENTREGA-FINAL.md" ]; then
            size=$(ls -lh FIGMA-ENTREGA-FINAL.md | awk '{print $5}')
            echo -e "${GREEN}✅${NC} FIGMA-ENTREGA-FINAL.md ($size)"
        fi
        ;;

    8)
        echo -e "${YELLOW}🔑 Configurando token Figma...${NC}"
        echo ""
        echo "Para usar a API do Figma:"
        echo "1. Acesse: https://www.figma.com/developers/api#authentication"
        echo "2. Clique em 'Get personal access token'"
        echo "3. Copie o token gerado"
        echo ""
        read -p "Cole o token aqui (ou Enter para pular): " token

        if [ -n "$token" ]; then
            if [ -f ".env" ]; then
                echo "" >> .env
                echo "# Figma API" >> .env
                echo "FIGMA_TOKEN=$token" >> .env
                echo -e "${GREEN}✅ Token adicionado ao .env${NC}"
            else
                echo "# Figma API" > .env
                echo "FIGMA_TOKEN=$token" >> .env
                echo -e "${GREEN}✅ Arquivo .env criado com token${NC}"
            fi
        else
            echo -e "${YELLOW}⚠️  Token não configurado${NC}"
        fi
        ;;

    9)
        echo -e "${BLUE}👋 Até logo!${NC}"
        exit 0
        ;;

    *)
        echo -e "${RED}❌ Opção inválida${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${BLUE}================================================${NC}"
echo -e "${GREEN}✅ Operação concluída!${NC}"
echo ""
echo "Precisa de ajuda?"
echo "  - Leia: FIGMA-AUTO-SETUP-GUIDE.md"
echo "  - Veja: FIGMA-PROJECT-PREVIEW.html"
echo "  - Documento final: FIGMA-ENTREGA-FINAL.md"
echo ""
echo -e "${BLUE}================================================${NC}"
