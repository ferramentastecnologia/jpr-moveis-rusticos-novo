# 🎁 Cupons Disponíveis - JPR Móveis Rústicos

## Cupons Ativos

### 1. **PRIMEIRACOMPRA10**
- **Desconto:** 10% OFF
- **Tipo:** Percentual
- **Descrição:** Primeira Compra - 10% de desconto
- **Válido para:** Novos clientes
- **Exemplo:** Compra de R$ 1.000 → R$ 900

### 2. **BLACKFRIDAY20**
- **Desconto:** 20% OFF
- **Tipo:** Percentual
- **Descrição:** Black Friday - 20% de desconto
- **Válido para:** Todos os clientes
- **Exemplo:** Compra de R$ 1.000 → R$ 800

### 3. **NATAL15**
- **Desconto:** 15% OFF
- **Tipo:** Percentual
- **Descrição:** Natal - 15% de desconto
- **Válido para:** Todos os clientes durante dezembro
- **Exemplo:** Compra de R$ 1.000 → R$ 850

### 4. **FRETE50**
- **Desconto:** R$ 50,00
- **Tipo:** Fixo
- **Descrição:** R$ 50 de desconto no frete
- **Válido para:** Compras acima de R$ 500
- **Exemplo:** Frete de R$ 100 → Frete de R$ 50

### 5. **NOVASJPR**
- **Desconto:** 5% OFF
- **Tipo:** Percentual
- **Descrição:** Clientes Novas - 5% de desconto
- **Válido para:** Clientes que ainda não compraram
- **Exemplo:** Compra de R$ 1.000 → R$ 950

---

## Como Usar

1. Adicione produtos ao carrinho
2. Clique em "Carrinho" para abrir o painel lateral
3. Insira o código do cupom na caixa "Código do cupom"
4. Clique em "Aplicar"
5. O desconto será calculado automaticamente

---

## Notas Importantes

- ✅ Cupons são **case-insensitive** (maiúsculas ou minúsculas)
- ✅ Um cupom por compra (pode remover e aplicar outro)
- ✅ O desconto é calculado automaticamente no total
- ❌ Cupons não são combinados
- ❌ Cupons não funcionam em promoções já reduzidas

---

## Gerenciar Cupons

Para **adicionar novos cupons**, edite a variável `cuponsValidos` no arquivo `app-novo.js`:

```javascript
const cuponsValidos = {
    'CODIGO_CUPOM': {
        desconto: 10,           // Valor do desconto
        tipo: 'percentual',     // 'percentual' ou 'fixo'
        descricao: 'Descrição aqui'
    }
};
```

---

**Última Atualização:** 10 de Novembro de 2024
**Próximas Ações:** Integrar com backend para cupons dinâmicos
