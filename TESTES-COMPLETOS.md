# 🧪 PLANO DE TESTES COMPLETOS - JPR MÓVEIS

Guia passo a passo para testar todo o sistema (Backend + Frontend) localmente.

**Data:** 10 de Novembro de 2024
**Objetivo:** Validar 100% da funcionalidade antes do deploy

---

## 📋 TESTES A FAZER

Total: **9 Suites de Testes** com **50+ casos**

- [x] SUITE 1: Setup Local
- [ ] SUITE 2: Health Check
- [ ] SUITE 3: Autenticação
- [ ] SUITE 4: Produtos
- [ ] SUITE 5: Pedidos & Pagamentos
- [ ] SUITE 6: Avaliações
- [ ] SUITE 7: Emails
- [ ] SUITE 8: Integração Frontend
- [ ] SUITE 9: Casos Extremos

---

## 🔧 SUITE 1: SETUP LOCAL

### 1.1 Verificar Pré-requisitos

```bash
# Node.js
node --version  # Deve ser v18+
# Esperado: v22.21.0

# npm
npm --version  # Deve ser v8+
# Esperado: v10.9.4

# PostgreSQL
psql --version  # Deve estar instalado
# Esperado: psql (PostgreSQL) 12.x ou superior
```

✅ **Resultado esperado:** Todos os comandos retornam versões

---

### 1.2 Iniciar PostgreSQL

```bash
# macOS - via Homebrew
brew services start postgresql

# Linux - via systemd
sudo systemctl start postgresql

# Windows - via Services
net start PostgreSQL

# Verificar se está rodando
psql -U postgres -c "SELECT 1"
# Deve retornar: ?column? = 1
```

✅ **Resultado esperado:** PostgreSQL respondendo

---

### 1.3 Criar Banco de Dados

```bash
# Criar database
createdb jpr_moveis_db

# Verificar criação
psql -l | grep jpr_moveis_db
# Deve listar: jpr_moveis_db | postgres | UTF8
```

✅ **Resultado esperado:** Database criado e visível

---

### 1.4 Configurar Backend

```bash
cd backend

# Copiar arquivo de ambiente
cp .env.example .env

# Editar .env (abra com seu editor preferido)
# Importante:
# - DB_PASSWORD deve ser sua senha PostgreSQL
# - JWT_SECRET pode ser qualquer string aleatória
# - ASAAS_API_KEY = seu key (ou deixar placeholder)
# - SENDGRID_API_KEY = seu key (ou deixar placeholder)

# Instalar dependências
npm install

# Deve retornar: "added 118 packages"
```

✅ **Resultado esperado:** Backend pronto para rodar

---

### 1.5 Iniciar Backend

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Esperado no console:
# ✅ Conexão com PostgreSQL estabelecida
# ✅ Schema do banco de dados criado/atualizado
# 📦 Conectando ao PostgreSQL...
# ✅ Pool de conexões pronto
# ✅ Servidor JPR Móveis rodando na porta 3001
# 📍 Environment: development
# 🌐 CORS habilitado para: http://localhost:8001
# 🎉 Backend pronto para receber requisições!
```

✅ **Resultado esperado:** Backend rodando na porta 3001

---

### 1.6 Iniciar Frontend

```bash
# Terminal 2 - Frontend
cd /Users/juanminni/meu-repositorio/jpr-moveis-rusticos
python3 -m http.server 8001

# Esperado no console:
# Serving HTTP on 0.0.0.0 port 8001 (http://0.0.0.0:8001/)
```

✅ **Resultado esperado:** Frontend rodando na porta 8001

---

## ✅ SUITE 2: HEALTH CHECK

### 2.1 Testar Health Check

```bash
# Terminal 3 - Testes
curl -s http://localhost:3001/health | jq

# Esperado:
{
  "status": "OK",
  "timestamp": "2024-11-10T15:30:00.000Z",
  "uptime": 123.45,
  "environment": "development"
}
```

✅ **Resultado:** Server respondendo OK

---

### 2.2 Testar CORS

```bash
# Acessar homepage
curl -s http://localhost:8001/index-nova.html | head -20
```

✅ **Resultado:** Homepage carrega com sucesso

---

## 🔐 SUITE 3: AUTENTICAÇÃO

### 3.1 Registrar Novo Usuário

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "senha": "senha123",
    "nome": "João Silva",
    "telefone": "11999999999"
  }'

# Esperado:
{
  "message": "Usuário registrado com sucesso. Email de boas-vindas enviado!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "joao@example.com",
    "nome": "João Silva",
    "role": "customer"
  }
}
```

✅ **Testes:**
- [ ] Status code: 201
- [ ] Token JWT válido
- [ ] User retornado
- [ ] Email "de boas-vindas" na mensagem

---

### 3.2 Tentar Registrar Email Duplicado

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "senha": "senha456",
    "nome": "Outro João"
  }'

# Esperado:
{
  "error": "Email já registrado",
  "email": "joao@example.com"
}
```

✅ **Status code:** 400 (Bad Request)

---

### 3.3 Login com Sucesso

```bash
# Salvar este token para próximos testes!
TOKEN=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "senha": "senha123"
  }' | jq -r '.token')

echo $TOKEN

# Esperado: Token JWT longo como:
# eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

✅ **Testes:**
- [ ] Status code: 200
- [ ] Token retornado
- [ ] User data retornado

---

### 3.4 Login com Senha Errada

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "senha": "senhaerrada"
  }'

# Esperado:
{
  "error": "Email ou senha inválidos"
}
```

✅ **Status code:** 401 (Unauthorized)

---

### 3.5 Obter Dados do Usuário Logado

```bash
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer $TOKEN"

# Esperado:
{
  "id": 1,
  "email": "joao@example.com",
  "nome": "João Silva",
  "role": "customer",
  "data_cadastro": "2024-11-10T15:30:00.000Z"
}
```

✅ **Status code:** 200

---

### 3.6 Acessar sem Token

```bash
curl -X GET http://localhost:3001/api/auth/me

# Esperado:
{
  "error": "Token não fornecido",
  "message": "Inclua o token JWT no header Authorization"
}
```

✅ **Status code:** 401

---

## 📦 SUITE 4: PRODUTOS

### 4.1 Listar Todos os Produtos

```bash
curl -s http://localhost:3001/api/produtos | jq

# Esperado:
{
  "total": 0,
  "pagina": 1,
  "limite": 20,
  "produtos": [],
  "proxima_pagina": false
}
```

✅ **Testes:**
- [ ] Status code: 200
- [ ] Array vazio (sem produtos ainda)
- [ ] Paginação funcionando

---

### 4.2 Criar Novo Produto (Admin)

Primeiro, criar um admin:

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@jprmoveis.com.br",
    "senha": "admin123",
    "nome": "Admin JPR",
    "telefone": "11999999999"
  }'

# Guardar token do admin
ADMIN_TOKEN=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@jprmoveis.com.br",
    "senha": "admin123"
  }' | jq -r '.token')
```

❌ **Problema:** Usuário registrado como "customer", não admin!

**Solução (manual):** Conectar ao PostgreSQL e atualizar role:

```bash
psql jpr_moveis_db -U postgres

# SQL command:
UPDATE usuarios SET role = 'admin' WHERE email = 'admin@jprmoveis.com.br';
\q
```

Agora criar produto:

```bash
curl -X POST http://localhost:3001/api/produtos \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Mesa Premium",
    "descricao": "Mesa rústica de madeira maciça",
    "preco": 3500.00,
    "desconto": 5,
    "categoria": "Mesas",
    "imagem_url": "https://example.com/mesa.jpg",
    "estoque": 10
  }'

# Esperado:
{
  "message": "Produto criado com sucesso",
  "produto": {
    "id": 1,
    "nome": "Mesa Premium",
    "preco": 3500.00,
    "estoque": 10,
    "ativo": true,
    ...
  }
}
```

✅ **Testes:**
- [ ] Status code: 201
- [ ] Produto criado com ID
- [ ] Todos os campos salvos

---

### 4.3 Listar Produtos Novamente

```bash
curl -s http://localhost:3001/api/produtos | jq '.total'

# Esperado: 1
```

✅ **Total agora é 1**

---

### 4.4 Buscar Produto Específico

```bash
curl -s http://localhost:3001/api/produtos/1 | jq

# Esperado: Dados completos do produto
```

✅ **Status code:** 200

---

## 🛒 SUITE 5: PEDIDOS & PAGAMENTOS

### 5.1 Criar Pedido

```bash
curl -X POST http://localhost:3001/api/pedidos \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "itens": [
      {
        "produto_id": 1,
        "quantidade": 2
      }
    ]
  }'

# Esperado:
{
  "message": "Pedido criado com sucesso. Email de confirmação enviado!",
  "pedido": {
    "id": 1,
    "numero_pedido": "JPR-1731263400000",
    "status": "pendente",
    "total": 7000.00,
    ...
  }
}
```

✅ **Testes:**
- [ ] Status code: 201
- [ ] Pedido com ID
- [ ] Número único gerado
- [ ] Total calculado corretamente (2 × 3500 = 7000)

---

### 5.2 Listar Meus Pedidos

```bash
curl -s http://localhost:3001/api/pedidos \
  -H "Authorization: Bearer $TOKEN" | jq

# Esperado: Array com 1 pedido
```

✅ **Status code:** 200

---

### 5.3 Detalhes do Pedido

```bash
curl -s http://localhost:3001/api/pedidos/1 \
  -H "Authorization: Bearer $TOKEN" | jq

# Esperado: Pedido + itens
```

✅ **Status code:** 200

---

### 5.4 Atualizar Status do Pedido (Admin)

```bash
curl -X PUT http://localhost:3001/api/pedidos/1 \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "preparacao",
    "rastreamento_codigo": "ABC123456BR"
  }'

# Esperado: Status atualizado para "preparacao"
```

✅ **Testes:**
- [ ] Status code: 200
- [ ] Status mudou
- [ ] Rastreamento salvo
- [ ] Email de atualização enviado

---

## ⭐ SUITE 6: AVALIAÇÕES

### 6.1 Criar Avaliação

```bash
curl -X POST http://localhost:3001/api/avaliacoes \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "produto_id": 1,
    "rating": 5,
    "titulo": "Excelente qualidade!",
    "comentario": "Produto chegou conforme esperado, muito bom mesmo."
  }'

# Esperado:
{
  "message": "Avaliação enviada com sucesso. Aguardando aprovação.",
  "avaliacao": {
    "id": 1,
    "usuario_id": 1,
    "produto_id": 1,
    "rating": 5,
    "status": "pendente",
    ...
  }
}
```

✅ **Testes:**
- [ ] Status code: 201
- [ ] Avaliação com status "pendente"
- [ ] Rating salvo (1-5)

---

### 6.2 Listar Avaliações do Produto

```bash
curl -s "http://localhost:3001/api/avaliacoes?produto_id=1" | jq

# Esperado: Array vazio (avaliação ainda está pendente)
```

✅ **Apenas avaliações aprovadas aparecem**

---

### 6.3 Aprovar Avaliação (Admin)

```bash
curl -X PUT http://localhost:3001/api/avaliacoes/1/resposta \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "resposta_empresa": "Obrigado pelo feedback!",
    "aprovar": true
  }'

# Esperado: Avaliação aprovada
```

✅ **Status code:** 200

---

### 6.4 Listar Novamente

```bash
curl -s "http://localhost:3001/api/avaliacoes?produto_id=1" | jq '.avaliacoes | length'

# Esperado: 1 (agora aparece)
```

✅ **Avaliação agora visível**

---

## 📧 SUITE 7: EMAILS TRANSACIONAIS

### 7.1 Verificar Logs de Email (Sem SendGrid)

Se não tiver API key, os emails geram erro gracioso no console:

```
Aviso: Erro ao enviar email de boas-vindas: ...
(Email service not configured or key invalid)
```

✅ **Esperado:** Erro gracioso, mas fluxo continua

---

### 7.2 Configurar SendGrid (Opcional)

Se tiver API key:

```bash
# Editar .env
SENDGRID_API_KEY=SG.seu_key_aqui
SENDGRID_FROM_EMAIL=contato@jprmoveis.com.br

# Reiniciar backend
npm run dev
```

---

### 7.3 Testar Email de Boas-vindas

```bash
# Registrar novo usuário
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@example.com",
    "senha": "senha123",
    "nome": "Maria Silva"
  }'

# Verificar caixa de entrada de maria@example.com
```

✅ **Email deve chegar com:**
- Subject: "Bem-vindo à JPR Móveis, Maria! 🎉"
- HTML formatado
- Logo, cores corretas
- Link para loja

---

### 7.4 Testar Email de Confirmação de Pedido

```bash
# Criar novo pedido (já testado acima)
# Verificar caixa de entrada do usuário
```

✅ **Email deve incluir:**
- Número do pedido
- Tabela com itens
- Cálculo de total
- Status e próximos passos

---

### 7.5 Testar Email de Atualização

```bash
# Atualizar status do pedido (já testado acima)
# Verificar caixa de entrada
```

✅ **Email deve incluir:**
- Status atualizado (🔨 Em preparação)
- Código de rastreamento
- Próximas etapas

---

## 🌐 SUITE 8: INTEGRAÇÃO FRONTEND + BACKEND

### 8.1 Abrir Homepage

```
Browser: http://localhost:8001/index-nova.html
```

**Verificar:**
- [ ] Logo aparece (não emoji 🪵)
- [ ] Página carrega completamente
- [ ] Sem erros de console (F12)
- [ ] Responsivo em mobile

---

### 8.2 Buscar Produtos

Na homepage:
- [ ] Digite "Mesa" na busca
- [ ] Produto da SUITE 4 aparece
- [ ] Clique para ver detalhes

✅ **Esperado:** Produto listado

---

### 8.3 Adicionar ao Carrinho

Na homepage:
- [ ] Clique em "Adicionar ao Carrinho"
- [ ] Notificação de sucesso
- [ ] Contador do carrinho aumenta

✅ **Esperado:** Item adicionado

---

### 8.4 Abrir Carrinho

- [ ] Clique no ícone do carrinho
- [ ] Modal abre com itens
- [ ] Preço total correto
- [ ] Botão "Checkout" disponível

✅ **Esperado:** Carrinho funcional

---

### 8.5 Fazer Checkout

- [ ] Clique "Checkout"
- [ ] Página /checkout-novo.html carrega
- [ ] Preencha dados pessoais
- [ ] Selecione forma de pagamento
- [ ] Clique "Finalizar Compra"

✅ **Esperado:** Sucesso na compra

---

### 8.6 Página de Sucesso

- [ ] Página /sucesso-compra.html carrega
- [ ] Mostra número do pedido
- [ ] Timeline visual
- [ ] Opção de imprimir

✅ **Esperado:** Confirmação visual

---

### 8.7 Verificar Blog

- [ ] Clique "Blog" no menu
- [ ] blog.html carrega
- [ ] Artigos listados
- [ ] Filtros funcionam

✅ **Esperado:** Blog carregando

---

### 8.8 Verificar Galeria

- [ ] Clique "Galeria" no menu
- [ ] galeria.html carrega
- [ ] 12 projetos listados
- [ ] Filtros de estilo/ambiente funcionam

✅ **Esperado:** Galeria completa

---

### 8.9 Verificar Avaliações

- [ ] Clique "Avaliações" no menu
- [ ] avaliacoes.html carrega
- [ ] Avaliações aprovadas aparecem
- [ ] Formulário para criar nova avaliação

✅ **Esperado:** Reviews visíveis

---

## 🔥 SUITE 9: CASOS EXTREMOS

### 9.1 Validação de Inputs

```bash
# Registrar com email inválido
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "invalido", "senha": "123", "nome": "Teste"}'

# Esperado: 400 (Bad Request)
```

✅ **Status code:** 400

---

### 9.2 Criar Pedido sem Itens

```bash
curl -X POST http://localhost:3001/api/pedidos \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"itens": []}'

# Esperado:
{
  "error": "Pedido vazio",
  "message": "Adicione pelo menos um item"
}
```

✅ **Status code:** 400

---

### 9.3 Estoque Insuficiente

```bash
# Tentar comprar 100 unidades (estoque é 10)
curl -X POST http://localhost:3001/api/pedidos \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "itens": [{"produto_id": 1, "quantidade": 100}]
  }'

# Esperado:
{
  "error": "Erro ao criar pedido",
  "message": "Estoque insuficiente para produto 1"
}
```

✅ **Validação funcionando**

---

### 9.4 Token Expirado

```bash
# Aguardar 7 dias... ou simular:
# Editar .env com JWT_SECRET diferente e reiniciar

curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer token_antigo"

# Esperado: 401 Unauthorized
```

✅ **Status code:** 401

---

### 9.5 Acesso Negado (Admin Required)

```bash
# Com token de customer
curl -X POST http://localhost:3001/api/produtos \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nome": "Teste", "preco": 100}'

# Esperado:
{
  "error": "Acesso negado",
  "message": "Apenas administradores podem acessar este recurso"
}
```

✅ **Status code:** 403

---

## 📊 CHECKLIST FINAL

### Backend
- [ ] PostgreSQL conectado
- [ ] 9 tabelas criadas
- [ ] 27 endpoints funcionando
- [ ] JWT authentication OK
- [ ] CORS configurado
- [ ] Validação de inputs OK
- [ ] Error handling OK
- [ ] Logging OK

### Emails (se tiver API key)
- [ ] Boas-vindas enviado
- [ ] Confirmação pedido enviado
- [ ] Atualização pedido enviado
- [ ] Confirmação pagamento enviado
- [ ] Templates HTML corretos
- [ ] Dados dinâmicos funcionando

### Frontend
- [ ] Todas as páginas carregam
- [ ] Logo correto (não emoji)
- [ ] Busca funciona
- [ ] Carrinho funciona
- [ ] Checkout funciona
- [ ] Blog listando
- [ ] Galeria listando
- [ ] Avaliações listando

### Integração
- [ ] Frontend → Backend comunicando
- [ ] Dados salvos em PostgreSQL
- [ ] Paginação OK
- [ ] Filtros OK
- [ ] Transações OK (estoque diminui)

---

## 📝 Resultado Final

Após completar todos os testes, descreva o resultado:

```markdown
## RESULTADO DOS TESTES - JPR MÓVEIS

Data: 10 de Novembro de 2024
Status: ✅ TODOS OS TESTES PASSARAM

### Suite 1: Setup Local
✅ PostgreSQL rodando
✅ Backend rodando na porta 3001
✅ Frontend rodando na porta 8001

### Suite 2: Health Check
✅ API respondendo
✅ CORS habilitado

[... etc para cada suite]

### Conclusão
🎉 Sistema 100% funcional e pronto para deploy!
```

---

**Vamos começar os testes? Siga o passo a passo acima!** 🚀

