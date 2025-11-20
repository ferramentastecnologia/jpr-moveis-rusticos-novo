# 🔧 Configuração Google Reviews

Guia completo para integrar as avaliações do Google da sua loja em tempo real.

## 📋 Pré-requisitos

- Conta Google Cloud Platform (gratuita)
- Sua loja precisa estar cadastrada no Google Meu Negócio
- 5-10 minutos para configuração

---

## 🚀 Passo 1: Criar API Key do Google

### 1.1 Acessar Google Cloud Console

1. Acesse: https://console.cloud.google.com/
2. Faça login com sua conta Google
3. Aceite os termos de serviço se solicitado

### 1.2 Criar ou Selecionar Projeto

1. No topo da página, clique em **"Select a project"**
2. Clique em **"New Project"**
3. Nome do projeto: `JPR Moveis Reviews`
4. Clique em **"Create"**

### 1.3 Ativar Places API

1. No menu lateral, vá em **"APIs & Services"** → **"Library"**
2. Na busca, digite: `Places API`
3. Clique em **"Places API"**
4. Clique em **"Enable"** (Ativar)
5. Aguarde alguns segundos para ativar

### 1.4 Criar Credenciais (API Key)

1. No menu lateral, vá em **"APIs & Services"** → **"Credentials"**
2. Clique em **"+ CREATE CREDENTIALS"**
3. Selecione **"API Key"**
4. Uma janela aparecerá com sua API Key → **COPIE ESSA CHAVE** ✅
5. Exemplo: `AIzaSyBKXXXXXXXXXXXXXXXXXXXXXXXX`

### 1.5 Restringir API Key (IMPORTANTE - Segurança)

1. Na janela da API Key, clique em **"Restrict Key"**
2. Em **"Application restrictions"**:
   - Selecione **"HTTP referrers (websites)"**
   - Clique em **"Add an item"**
   - Adicione: `https://polite-dango-daf27b.netlify.app/*`
   - Se tiver domínio próprio, adicione também: `https://seudominio.com.br/*`
3. Em **"API restrictions"**:
   - Selecione **"Restrict key"**
   - Marque apenas **"Places API"**
4. Clique em **"Save"**

---

## 📍 Passo 2: Encontrar o Place ID da sua Loja

### Opção A: Usando Place ID Finder (Recomendado)

1. Acesse: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
2. Na caixa de busca, digite: `JPR Móveis Rústicos Blumenau`
3. Clique na sua loja no mapa
4. O Place ID aparecerá embaixo → **COPIE** ✅
5. Exemplo: `ChIJN1t_tDeuEmsRUsoyG83frY4`

### Opção B: Manualmente via API

1. Abra este link no navegador (substitua SUA_API_KEY pela key do Passo 1):

```
https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=JPR%20Móveis%20Rústicos%20Blumenau&inputtype=textquery&fields=place_id,name&key=SUA_API_KEY
```

2. Procure por `"place_id"` na resposta
3. Copie o valor entre aspas

---

## ⚙️ Passo 3: Configurar o Sistema

### 3.1 Editar arquivo de configuração

1. Abra o arquivo: `google-reviews-config.js`
2. Localize estas linhas:

```javascript
const GOOGLE_CONFIG = {
    // IMPORTANTE: Substitua com sua API Key real
    apiKey: 'SUA_API_KEY_AQUI',

    // IMPORTANTE: Substitua com o Place ID da sua loja
    placeId: 'SEU_PLACE_ID_AQUI',
```

3. **Substitua** com os valores que você copiou:

```javascript
const GOOGLE_CONFIG = {
    // IMPORTANTE: Substitua com sua API Key real
    apiKey: 'AIzaSyBKXXXXXXXXXXXXXXXXXXXXXXXX',  // ← Sua API Key aqui

    // IMPORTANTE: Substitua com o Place ID da sua loja
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',  // ← Seu Place ID aqui
```

4. Salve o arquivo

### 3.2 Fazer Deploy

```bash
git add google-reviews-config.js GOOGLE-REVIEWS-SETUP.md avaliacoes.html
git commit -m "Configure Google Reviews integration"
git push
netlify deploy --prod --dir=.
```

---

## ✅ Passo 4: Testar

### 4.1 Verificar Integração

1. Acesse: https://polite-dango-daf27b.netlify.app/avaliacoes.html
2. Abra o **Console do Navegador** (F12 → Console)
3. Procure por mensagens:
   - ✅ `Usando avaliações do Google` → **Funcionou!**
   - ✅ `Reviews do Google carregados: X` → **Funcionou!**
   - ⚠️ `Google Reviews não configurado` → Verifique API Key e Place ID

### 4.2 O que você verá

✅ **Badge do Google** no topo da página
✅ **Estatísticas reais** do Google (nota média, total de avaliações)
✅ **Avaliações reais** dos clientes com fotos de perfil
✅ **Badge "Google"** nas avaliações vindas do Google
✅ **Cache automático** (recarrega a cada 1 hora)

---

## 🔍 Solução de Problemas

### Erro: "Google Reviews não configurado"

**Causa:** API Key ou Place ID não foram substituídos
**Solução:** Verifique se você substituiu `SUA_API_KEY_AQUI` e `SEU_PLACE_ID_AQUI` pelos valores reais

### Erro: "API key not valid"

**Causa:** API Key incorreta ou Places API não ativada
**Solução:**
1. Verifique se copiou a API Key completa (sem espaços)
2. Verifique se ativou a Places API no Google Cloud Console
3. Aguarde alguns minutos (pode levar até 5 minutos para ativar)

### Erro: "REQUEST_DENIED"

**Causa:** Restrições da API Key bloqueando o acesso
**Solução:**
1. Vá em Google Cloud Console → Credentials
2. Edite sua API Key
3. Em HTTP referrers, adicione: `https://polite-dango-daf27b.netlify.app/*`
4. Salve e aguarde alguns minutos

### Erro: "CORS policy"

**Causa:** Tentando acessar direto do navegador (arquivo local)
**Solução:** Sempre acesse via URL do Netlify (https://...)

### Reviews não aparecem

**Causas possíveis:**
1. Sua loja não tem avaliações no Google
2. Place ID incorreto
3. Cache ativo (limpe com `limparCacheReviews()` no console)

**Solução:**
1. Verifique se sua loja tem reviews no Google Maps
2. Use o Place ID Finder para confirmar o ID correto
3. No console do navegador, execute: `limparCacheReviews()`

---

## 💰 Custos

### Google Places API - Preços

- **US$ 200 de crédito GRÁTIS por mês** da Google
- Cada requisição de Place Details custa **US$ 0.017**
- Com cache de 1 hora: ~720 requisições/mês
- **Custo mensal: ~US$ 12 (GRÁTIS com crédito)**

### Resumo: ✅ TOTALMENTE GRÁTIS para este volume

---

## 🎯 Funcionalidades

### O que a integração faz

✅ Busca avaliações reais do Google em tempo real
✅ Exibe fotos de perfil dos avaliadores
✅ Mostra nota média e total de avaliações
✅ Badge "Google" diferenciando reviews do Google
✅ Cache inteligente (1 hora) para economizar requisições
✅ Fallback automático para reviews locais se houver erro
✅ Mescla reviews do Google com reviews locais do sistema
✅ Filtros e ordenação funcionam com ambos tipos

### Cache Automático

- Reviews são salvos em cache por **1 hora**
- Economiza requisições da API
- Melhora velocidade de carregamento
- Para limpar cache: `limparCacheReviews()` no console

---

## 📊 Monitoramento

### Ver uso da API

1. Acesse: https://console.cloud.google.com/
2. Vá em **"APIs & Services"** → **"Dashboard"**
3. Clique em **"Places API"**
4. Veja gráficos de:
   - Requisições por dia
   - Erros
   - Latência

### Alertas de Custo

1. No Google Cloud Console
2. Vá em **"Billing"** → **"Budgets & alerts"**
3. Crie alerta para avisar se ultrapassar US$ 5/mês

---

## 🔒 Segurança

### Boas Práticas Implementadas

✅ API Key restrita apenas para Places API
✅ API Key restrita apenas para seu domínio
✅ Sem exposição de dados sensíveis
✅ Cache para reduzir requisições

### NUNCA faça isso:

❌ Usar a API Key no backend (só no frontend é seguro)
❌ Compartilhar sua API Key publicamente
❌ Remover as restrições da API Key

---

## 📞 Suporte

Se tiver problemas:

1. Verifique o console do navegador (F12)
2. Veja a seção "Solução de Problemas" acima
3. Verifique se Places API está ativa
4. Aguarde alguns minutos (propagação pode demorar)

---

## 🎉 Pronto!

Agora suas avaliações do Google aparecerão automaticamente na página de avaliações do site!

**URL da página:** https://polite-dango-daf27b.netlify.app/avaliacoes.html

### Próximos passos:

1. Incentive clientes a deixarem reviews no Google
2. Responda às avaliações pelo Google Meu Negócio
3. Compartilhe a página de avaliações nas redes sociais
4. Use o widget de badge nas páginas de produtos
