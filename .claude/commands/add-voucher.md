# Comando: Adicionar Novo Voucher

Adicione um novo tipo de voucher ao sistema:

## 1. Coletar Informações

Perguntar ao usuário:

- Nome do voucher (ex: "Combo Especial")
- Emoji representativo (ex: 🎁)
- Preço por unidade (ex: R$ 50,00)
- Descrição completa
- Quantidade mínima (padrão: 1)
- Validade em meses (padrão: 6)

## 2. Editar Landing Page

Adicionar novo card em `index-vouchers-black-november.html`:

```html
<div class="voucher-card" data-id="novo-voucher-id">
  <div class="voucher-emoji">🎁</div>
  <div class="voucher-name">Nome do Voucher</div>
  <div class="voucher-price">R$ XX,XX</div>
  <div class="voucher-description">Descrição...</div>
  <button onclick="selectVoucher('novo-voucher-id', 'Nome', XX.XX, '🎁')">
    Comprar Agora
  </button>
</div>
```

## 3. Configurar JavaScript

Adicionar ao objeto `vouchers` no arquivo HTML:

```javascript
const vouchers = {
  // ... existentes
  'novo-voucher-id': {
    name: '🎁 Nome do Voucher',
    price: XX.XX,
    minQty: 1,
    emoji: '🎁',
    description: 'Descrição completa...'
  }
};
```

## 4. Atualizar Checkout (se necessário)

- Verificar se o checkout suporta o novo voucher
- Ajustar validações de preço se necessário
- Testar cálculo de total

## 5. Testar

- Abrir landing page no navegador
- Verificar se novo card aparece
- Testar seleção e redirecionamento para checkout
- Simular compra (ambiente de teste)
- Verificar geração de PDF com novo voucher

## 6. Deploy

- Commit as mudanças com mensagem descritiva
- Push para repositório
- Aguardar deploy automático no Netlify
- Testar em produção

⚠️ **Importante:** Backend aceita qualquer `voucherId`, então não precisa alterar server-vouchers.js!

Sempre mostrar preview do código antes de aplicar as mudanças!
