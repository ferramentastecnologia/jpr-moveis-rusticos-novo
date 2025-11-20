# ✅ JPR Móveis Rústicos - Checklist de Configuração

## 1️⃣ Preparação Inicial

- [ ] Criar conta Asaas (https://asaas.com)
- [ ] Gerar API Key no Asaas
- [ ] Criar email para JPR (jpr.moveis.rusticos@gmail.com)
- [ ] Gerar senha de app Google
- [ ] Preparar logo/imagens do cliente

## 2️⃣ Configuração Local

### Arquivo `.env`
```bash
ASAAS_API_KEY=sua_chave_aqui
ASAAS_SANDBOX=false
EMAIL_USER=jpr.moveis.rusticos@gmail.com
EMAIL_PASS=sua_senha_aqui
ADMIN_PASSWORD=JPR2025#@
```

- [ ] Preencher `ASAAS_API_KEY`
- [ ] Preencher `EMAIL_PASS`
- [ ] Alterar `ADMIN_PASSWORD` para um valor único
- [ ] Testar `.env` com `npm install && node server-vouchers.js`

## 3️⃣ Deploy no Railway

- [ ] Criar conta Railway (https://railway.app)
- [ ] Conectar repositório GitHub
- [ ] Criar novo projeto
- [ ] Adicionar variáveis de ambiente:
  - [ ] `ASAAS_API_KEY`
  - [ ] `EMAIL_PASS`
  - [ ] `ADMIN_PASSWORD`
  - [ ] `NODE_ENV=production`
  - [ ] `APP_URL=sua_url_production`
- [ ] Deploy e testar health check: `https://seu-projeto.up.railway.app/health`
- [ ] Salvar URL do Railway

## 4️⃣ Deploy no Netlify

- [ ] Criar conta Netlify (https://netlify.com)
- [ ] Conectar repositório GitHub
- [ ] Configurar build settings:
  - [ ] Build command: `echo "No build needed"`
  - [ ] Publish directory: `.`
- [ ] Conectar domínio customizado (opcional)
- [ ] Testar landing page

## 5️⃣ Configuração do Asaas

### Webhooks
- [ ] Acessar dashboard Asaas
- [ ] Ir para Settings → Webhooks
- [ ] Adicionar webhook:
  - URL: `https://seu-projeto.up.railway.app/api/webhook`
  - Eventos: `payment.received`, `payment.confirmed`
- [ ] Testar webhook

### Configurações de API
- [ ] Ativar PIX (se disponível)
- [ ] Configurar taxa de cartão
- [ ] Definir descrição padrão: "Voucher JPR Móveis Rústicos"

## 6️⃣ Testes de Pagamento

### PIX (Sandbox)
- [ ] Acessar checkout
- [ ] Selecionar PIX
- [ ] Verificar se QR Code aparece
- [ ] Confirmar se redireciona para sucesso

### Cartão (Sandbox)
- [ ] Usar cartão de teste Asaas
- [ ] Confirmar se pagamento processa
- [ ] Verificar geração de voucher

### Produção
- [ ] Testar com pagamento real (PIX)
- [ ] Testar com cartão real
- [ ] Confirmar recebimento em conta

## 7️⃣ Validação de Vouchers

- [ ] Acessar painel admin: `https://seu-dominio/validar-voucher.html`
- [ ] Login com credenciais admin
- [ ] Validar voucher gerado
- [ ] Testar reset de voucher
- [ ] Exportar CSV

## 8️⃣ Branding & Customização

- [ ] Atualizar logo em `images/logo.png`
- [ ] Atualizar logo branco em `images/logo-branco.png`
- [ ] Atualizar cores em HTML files
- [ ] Atualizar endereço: Rua Carlos Rischbieter, 64, Victor Konder, Blumenau - SC
- [ ] Atualizar telefone: (47) 3288-3096
- [ ] Atualizar WhatsApp: (47) 99233-4348
- [ ] Atualizar email: jpr.moveis.rusticos@gmail.com

## 9️⃣ Funcionalidades Específicas

### Vouchers
- [ ] Adicionar novos tipos de vouchers em `index-vouchers-black-november.html`
- [ ] Atualizar preços
- [ ] Atualizar descrições e emojis
- [ ] Testar cada tipo de voucher

### Emails (opcional)
- [ ] Desabilitar ou abilitar envio de emails
- [ ] Testar template de email
- [ ] Configurar texto personalizado

### WhatsApp (opcional)
- [ ] Configurar Evolution API (se desejado)
- [ ] Testar envio de voucher via WhatsApp

## 🔟 Monitoramento & Manutenção

- [ ] Configurar alertas no Railway
- [ ] Monitorar tráfego no Netlify
- [ ] Revisar logs semanalmente
- [ ] Backup do banco de dados (se PostgreSQL)

## 1️⃣1️⃣ Documentação Final

- [ ] Documentar credenciais de forma segura
- [ ] Criar guia para suporte técnico
- [ ] Documentar processo de adicionar novo voucher
- [ ] Documentar processo de tratamento de erros

---

## 📊 Status da Configuração

| Fase | Status | Responsável | Data |
|------|--------|-------------|------|
| Preparação | ⏳ Pendente | | |
| Local | ⏳ Pendente | | |
| Railway | ⏳ Pendente | | |
| Netlify | ⏳ Pendente | | |
| Asaas | ⏳ Pendente | | |
| Testes | ⏳ Pendente | | |
| Validação | ⏳ Pendente | | |
| Branding | ⏳ Pendente | | |
| Funcionalidades | ⏳ Pendente | | |
| Monitoramento | ⏳ Pendente | | |
| Documentação | ⏳ Pendente | | |

---

## 🆘 Suporte Rápido

**Erro de API?**
```bash
# Verificar se servidor está rodando
curl https://seu-projeto.up.railway.app/health
```

**Problemas com webhook?**
```bash
# Testar webhook manualmente
curl -X POST https://seu-projeto.up.railway.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"payment": {"status": "RECEIVED"}}'
```

**Resetar banco de dados?**
```bash
# Deletar vouchers.db (apenas desenvolvimento)
rm vouchers.db
```

---

**Última atualização:** 2025-11-09
**Desenvolvido com ❤️ por Juan Minni**
