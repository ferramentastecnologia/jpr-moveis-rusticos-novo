# 🧪 INSTRUÇÕES PARA EXECUTAR TESTES LOCALMENTE

Como não tenho acesso ao PostgreSQL no sandbox, aqui estão as instruções **PASSO A PASSO** para você executar os testes no seu computador.

---

## 📋 PRÉ-REQUISITOS VERIFICADOS

✅ Node.js: **v22.21.0** (OK)
✅ npm: **v10.9.4** (OK)
⚠️ PostgreSQL: **Não disponível no sandbox** (você precisa ter instalado localmente)

---

## 🚀 INSTRUÇÕES PARA VOCÊ EXECUTAR

### ETAPA 1: Abra o Terminal do seu Computador

Não use o sandbox. Abra um terminal real no seu Mac/Linux/Windows.

---

### ETAPA 2: Inicie PostgreSQL

**No macOS (com Homebrew):**
```bash
brew services start postgresql
brew services status postgresql  # Verificar se está rodando
```

**No macOS (com MacPorts):**
```bash
sudo port load postgresql15-server
```

**No Linux (Debian/Ubuntu):**
```bash
sudo systemctl start postgresql
sudo systemctl status postgresql
```

**No Windows:**
```bash
# PostgreSQL deve estar no PATH
# Abra Services (services.msc) e inicie "PostgreSQL"
# Ou execute:
pg_ctl -D "C:\Program Files\PostgreSQL\15\data" start
```

**Teste a conexão:**
```bash
psql -U postgres -c "SELECT 1"
# Deve retornar: ?column? = 1
```

---

### ETAPA 3: Criar Banco de Dados

```bash
createdb jpr_moveis_db

# Verificar criação
psql -l | grep jpr_moveis_db
```

---

### ETAPA 4: Abra 3 Terminais

**Terminal 1 - Backend:**
```bash
cd /Users/juanminni/meu-repositorio/jpr-moveis-rusticos/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd /Users/juanminni/meu-repositorio/jpr-moveis-rusticos
python3 -m http.server 8001
```

**Terminal 3 - Testes:**
```bash
cd /Users/juanminni/meu-repositorio/jpr-moveis-rusticos
```

---

### ETAPA 5: Executar Script de Testes

No Terminal 3:

```bash
# Dar permissão ao script
chmod +x test-commands.sh

# Executar testes
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
  "timestamp": "...",
  ...
}
✅ Status: OK

[SUITE 2] Autenticação - Registro
{
  "message": "Usuário registrado com sucesso...",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  ...
}
✅ Token salvo: eyJ...

... (mais testes)

✅ TESTES COMPLETOS COM SUCESSO!
```

---

### ETAPA 6: Testes Manuais Detalhados

Abra o arquivo `TESTES-COMPLETOS.md` e siga cada suite:

```bash
# Terminal 3 - Copie os comandos do TESTES-COMPLETOS.md e execute
# Por exemplo:

# SUITE 2: Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "senha": "senha123"
  }' | jq
```

---

### ETAPA 7: Fazer Admin User

**No Terminal 3:**

```bash
psql jpr_moveis_db -U postgres

# Dentro do psql, execute:
UPDATE usuarios SET role = 'admin' WHERE email = 'joao@example.com';
SELECT * FROM usuarios;  # Verificar
\q
```

---

### ETAPA 8: Testes de Admin

```bash
# Re-executar script com admin mode
bash test-commands.sh ADMIN_MODE
```

---

### ETAPA 9: Testes de Frontend

Abra no navegador:
```
http://localhost:8001/index-nova.html
```

**Checklist:**
- [ ] Logo aparece (não emoji)
- [ ] Homepage carrega
- [ ] Busca funciona
- [ ] Adicionar ao carrinho funciona
- [ ] Abrir carrinho funciona

Clique em "Blog" → Verifica se blog.html carrega
Clique em "Galeria" → Verifica se galeria.html carrega
Clique em "Avaliações" → Verifica se avaliacoes.html carrega

---

### ETAPA 10: Testes de Email (Opcional)

Se tiver SendGrid API key:

```bash
# Editar backend/.env
SENDGRID_API_KEY=SG.seu_key_aqui
SENDGRID_FROM_EMAIL=contato@jprmoveis.com.br

# Reiniciar backend (Ctrl+C e npm run dev novamente)
```

Depois execute:

```bash
# Registrar novo usuário (enviará boas-vindas)
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@example.com",
    "senha": "senha123",
    "nome": "Maria Silva"
  }'

# Verificar caixa de entrada de maria@example.com
```

---

## 📊 CHECKLIST DE EXECUÇÃO

Marque conforme completa:

### Setup
- [ ] PostgreSQL rodando
- [ ] Database `jpr_moveis_db` criado
- [ ] Terminal 1 (Backend) rodando
- [ ] Terminal 2 (Frontend) rodando
- [ ] Terminal 3 (Testes) pronto

### Testes Automáticos
- [ ] Script `test-commands.sh` executado com sucesso
- [ ] Health Check OK
- [ ] Registro de usuário OK
- [ ] Login OK
- [ ] Produtos listados
- [ ] Pedido criado
- [ ] Avaliação criada

### Testes Manuais
- [ ] SUITE 2: Autenticação
- [ ] SUITE 3: Produtos
- [ ] SUITE 4: Pedidos
- [ ] SUITE 5: Avaliações
- [ ] SUITE 6: Emails (se tem API key)

### Admin Setup
- [ ] Admin user criado via psql
- [ ] Teste de criação de produto com admin OK

### Frontend
- [ ] Homepage carrega
- [ ] Logo correto
- [ ] Busca funciona
- [ ] Carrinho funciona
- [ ] Blog carrega
- [ ] Galeria carrega
- [ ] Avaliações carregam

### Resultado Final
- [ ] Todos os testes passaram ✅
- [ ] 0 erros críticos
- [ ] Documentação atualizada

---

## 🔧 TROUBLESHOOTING

### PostgreSQL não inicia
```bash
# Verificar se está rodando
ps aux | grep postgres

# Ou checar porta
lsof -i :5432

# Se estiver preso, matar o processo
killall postgres
# Depois reiniciar: brew services start postgresql
```

### Backend erro: "Cannot connect to PostgreSQL"
```bash
# Verificar .env
cat backend/.env | grep DB_

# Testar conexão manual
psql -U postgres -h localhost jpr_moveis_db
```

### Frontend porta 8001 já em uso
```bash
# Verificar o que está usando a porta
lsof -i :8001

# Usar outra porta
python3 -m http.server 8002  # Porta 8002
# Depois testar em http://localhost:8002
```

### curl command not found
```bash
# Instalar curl (Linux)
sudo apt-get install curl

# Ou usar no Windows: WSL ou Git Bash
```

---

## ✅ RESULTADO ESPERADO

Ao final de todos os testes:

```
✅ TESTES COMPLETOS COM SUCESSO!

📊 Resumo do que foi testado:
  ✅ Health Check
  ✅ Registro de usuário
  ✅ Login
  ✅ Obter dados do usuário
  ✅ Listar produtos
  ✅ Criar produto (admin)
  ✅ Criar pedido
  ✅ Listar pedidos
  ✅ Detalhes do pedido
  ✅ Criar avaliação
  ✅ Erros de validação

Backend pronto para deploy! 🚀
```

---

## 📞 Próximos Passos

Após todos os testes passarem:

1. ✅ Fazer documentação de resultados
2. ✅ Preparar para deploy em Railway
3. ✅ Implementar CI/CD (opcional)
4. ✅ Deploy em produção

---

## 💡 Dicas

- **Copie e Cole:** Todos os comandos estão prontos para copiar
- **Monitore Logs:** Observe os 3 terminais enquanto testa
- **Documente Resultados:** Screenshot/anotações dos testes
- **Teste Devagar:** Não execute tudo de uma vez, siga o passo a passo

---

**Boa sorte com os testes! 🎯**

Se tiver problemas, volte e mostre a mensagem de erro.
