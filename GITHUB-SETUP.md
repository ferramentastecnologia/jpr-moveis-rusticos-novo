# 🐙 SETUP GITHUB - PASSO A PASSO

**Objetivo:** Criar repositório no GitHub e fazer push do código

---

## PASSO 1: Criar Repositório no GitHub

### Via Website (Mais Fácil)

```
1. Abra: https://github.com/new
2. Preencha:
   - Repository name: jpr-moveis-rusticos
   - Description: E-commerce JPR Móveis Rústicos
   - Public ou Private: (escolha sua preferência)
3. IMPORTANTE:
   ☐ NÃO marque "Initialize this repository with:"
   ☐ NÃO adicione README
   ☐ NÃO adicione .gitignore
4. Clique: "Create Repository"
5. Copie a URL HTTPS que aparecer
```

---

## PASSO 2: Configurar Git Localmente

Na pasta `/Users/juanminni/meu-repositorio/jpr-moveis-rusticos`:

```bash
# Adicionar remote
git remote add origin https://github.com/SEU-USUARIO/jpr-moveis-rusticos.git

# Renomear branch (se necessário)
git branch -M main

# Fazer push
git push -u origin main
```

**Pronto!** Seu código está no GitHub! ✅

---

## PASSO 3: Verificar no GitHub

```
1. Abra: https://github.com/seu-usuario/jpr-moveis-rusticos
2. Deve aparecer:
   ✅ Todas as pastas (backend, Identidade Visual, etc)
   ✅ Todos os arquivos
   ✅ backend/src/server.js
   ✅ 50+ commits
```

---

## PASSO 4: Railway Consegue Ver

Após push para GitHub:

```
1. Abra: https://railway.app
2. New Project → Deploy from GitHub
3. Clique: "Configure GitHub App"
4. GitHub pedirá autorização
5. Selecione: jpr-moveis-rusticos
6. Railway consegue fazer deploy! ✅
```

---

## 🚨 Problemas Comuns

### "fatal: remote origin already exists"
```bash
# Solução:
git remote remove origin
git remote add origin https://...
```

### "Authentication failed"
```bash
# GitHub precisa de token (não senha mais)
# Criar em: https://github.com/settings/tokens
# Personal access tokens → Generate new token
# Escopos: repo, user
# Usar token como senha
```

### "Permission denied (publickey)"
```bash
# Você está usando SSH
# Opções:
# 1. Use HTTPS ao invés (recomendado)
# 2. Configure SSH key: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
```

---

## ✅ Checklist

Após push para GitHub:
- [ ] Repositório criado em GitHub
- [ ] URL do repositório: https://github.com/seu-usuario/jpr-moveis-rusticos
- [ ] Código fez push com sucesso
- [ ] Posso ver meus arquivos no GitHub
- [ ] Railway consegue authorizar e ver o repositório

---

## 🚀 Próximo Passo

Após GitHub estar configurado:

```
1. Railway.app → New Project
2. Deploy from GitHub
3. Selecione: jpr-moveis-rusticos
4. Deploy! 🚀
```

---

## 📞 Dúvidas?

Se tiver problema:
1. Qual erro aparece exatamente?
2. Qual passo deu erro?
3. Qual é sua conta GitHub?

---

*Guia GitHub - JPR Móveis Rústicos*
