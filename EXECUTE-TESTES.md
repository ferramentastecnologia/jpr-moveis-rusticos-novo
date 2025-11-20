# 🚀 EXECUTE OS TESTES AGORA

## ⚡ QUICK START (5 minutos)

Se você já tem PostgreSQL, banco de dados criado e node_modules instalado, execute isto:

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
python3 -m http.server 8001

# Terminal 3
bash test-commands.sh
```

---

## 📍 PASSO A PASSO COMPLETO (Com verificações)

### PASSO 1: Verificar Pré-requisitos

```bash
# Verificar Node.js
node --version
# Esperado: v18+

# Verificar npm
npm --version
# Esperado: v8+

# Verificar PostgreSQL
psql --version
# Se não encontrar, instalar:
# macOS: brew install postgresql
# Linux: sudo apt-get install postgresql
# Windows: Baixar installer em postgresql.org
```

---

### PASSO 2: Iniciar PostgreSQL

**macOS:**
```bash
brew services start postgresql
brew services list | grep postgres  # Verificar
```

**Linux:**
```bash
sudo systemctl start postgresql
sudo systemctl status postgresql
```

**Windows:**
```bash
# Abrir Services (services.msc) e iniciar "PostgreSQL"
# Ou abrir Git Bash e:
pg_ctl -D "C:\Program Files\PostgreSQL\15\data" start
```

**Verificar conexão:**
```bash
psql -U postgres -c "SELECT 1"
```

✅ **Deve retornar: `?column? = 1`**

---

### PASSO 3: Criar Banco de Dados

```bash
# Criar database
createdb jpr_moveis_db

# Verificar criação
psql -l | grep jpr_moveis_db
```

✅ **Deve aparecer `jpr_moveis_db` na lista**

---

### PASSO 4: Abra 3 Janelas de Terminal

Você vai abrir 3 terminais simultaneamente. Deixa cada um rodando em paralelo.

**NUNCA feche nenhum dos 3 enquanto estiver testando!**

---

## 🟦 TERMINAL 1: BACKEND

```bash
cd /Users/juanminni/meu-repositorio/jpr-moveis-rusticos/backend

# Instalar dependências (primeira vez)
npm install

# Rodar servidor
npm run dev
```

**Esperado no console:**
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

✅ **DEIXE RODANDO!**

---

## 🟨 TERMINAL 2: FRONTEND

```bash
cd /Users/juanminni/meu-repositorio/jpr-moveis-rusticos

# Rodar servidor HTTP
python3 -m http.server 8001
```

**Esperado no console:**
```
Serving HTTP on 0.0.0.0 port 8001 (http://0.0.0.0:8001/)
```

✅ **DEIXE RODANDO!**

---

## 🟧 TERMINAL 3: EXECUTAR TESTES

```bash
cd /Users/juanminni/meu-repositorio/jpr-moveis-rusticos

# Primeiro: Dar permissão ao script
chmod +x test-commands.sh

# Executar script de testes
bash test-commands.sh
```

**Esperado:**
```
========================================
JPR MÓVEIS - TESTES COMPLETOS
========================================

[SUITE 1] Health Check
{
  "status": "OK",
  "timestamp": "2024-11-10T...",
  "uptime": 123.45,
  "environment": "development"
}
✅ Status: OK

[SUITE 2] Autenticação - Registro
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
✅ Token salvo: eyJ...

[SUITE 2] Autenticação - Login
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "joao@example.com",
    "nome": "João Silva",
    "role": "customer"
  }
}
✅ Login OK

... (mais testes)

✅ TESTES COMPLETOS COM SUCESSO!

📊 Resumo do que foi testado:
  ✅ Health Check
  ✅ Registro de usuário
  ✅ Login
  ✅ Obter dados do usuário
  ✅ Listar produtos
  ✅ Criar produto (requer admin)
  ✅ Criar pedido
  ✅ Listar pedidos
  ✅ Detalhes do pedido
  ✅ Criar avaliação
  ✅ Erros de validação

Backend pronto para deploy! 🚀
```

---

## 📊 SE TUDO PASSAR

Se o script rodar sem erros:

✅ Health Check
✅ Registro funcionando
✅ Login funcionando
✅ Autenticação OK
✅ Produtos funcionando
✅ Pedidos funcionando
✅ Avaliações funcionando
✅ Validações funcionando

### 🎉 Parabéns! Backend funcionando perfeitamente!

---

## ❌ SE ALGO DER ERRO

### Erro: "Cannot connect to PostgreSQL"

```bash
# Verificar se PostgreSQL está rodando
psql -U postgres -c "SELECT 1"

# Se não funcionar, iniciar:
brew services start postgresql  # macOS
sudo systemctl start postgresql  # Linux
```

### Erro: "Database jpr_moveis_db não existe"

```bash
createdb jpr_moveis_db
```

### Erro: "Port 3001 already in use"

```bash
# Verificar o que está usando a porta
lsof -i :3001

# Matar o processo (macOS/Linux)
kill -9 <PID>

# Depois tentar novamente
npm run dev
```

### Erro: "Port 8001 already in use"

```bash
# Usar outra porta
python3 -m http.server 8002
# Depois acessar: http://localhost:8002
```

### Erro: "command not found: bash"

```bash
# Usar sh em vez de bash
sh test-commands.sh
```

---

## 🔧 TESTES MANUAIS DETALHADOS

Após o script rodar com sucesso, siga o arquivo `TESTES-COMPLETOS.md` para testes mais detalhados:

```bash
# Terminal 3: Copie e cole os comandos do TESTES-COMPLETOS.md

# Por exemplo:
curl -s http://localhost:3001/health | jq

curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@example.com",
    "senha": "senha123",
    "nome": "Teste Silva"
  }' | jq
```

---

## 🌐 TESTES DE FRONTEND

Após Backend e script passarem, abra no navegador:

```
http://localhost:8001/index-nova.html
```

**Verificar:**
- [ ] Homepage carrega completamente
- [ ] Logo aparece (não emoji 🪵)
- [ ] Sem erros no console (F12)
- [ ] Responsivo em mobile
- [ ] Busca funciona
- [ ] Adicionar ao carrinho funciona
- [ ] Clique em "Blog" - carrega blog.html
- [ ] Clique em "Galeria" - carrega galeria.html
- [ ] Clique em "Avaliações" - carrega avaliacoes.html

---

## 👤 CRIAR ADMIN USER

Quando chegar no ponto de testar criação de produtos, você vai precisar fazer um usuário admin:

**No Terminal 3:**

```bash
psql jpr_moveis_db -U postgres

# Dentro do psql, execute:
UPDATE usuarios SET role = 'admin' WHERE email = 'joao@example.com';

# Verificar
SELECT email, role FROM usuarios;

# Sair
\q
```

---

## ✅ CHECKLIST FINAL

- [ ] PostgreSQL rodando
- [ ] Database criado
- [ ] Terminal 1: Backend rodando na porta 3001
- [ ] Terminal 2: Frontend rodando na porta 8001
- [ ] Terminal 3: Script de testes passou
- [ ] Health check retornou OK
- [ ] Registro funcionou
- [ ] Login funcionou
- [ ] Produtos listados
- [ ] Pedido criado
- [ ] Avaliação criada
- [ ] Admin user criado
- [ ] Frontend abrindo
- [ ] Logo correto na homepage
- [ ] Blog carregando
- [ ] Galeria carregando
- [ ] Avaliações carregando

---

## 🎯 SE TUDO PASSOU

Parabéns! Sistema está **100% funcional**! 🎉

Próximos passos:

1. ✅ Documentar resultados
2. ✅ Fazer deploy em Railway
3. ✅ Configurar domínio customizado
4. ✅ Go live!

---

## 📞 PROBLEMAS?

Se encontrar algum erro:

1. Anote a mensagem de erro exata
2. Procure na seção "EM CASO DE ERRO" acima
3. Se não achar, consulte `TESTES-COMPLETOS.md`
4. Se ainda não funcionar, volte aqui com a mensagem de erro

---

**Boa sorte! 🚀**

Você consegue! Todos os testes estão prontos, é só executar.
