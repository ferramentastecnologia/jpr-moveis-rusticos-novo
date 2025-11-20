# Comando: Deploy Completo

Faça o deploy completo do projeto JPR Móveis Rústicos Dashboard seguindo estas etapas:

## 1. Verificações Pré-Deploy

- Verificar se há mudanças não commitadas: `git status`
- Verificar se o servidor local está funcionando
- Testar endpoints críticos localmente

## 2. Commit e Push

- Adicionar todas as mudanças: `git add .`
- Criar commit descritivo com as mudanças
- Push para o repositório remoto

## 3. Deploy Backend (Railway)

- Railway faz deploy automático ao detectar push
- Verificar logs do Railway
- Testar endpoint: https://jpr-moveis-vouchers-production.up.railway.app/health

## 4. Deploy Frontend (Netlify)

- Netlify faz deploy automático ao detectar push
- Aguardar 2-3 minutos para build
- Verificar: https://rosamexicanovouchers.netlify.app/

## 5. Testes Pós-Deploy

- Testar fluxo de compra completo
- Verificar geração de voucher
- Testar validação de voucher
- Verificar dashboard admin

## 6. Monitoramento

- Verificar logs do Railway
- Conferir transações no Asaas
- Verificar se webhook está funcionando

Sempre informe o usuário sobre cada etapa do processo!
