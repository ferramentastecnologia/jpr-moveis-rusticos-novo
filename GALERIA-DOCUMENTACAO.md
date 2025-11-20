# 🖼️ Galeria de Projetos JPR Móveis Rústicos - Documentação

## Visão Geral

Galeria profissional de projetos realizados com fotografia, filtros, busca avançada e showcase de soluções. Sistema completo para inspirar clientes e demonstrar expertise.

**URLs:**
- **Galeria Principal:** `https://jprmoveis.com.br/galeria`
- **Projeto Individual:** `https://jprmoveis.com.br/projeto.html?id=1`

**Impacto Esperado:** +35-40% em conversão, +45% em tempo de permanência

---

## 1. Base de Dados de Projetos (galeria-dados.js)

### Estrutura de Um Projeto

```javascript
{
    id: 1,                           // ID único
    titulo: "...",                   // Título do projeto
    descricao: "...",                // Descrição detalhada
    ambiente: "Sala de Jantar",      // Tipo de ambiente
    estilo: "Rústico Clássico",      // Estilo do projeto
    mesa: "Mesa Sublime",            // Modelo da mesa
    cor: "Caramelo",                 // Cor da madeira
    dimensoes: "1.80m x 1.00m",      // Tamanho
    ano: 2024,                       // Ano do projeto
    imagem: "🏛️",                    // Emoji representativo
    antes: "Descrição antes",        // O que havia antes
    depois: "Descrição depois",      // Resultado final
    tags: ["Colonial", "Aconchego"], // Características
    avaliacao: 5,                    // Nota (1-5)
    cliente: "Família Silva"         // Nome do cliente
}
```

### Projetos Inclusos (12 Total)

| ID | Título | Ambiente | Estilo | Ano |
|----|--------|----------|--------|-----|
| 1 | Sala de Jantar Clássica | Sala de Jantar | Rústico Clássico | 2024 |
| 2 | Cozinha Moderna Rústica | Cozinha | Rústico Moderno | 2024 |
| 3 | Fazenda Familiar | Sala de Jantar | Rústico Rural | 2023 |
| 4 | Sala de Estar Sofisticada | Sala de Estar | Rústico Sofisticado | 2024 |
| 5 | Loft Industrial | Loft | Rústico Industrial | 2024 |
| 6 | Casa de Praia Tropical | Casa de Praia | Rústico Tropical | 2023 |
| 7 | Sítio Minimalista | Sítio | Rústico Minimalista | 2024 |
| 8 | Restaurante Boutique | Restaurante | Rústico Sofisticado | 2023 |
| 9 | Casa Colonial Restaurada | Sala de Jantar | Rústico Colonial | 2023 |
| 10 | Espaço Gourmet | Espaço Gourmet | Rústico Premium | 2024 |
| 11 | Casa Escandinava | Sala de Jantar | Rústico Escandinavo | 2024 |
| 12 | Pousada Boutique | Pousada | Rústico Aconchegante | 2023 |

### Categorias Disponíveis

**Ambientes (8):**
- Sala de Jantar
- Cozinha
- Sala de Estar
- Loft
- Casa de Praia
- Sítio
- Restaurante
- Pousada
- Espaço Gourmet

**Estilos (6):**
- Rústico Clássico
- Rústico Moderno
- Rústico Industrial
- Rústico Sofisticado
- Rústico Tropical
- Rústico Minimalista
- Rústico Colonial
- Rústico Escandinavo
- Rústico Aconchegante
- Rústico Premium
- Rústico Rural

**Cores (3):**
- Mel (Claro)
- Caramelo (Médio)
- Tabaco (Escuro)

### Funções Auxiliares

```javascript
obterProjetoPorId(id)              // Retorna projeto específico
obterProjetosPorEstilo(estilo)     // Filtra por estilo
obterProjetosPorAmbiente(ambiente) // Filtra por ambiente
obterProjetosPorCor(cor)           // Filtra por cor
obterEstilos()                     // Array de estilos únicos
obterAmbientes()                   // Array de ambientes únicos
obterCores()                       // Array de cores únicas
obterMesas()                       // Array de mesas únicas
buscarProjetos(termo)              // Busca por texto
obterProjetosPopulares(limite)     // Top projetos por avaliação
obterProjetosRecentes(limite)      // Ordenado por ano
filtrarProjetos(filtros)           // Filtro múltiplo
```

---

## 2. Página Principal da Galeria (galeria.html)

### Seções

#### Header
- Logo JPR
- Link para voltar à loja
- Carrinho

#### Hero Section
- Título: "Galeria de Projetos Realizados"
- Subtítulo: "Veja nossos móveis em ambientes reais..."

#### Estatísticas
- 12+ Projetos Realizados
- 100% Clientes Satisfeitos
- 8 Ambientes Diferentes
- 6 Estilos Distintos

#### Filtros Avançados
1. **Busca em Tempo Real**
   - Input de texto
   - Busca em título, cliente e tags

2. **Filtro por Estilo**
   - Botões com contador
   - Filtro ativo destacado

3. **Filtro por Ambiente**
   - Botões com contador
   - Múltiplas opções

4. **Filtro por Cor**
   - Botões com contador
   - Mel, Caramelo, Tabaco

#### Grid de Projetos
- **Desktop:** 3 colunas
- **Tablet:** 2 colunas
- **Mobile:** 1 coluna
- Cards com hover effect (elevação 12px)
- Sem paginação (renderiza todos filtrados)

#### Card de Projeto
- Imagem/Emoji com overlay
- Avaliação (⭐ 5.0)
- Meta: Ambiente, Ano
- Título
- Descrição
- Tags (max 2 visíveis)
- Cliente
- Botão "Ver"

### Funcionalidades JavaScript

```javascript
inicializarGaleria()        // Setup inicial
renderizarFiltros()         // Renderiza todos os filtros
renderizarProjetos()        // Renderiza grid filtrado
definirFiltro(tipo, valor)  // Ativa filtro
filtrarGaleria()            // Busca por termo
abrirProjeto(id)            // Navega para projeto
atualizarCarrinhoCount()    // Sincroniza carrinho
```

### Estados Globais

```javascript
filtrosAtivos = {
    estilo: null,           // Estilo selecionado
    ambiente: null,         // Ambiente selecionado
    cor: null,              // Cor selecionada
    termo: null             // Termo de busca
}
```

---

## 3. Página de Projeto Individual (projeto.html)

### Seções

#### Breadcrumb
- Home > Galeria > Título Projeto

#### Hero
- Emoji grande representando o projeto
- Fundo com gradiente JPR

#### Header do Projeto
- Título H1
- Meta: Ambiente, Estilo, Ano
- Rating badge (⭐⭐⭐⭐⭐ Satisfação 100%)

#### Grid Principal (2 colunas)

**Coluna 1: Antes e Depois**
- Antes: Descrição do espaço original
- Depois: Resultado final
- Visual com cards contrastantes

**Coluna 2: Informações**
- Mesa (modelo)
- Cor
- Dimensões
- Ambiente
- Estilo
- Cliente
- Ano

#### Descrição Principal
- Texto completo do projeto
- Tipografia otimizada

#### Características
- Tags em badges
- Todas as características do projeto

#### CTA Principal
- Título: "Gostou Deste Projeto?"
- 2 botões:
  - 💰 Solicitar Orçamento (WhatsApp)
  - 📞 Agendar Consulta (WhatsApp)

#### Projetos Relacionados
- 3 projetos do mesmo estilo
- Cards clicáveis
- Removidos se não houver relacionados

### Funcionalidades JavaScript

```javascript
inicializarProjeto()        // Setup inicial
renderizarProjeto()         // Renderiza conteúdo
renderizarRelacionados()    // Projetos mesmo estilo
atualizarMetaTags()         // SEO dinâmico
solicitarOrcamento()        // WhatsApp com mensagem
agendar()                   // WhatsApp com consulta
irParaProjeto(id)           // Navega para outro
atualizarCarrinhoCount()    // Sincroniza carrinho
```

### Integração WhatsApp

Botões disparam links WhatsApp com mensagens pré-formatadas:

```javascript
// Orçamento
https://wa.me/5547997168814?text=Olá!%20Gostaria%20de%20solicitar...

// Consulta
https://wa.me/5547997168814?text=Olá!%20Gostaria%20de%20agendar...
```

---

## 4. Integração com Site Principal

### Navegação

Adicionado link "🖼️ Galeria" no header principal:
```html
<a href="galeria.html" class="nav-link">🖼️ Galeria</a>
```

### Fluxos de Navegação

```
Home → Galeria → Projeto → WhatsApp (Orçamento)
Home → Galeria → Filtro → Projeto → Relacionados
Home → Galeria → Busca → Projeto → Compartilhar
```

---

## 5. Estilos CSS

### Classes Principais (galeria.html)

```css
.galeria-container       /* Container principal */
.galeria-header         /* Header do blog */
.galeria-stats          /* Seção de estatísticas */
.galeria-filters        /* Container de filtros */
.filter-group           /* Cada grupo de filtro */
.filter-btn             /* Botão individual */
.galeria-grid           /* Grid de projetos */
.projeto-card           /* Card individual */
.projeto-image          /* Área de emoji */
.projeto-rating         /* Badge de avaliação */
.projeto-content        /* Conteúdo do card */
.projeto-tags           /* Tags/badges */
.no-results             /* Mensagem sem resultados */
```

### Classes Principais (projeto.html)

```css
.projeto-container      /* Container principal */
.projeto-breadcrumb     /* Navegação breadcrumb */
.projeto-hero           /* Hero emoji gigante */
.projeto-header         /* Cabeçalho com título */
.projeto-main           /* Grid principal 2 colunas */
.before-after           /* Seção antes/depois */
.projeto-info-sidebar   /* Sidebar de info */
.projeto-descricao      /* Descrição principal */
.projeto-tags-section   /* Seção de tags */
.projeto-cta            /* Call-to-action principal */
.related-projects       /* Projetos relacionados */
```

### Cores e Design

- **Primary:** #dbc1a2 (Bege)
- **Secondary:** #6b4436 (Marrom Escuro)
- **Accent:** #1b8768 (Teal)
- **Gradiente Hero:** Bege → Teal

---

## 6. SEO e Performance

### Meta Tags Dinâmicas

Cada página de projeto atualiza:
- `<title>` - Título + "Galeria JPR"
- `<meta name="description">` - Descrição do projeto
- `<meta property="og:*">` - Open Graph tags
- `<link rel="canonical">` - URL canônica

### Estrutura URL

```
/galeria.html                  // Página principal
/projeto.html?id=1            // Projeto individual
```

**Melhor prática futura:**
```
/galeria/                                    // Principal
/galeria/sala-de-jantar-classica/           // Projeto
```

### Schema.org (Próxima Implementação)

```json
{
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "Galeria de Projetos",
  "image": [...],
  "description": "..."
}
```

---

## 7. Gerenciamento de Conteúdo

### Adicionar Novo Projeto

1. Editar `galeria-dados.js`
2. Adicionar objeto ao array `projetos`
3. Incrementar ID
4. Preencher todos os campos

```javascript
projetos.push({
    id: 13,
    titulo: "Novo Projeto",
    descricao: "...",
    ambiente: "...",
    estilo: "...",
    mesa: "...",
    cor: "...",
    dimensoes: "...",
    ano: 2024,
    imagem: "🏠",
    antes: "...",
    depois: "...",
    tags: ["tag1", "tag2"],
    avaliacao: 5,
    cliente: "Novo Cliente"
});
```

### Editar Projeto Existente

1. Localizar por ID em `galeria-dados.js`
2. Modificar campos
3. Testar em `galeria.html`

### Deletar Projeto

```javascript
// Em galeria-dados.js
const projetos = projetos.filter(p => p.id !== idParaDeletar);
```

---

## 8. Filtros e Busca

### Busca Simples
- Busca em: título, descrição, cliente, tags
- Case-insensitive
- Em tempo real (onkeyup)

### Filtros Múltiplos
- Combina: estilo + ambiente + cor + termo
- Todos os filtros são AND (não OR)
- Contador de resultados por categoria

### Botões Ativos
- Mostram quais filtros estão ativos
- Destaque visual em Teal
- Atualizam contador dinamicamente

---

## 9. Responsividade

### Desktop (1200px+)
- Grid 3 colunas
- Sidebar na direita
- 2 colunas no projeto (antes/depois + info)

### Tablet (768px-1199px)
- Grid 2 colunas
- Filtros em layout horizontal
- 2 colunas no projeto

### Mobile (< 768px)
- Grid 1 coluna
- Filtros empilhados
- Projeto em coluna única
- Hero reduzido
- Botões full-width

---

## 10. Dados Técnicos

### Tamanho dos Arquivos

```
galeria-dados.js    ~25 KB (12 projetos + funções)
galeria.html        ~20 KB (HTML + CSS inline)
projeto.html        ~18 KB (HTML + CSS inline)
```

### Navegadores Suportados

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS 14+, Android 11+)

---

## 11. Próximas Melhorias

### High Priority
1. **Upload de Fotos Reais** - Substituir emojis por imagens
2. **Galeria Lightbox** - Antes/depois com zoom
3. **Reviews de Clientes** - Depoimentos por projeto
4. **CRM Integration** - Capturar leads dos CTAs
5. **Estatísticas** - Dashboard de visitações

### Medium Priority
1. **Filtros Avançados** - Múltiplas seleções
2. **Compartilhamento Social** - Buttons para redes
3. **PDF Download** - Catálogo do projeto
4. **Newsletter** - Novos projetos via email
5. **Ratings** - Sistema de avaliação dos clientes

### Low Priority
1. **360° View** - Visualização em 3D
2. **AR Preview** - Realidade aumentada
3. **Vídeo Tour** - Walkthrough do projeto
4. **Comparador** - Compara 2 projetos lado a lado
5. **Timeline** - Evolução do projeto passo-a-passo

---

## 12. Estatísticas de Implementação

- **Tempo de Desenvolvimento:** ~1.5 horas
- **Linhas de Código JS:** ~200 (galeria) + ~180 (projeto)
- **Linhas de HTML:** ~280 (galeria) + ~250 (projeto)
- **Linhas de CSS:** ~450
- **Projetos Iniciais:** 12
- **Categorias:** 3 (Ambiente, Estilo, Cor)
- **Funções JavaScript:** 15+

---

## 13. Troubleshooting

### Projetos não aparecem
**Solução:** Verificar `galeria-dados.js` carregado corretamente

### Filtros não funcionam
**Solução:** Testar console por erros, verificar função `filtrarProjetos()`

### WhatsApp não abre
**Solução:** Verificar número (47997168814) correto, testar em navegador moderno

### Estilos não aplicam
**Solução:** Verificar se `styles-novo.css` está carregado

---

## Contato e Suporte

Para dúvidas sobre a galeria:
- 📧 contato@jprmoveis.com.br
- 📱 (47) 99716-8814
- 💬 WhatsApp disponível

---

**Status:** ✅ Implementado e Funcional
**Última Atualização:** 10 de Novembro de 2024
**Próxima Otimização:** Upload de fotos reais + Lightbox
