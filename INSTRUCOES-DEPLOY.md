# 🚀 Instruções de Deploy - JPR Móveis Rústicos Vouchers

**Data:** 04/11/2024
**Status:** ✅ Configurado e Pronto

---

## 🌐 URLs do Projeto

### Frontend (Netlify)
- **URL:** https://rosamexicanovouchers.netlify.app/
- **Repositório:** https://github.com/ferramentastecnologia/jpr-moveis-vouchers
- **Status:** ✅ Ativo

### Backend (Railway)
- **URL:** https://jpr-moveis-vouchers-production.up.railway.app
- **Repositório:** https://github.com/ferramentastecnologia/jpr-moveis-vouchers
- **Railway:** https://railway.com/project/0437aa39-9bd4-494c-b9d2-794bb424ca5b
- **Status:** ✅ Deploy automático ativo

---

## ⚙️ Variáveis de Ambiente (Railway)

### ✅ Já Configuradas:
```
APP_URL=https://jpr-moveis-vouchers-production.up.railway.app
ASAAS_API_KEY=<configurado>
NODE_ENV=production
PORT=3000
```

### 📧 Email (Adicionar se ainda não foi):
```
EMAIL_USER=ferramentas.starken@gmail.com
EMAIL_PASS=hoeuaqwjvnipdhf
```

---

## 🔄 Fluxo de Deploy

### Frontend (Netlify) - Automático
1. Push para `main` no GitHub
2. Netlify detecta mudanças
3. Build e deploy automático
4. URL: https://rosamexicanovouchers.netlify.app/

### Backend (Railway) - Automático
1. Push para `main` no GitHub
2. Railway detecta mudanças
3. Build e deploy automático
4. URL: https://jpr-moveis-vouchers-production.up.railway.app

---

## 📤 Como Funciona o Envio de Vouchers

### 1. Cliente Compra
- Acessa: https://rosamexicanovouchers.netlify.app/
- Escolhe voucher e paga via Asaas

### 2. Webhook do Asaas
- Asaas notifica: `https://jpr-moveis-vouchers-production.up.railway.app/api/webhook`
- Backend processa pagamento

### 3. Geração do Voucher
- Gera código único (ex: `RM-ABC123-XYZ`)
- Cria PDF com QR Code
- Salva na pasta `vouchers/`

### 4. Envio Automático

**Email (Gmail SMTP):**
- ✅ PDF anexado
- ✅ Código do voucher
- ✅ Instruções de uso

**WhatsApp (WAHA API):**
- ✅ Mensagem formatada
- ✅ Código do voucher
- ✅ Link para download: `https://jpr-moveis-vouchers-production.up.railway.app/api/download-pdf?code=RM-XXX`
- ✅ Instruções completas

---

## 🔗 Link de Download do PDF

### Formato da URL:
```
https://jpr-moveis-vouchers-production.up.railway.app/api/download-pdf?code=CODIGO_DO_VOUCHER
```

### Exemplo:
```
https://jpr-moveis-vouchers-production.up.railway.app/api/download-pdf?code=RM-ABC123-XYZ789
```

### Como Funciona:
1. Cliente clica no link recebido por WhatsApp
2. Backend verifica se o código existe
3. Retorna o PDF para download
4. Cliente salva o voucher no celular

---

## 🔧 Endpoints da API

### Health Check
```
GET https://jpr-moveis-vouchers-production.up.railway.app/health
```

### Download de PDF
```
GET https://jpr-moveis-vouchers-production.up.railway.app/api/download-pdf?code=CODIGO
```

### Webhook Asaas
```
POST https://jpr-moveis-vouchers-production.up.railway.app/api/webhook
```

### Criar Pagamento
```
POST https://jpr-moveis-vouchers-production.up.railway.app/api/create-payment
```

### Listar Vouchers
```
GET https://jpr-moveis-vouchers-production.up.railway.app/api/vouchers
```

### Validar Voucher
```
POST https://jpr-moveis-vouchers-production.up.railway.app/api/validate-voucher
Body: { "code": "RM-XXX" }
```

---

## 🧪 Testar o Sistema

### 1. Testar Backend Online
```bash
curl https://jpr-moveis-vouchers-production.up.railway.app/health
```

Resposta esperada:
```json
{
  "status": "ok",
  "env": "production",
  "port": 3000,
  "time": "2024-11-04T..."
}
```

### 2. Testar Geração de PDF
```bash
curl https://jpr-moveis-vouchers-production.up.railway.app/api/test-pdf
```

### 3. Testar Download de PDF
Após gerar um PDF de teste, acesse:
```
https://jpr-moveis-vouchers-production.up.railway.app/api/download-pdf?code=CODIGO_GERADO
```

---

## 💬 WhatsApp em Produção

### Situação Atual:
- ✅ Funciona localmente com WAHA (localhost:3001)
- ⚠️ Precisa configurar para produção

### Opções para Produção:

#### Opção 1: ngrok (Desenvolvimento)
```bash
# 1. Manter WAHA rodando local
docker compose up -d

# 2. Expor com ngrok
ngrok http 3001

# 3. Usar URL do ngrok no código
```

#### Opção 2: WAHA na Nuvem (Recomendado)
- Deploy WAHA no Railway/Render
- Conectar WhatsApp Business
- Atualizar variáveis de ambiente

#### Opção 3: API Oficial WhatsApp (Profissional)
- Melhor estabilidade
- Custo por mensagem
- Requer aprovação Meta

---

## 📝 Configurar Webhook no Asaas

1. **Acesse:** https://www.asaas.com/config/webhooks
2. **Criar Novo Webhook:**
   - Nome: `JPR Móveis Rústicos Vouchers`
   - URL: `https://jpr-moveis-vouchers-production.up.railway.app/api/webhook`
   - Eventos: `PAYMENT_RECEIVED`, `PAYMENT_CONFIRMED`
   - Tipo: Sequencial
   - Fila: Ativada

---

## 🐛 Troubleshooting

### Backend não está respondendo
**Verificar:**
```bash
curl https://jpr-moveis-vouchers-production.up.railway.app/health
```

**Logs no Railway:**
1. Acesse Railway
2. Clique no serviço
3. Veja "Deployments" > "View Logs"

### PDF não está sendo gerado
**Verificar:**
- Pasta `vouchers/` existe
- Railway tem permissão de escrita
- Variáveis de ambiente configuradas

### Email não está enviando
**Verificar:**
- `EMAIL_USER` configurado
- `EMAIL_PASS` correto (senha de app Gmail)
- Logs do Railway

### WhatsApp não envia
**Situação:**
- WAHA está rodando local (localhost:3001)
- Não está acessível de fora

**Solução Temporária:**
- Emails funcionam normalmente
- Cliente recebe PDF por email
- Link do PDF no email também funciona

**Solução Permanente:**
- Configurar WAHA na nuvem
- Ou usar Evolution API
- Ou API Oficial WhatsApp

---

## 📊 Monitoramento

### Logs do Railway
```
railway logs -p 0437aa39-9bd4-494c-b9d2-794bb424ca5b
```

### Health Check
Configure um monitor (UptimeRobot, Pingdom) para:
```
https://jpr-moveis-vouchers-production.up.railway.app/health
```

---

## 🔒 Segurança

### ✅ Implementado:
- HTTPS obrigatório (Railway)
- Variáveis de ambiente seguras
- Validação de webhooks Asaas
- Códigos únicos de voucher

### 📌 Recomendações:
- [ ] Adicionar rate limiting
- [ ] Implementar logs de auditoria
- [ ] Backup automático dos vouchers
- [ ] Monitoramento com Sentry

---

## 💰 Custos

### Railway
- **Free Tier:** $5 crédito/mês
- **Hobby Plan:** $5/mês (recomendado)
- Deploy incluído

### Netlify
- **Free Tier:** 100GB bandwidth/mês
- Deploy automático incluído

### Asaas
- 4,99% por transação + R$ 0,40

### Email (Gmail)
- Grátis

### WhatsApp (WAHA Local)
- Grátis (versão Core)

---

## 🎯 Próximos Passos

- [x] Backend no Railway
- [x] Frontend no Netlify
- [x] Webhook Asaas configurado
- [ ] WhatsApp em produção
- [ ] Testes de ponta a ponta
- [ ] Monitoramento ativo
- [ ] Backup automático

---

## 📞 Suporte

**Desenvolvedor:** Starken Tecnologia
**Email:** ferramentas.starken@gmail.com
**WhatsApp Sistema:** 5547 92752697

---

**Última Atualização:** 04/11/2024 09:15
**Status:** ✅ Sistema Pronto para Produção
