# 🧪 GUIA DE TESTES LOCAIS - JPR MÓVEIS

Instruções passo a passo para testar o backend e frontend integrados localmente.

---

## ✅ Pré-requisitos

- [ ] Node.js v18+ instalado
- [ ] PostgreSQL instalado e rodando
- [ ] Git
- [ ] Postman, Insomnia ou cURL

---

## 📦 PASSO 1: Setup do Backend

### 1.1 Preparar variáveis de ambiente

```bash
cd backend
cp .env.example .env
```

### 1.2 Editar `.env` com suas credenciais

```bash
# Opção 1: Usando nano
nano .env

# Opção 2: Usando seu editor favorito
code .env
```

**Configurações Necessárias:**

```env
# Database (PostgreSQL local)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jpr_moveis_db
DB_USER=postgres
DB_PASSWORD=postgres  # Sua senha do PostgreSQL

# Server
PORT=3001
NODE_ENV=development
JWT_SECRET=sua_chave_super_secreta_mude_em_producao

# Asaas (você já deve ter)
ASAAS_API_KEY=sua_api_key_aqui
ASAAS_API_URL=https://api.asaas.com/v3

# Frontend
FRONTEND_URL=http://localhost:8001
FRONTEND_PROD_URL=https://jprmoveis.com.br
```

### 1.3 Criar banco de dados

```bash
# Opção 1: Usando createdb
createdb jpr_moveis_db

# Opção 2: Usando psql
psql -U postgres
CREATE DATABASE jpr_moveis_db;
\q
```

### 1.4 Instalar dependências

```bash
cd backend
npm install
```

### 1.5 Iniciar servidor

```bash
npm run dev
```

**Output esperado:**
```
✅ Conexão com PostgreSQL estabelecida
✅ Schema do banco de dados criado/atualizado
📦 Conectando ao PostgreSQL...
✅ Pool de conexões pronto

✅ Servidor JPR Móveis rodando na porta 3001
📍 Environment: development
🌐 CORS habilitado para: http://localhost:8001

🎉 Backend pronto para receber requisições!
```

---

## 🌐 PASSO 2: Frontend

O frontend já está 100% funcional em `/`. Você tem 2 opções:

### Opção A: Servidor Python (Já estava rodando)

```bash
# Verificar se servidor Python está rodando
ps aux | grep http.server

# Se não estiver, iniciar:
cd /Users/juanminni/meu-repositorio/jpr-moveis-rusticos
python3 -m http.server 8001
```

Acesso: http://localhost:8001/index-nova.html

### Opção B: Node.js http-server (Alternativa)

```bash
npm install -g http-server

cd /Users/juanminni/meu-repositorio/jpr-moveis-rusticos

http-server -p 8001
```

---

## 🧪 PASSO 3: Testes da API

Use Postman, Insomnia ou cURL para testar.

### 3.1 Health Check

```bash
curl http://localhost:3001/health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-11-10T15:30:00.000Z",
  "uptime": 123.45,
  "environment": "development"
}
```

### 3.2 Registrar Usuário

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "senha": "senha123",
    "nome": "João Silva",
    "telefone": "11999999999"
  }'
```

**Response:**
```json
{
  "message": "Usuário registrado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "joao@example.com",
    "nome": "João Silva",
    "role": "customer"
  }
}
```

### 3.3 Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "senha": "senha123"
  }'
```

**Salve o token retornado para próximas requisições!**

### 3.4 Obter Dados do Usuário (Requer Token)

```bash
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer seu_token_aqui"
```

### 3.5 Listar Produtos

```bash
# Todos os produtos
curl http://localhost:3001/api/produtos

# Com filtros
curl "http://localhost:3001/api/produtos?categoria=Mesas&pagina=1&limite=10"

# Busca
curl "http://localhost:3001/api/produtos?busca=sublime"
```

### 3.6 Criar Novo Produto (Admin)

```bash
curl -X POST http://localhost:3001/api/produtos \
  -H "Authorization: Bearer seu_token_admin" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Mesa Premium",
    "descricao": "Mesa feita à mão",
    "preco": 3500.00,
    "desconto": 5,
    "categoria": "Mesas",
    "imagem_url": "https://...",
    "estoque": 10
  }'
```

### 3.7 Criar Pedido

```bash
curl -X POST http://localhost:3001/api/pedidos \
  -H "Authorization: Bearer seu_token" \
  -H "Content-Type: application/json" \
  -d '{
    "itens": [
      {
        "produto_id": 1,
        "quantidade": 2
      },
      {
        "produto_id": 3,
        "quantidade": 1
      }
    ],
    "cupom_desconto": "PRIMEIRACOMPRA10"
  }'
```

### 3.8 Listar Meus Pedidos

```bash
curl -X GET http://localhost:3001/api/pedidos \
  -H "Authorization: Bearer seu_token"
```

### 3.9 Criar Pagamento (Asaas)

```bash
curl -X POST http://localhost:3001/api/pagamentos/criar \
  -H "Authorization: Bearer seu_token" \
  -H "Content-Type: application/json" \
  -d '{
    "pedido_id": 1,
    "metodo": "pix",
    "valor": 3500.00
  }'
```

### 3.10 Criar Avaliação

```bash
curl -X POST http://localhost:3001/api/avaliacoes \
  -H "Authorization: Bearer seu_token" \
  -H "Content-Type: application/json" \
  -d '{
    "produto_id": 1,
    "rating": 5,
    "titulo": "Excelente qualidade!",
    "comentario": "Produto chegou conforme esperado, muito bom mesmo."
  }'
```

### 3.11 Listar Avaliações de um Produto

```bash
curl "http://localhost:3001/api/avaliacoes?produto_id=1"
```

---

## 🔧 PASSO 4: Testes Integrados (Frontend + Backend)

### 4.1 Testar Página Principal

1. Abrir http://localhost:8001/index-nova.html
2. Verificar se logo aparece (deve estar com a imagem, não emoji)
3. Scroll pela página (hero, produtos, etc)

### 4.2 Buscar e Filtrar Produtos

1. Na homepage, testar busca por "Mesa"
2. Testar filtros de preço
3. Adicionar produto ao carrinho

### 4.3 Fluxo de Compra Completo

1. Adicionar 2-3 produtos ao carrinho
2. Clicar em "Checkout"
3. Preencher dados pessoais
4. Selecionar cupom de desconto
5. Selecionar forma de pagamento (ainda mock, não integrado)
6. Clicar "Finalizar Compra"
7. Verificar página de sucesso

### 4.4 Testar Outras Páginas

- [ ] Blog (blog.html) - Listar artigos
- [ ] Blog (artigo.html) - Ler artigo completo
- [ ] Galeria (galeria.html) - Ver projetos
- [ ] Galeria (projeto.html) - Detalhes do projeto
- [ ] Avaliações (avaliacoes.html) - Ver reviews e submeter nova
- [ ] Rastreamento (rastreamento.html) - Buscar pedido
- [ ] Admin (admin.html) - Login e gerenciar dados

---

## 🐛 Troubleshooting

### Erro: "ECONNREFUSED" no Backend

**Problema:** PostgreSQL não está rodando

**Solução:**
```bash
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Windows
net start PostgreSQL
```

### Erro: "Database jpr_moveis_db não existe"

**Solução:**
```bash
createdb jpr_moveis_db
```

### Erro: "Cannot find module" no Backend

**Solução:**
```bash
cd backend
npm install
```

### Frontend não carrega

**Verificar:**
1. Python/Node HTTP server rodando na porta 8001
2. Arquivos HTML, CSS, JS no diretório raiz
3. Permissões de arquivo

```bash
# Verificar porta 8001
lsof -i :8001

# Parar servidor anterior
kill -9 <PID>

# Reiniciar servidor
python3 -m http.server 8001
```

### Token JWT expirado

**Solução:**
- Refazer login para obter novo token
- Usar endpoint `/api/auth/refresh` com token antigo

---

## 📊 Checklist de Testes

### Backend
- [ ] Server iniciando sem erros
- [ ] Database schema criado
- [ ] Health check respondendo
- [ ] Registrar usuário funcionando
- [ ] Login funcionando
- [ ] Listar produtos funcionando
- [ ] Criar pedido com validação de estoque
- [ ] Asaas API respondendo

### Frontend
- [ ] Todas as páginas carregando
- [ ] Logo aparecendo (não emoji)
- [ ] Busca de produtos funcionando
- [ ] Adicionar ao carrinho funcionando
- [ ] Checkout formulário validando
- [ ] Página de sucesso mostrando
- [ ] Blog listando artigos
- [ ] Galeria mostrando projetos
- [ ] Avaliações carregando

---

## 🚀 Próximos Passos

Após testes locais:

1. **Deploy em Railway**
   ```bash
   # 1. Criar conta em railway.app
   # 2. Conectar repositório Git
   # 3. Adicionar variáveis de ambiente
   # 4. Deploy automático
   ```

2. **Configurar Domain Customizado**
   ```
   seu-dominio.com → Railway URL
   ```

3. **Atualizar CORS no .env**
   ```env
   FRONTEND_PROD_URL=https://seu-dominio.com
   ```

4. **Conectar Frontend com Backend**
   - Atualizar URLs de API no frontend
   - Remover localStorage mock
   - Usar API real

---

## 📞 Dúvidas?

Email: contato@jprmoveis.com.br
WhatsApp: (47) 99716-8814

---

*Guia de Testes - JPR Móveis Rústicos*
*Última atualização: 10 de Novembro de 2024*
