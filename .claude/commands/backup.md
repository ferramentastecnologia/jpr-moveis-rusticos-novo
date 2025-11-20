# Comando: Backup do Projeto

Crie backup completo do projeto JPR Móveis Rústicos Dashboard:

## 1. Backup do Banco de Dados

- Exportar dados do SQLite: `vouchers.db`
- Criar backup SQL com timestamp
- Salvar CSV de todos os vouchers via admin dashboard
- Verificar integridade dos dados exportados

## 2. Backup dos Arquivos

- Verificar pasta `/vouchers/` com PDFs gerados
- Listar quantidade de PDFs
- Calcular tamanho total
- Criar arquivo .zip se necessário

## 3. Backup de Configurações

- Copiar `.env.example` (sem credenciais)
- Documentar variáveis de ambiente necessárias
- Salvar configurações do Netlify
- Salvar configurações do Railway

## 4. Backup do Código

- Verificar último commit no Git
- Verificar se todos os arquivos estão commitados
- Criar tag de versão se necessário
- Push para repositório remoto

## 5. Relatório de Backup

Criar relatório com:
- Data e hora do backup
- Quantidade de vouchers salvos
- Tamanho total dos arquivos
- Localização dos backups
- Próximo backup recomendado (mensal)

## 6. Recomendações

- Sugerir migração para PostgreSQL se ainda usando SQLite
- Avisar sobre dados que podem ser perdidos em deploy
- Recomendar backup automático

Sempre confirme com o usuário antes de executar operações de backup!
