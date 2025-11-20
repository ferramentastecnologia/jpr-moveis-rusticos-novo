# ⚡ Deploy Rápido - Sistema de Vouchers (15 minutos)

Este guia vai te ajudar a colocar a página de vouchers no ar HOJE!

---

## 🎯 Arquivo a Usar

**`vouchers-jpr-moveis.html`** ← Este arquivo único!

---

## 🚀 Opção 1: Deploy no Netlify (MAIS FÁCIL)

### Passo a Passo

1. **Acesse:** https://www.netlify.com/
2. **Crie uma conta** (grátis)
3. **Clique em:** "Add new site" → "Deploy manually"
4. **Arraste** o arquivo `vouchers-jpr-moveis.html` para a área
5. **Pronto!** Você terá uma URL tipo: `https://jpr-moveis-vouchers.netlify.app`

### Customizar Domínio (opcional)

```
1. No Netlify, vá em: Site settings → Domain management
2. Adicione seu domínio: vouchers.rosamexicanoblumenau.com.br
3. Configure o DNS conforme instruções
```

**Tempo:** 5 minutos
**Custo:** Grátis

---

## 🌐 Opção 2: Adicionar ao Site Atual

Se você já tem o site `rosamexicanoblumenau.com.br` hospedado:

### Via FTP/cPanel

1. **Acesse** o painel de hospedagem
2. **Entre** no gerenciador de arquivos
3. **Faça upload** de `vouchers-jpr-moveis.html`
4. **Acesse:** `https://rosamexicanoblumenau.com.br/vouchers-jpr-moveis.html`

### Via GitHub (se usar)

```bash
git add vouchers-jpr-moveis.html
git commit -m "Adicionar página de vouchers"
git push origin main
```

**Tempo:** 3 minutos
**Custo:** Grátis (já incluído no hosting)

---

## ✅ Teste Antes de Divulgar

### Checklist de Testes

Abra a página e teste:

- [ ] Página carrega corretamente
- [ ] Todos os 3 vouchers aparecem
- [ ] Botão "Comprar Agora" abre WhatsApp
- [ ] WhatsApp abre com mensagem pré-preenchida
- [ ] Número correto: (47) 99233-4348
- [ ] Design responsivo (teste no celular)
- [ ] Todas as informações estão corretas

---

## 🎨 Personalizações Opcionais

### Ajustar Preços

No arquivo `vouchers-jpr-moveis.html`, procure por:

```html
<span class="price-value">R$ 60,00</span>
```

Altere para o novo valor.

---

### Mudar Descrições

Procure por:

```html
<p class="voucher-description">
    Texto da descrição aqui
</p>
```

---

### Adicionar/Remover Vouchers

**Para adicionar um novo voucher:**

1. Copie um bloco `<div class="voucher-card">...</div>` completo
2. Cole logo após outro voucher
3. Edite o conteúdo (título, descrição, preço, etc)
4. Salve e teste!

**Para remover:**

Delete o bloco `<div class="voucher-card">...</div>` completo do voucher indesejado.

---

### Alterar Cores

No início do arquivo, na seção `<style>`, procure por:

```css
:root {
    --rosa-pink: #E91E63;      /* Cor principal */
    --rosa-purple: #9C27B0;    /* Cor secundária */
    --rosa-orange: #FF6F00;    /* Destaque */
    ...
}
```

Altere os códigos hexadecimais para suas cores desejadas.

---

## 📱 Divulgação

Depois que estiver no ar, divulgue!

### Instagram Stories

```
📣 NOVIDADE!
Agora você pode comprar nossos vouchers online!

🌮 Quinta no Rosa
💰 Couvert Livre
✨ E muito mais!

👉 Acesse: [SEU-LINK-AQUI]
ou clique no link da bio!
```

---

### Post Instagram/Facebook

```
🎉 NOVIDADE NO ROSA MEXICANO! 🌮

Agora ficou ainda mais fácil garantir sua experiência
no melhor restaurante mexicano de Blumenau!

✨ Compre vouchers online
📱 Receba instantaneamente
🎁 Válido por 6 meses

Disponíveis:
💃 Quinta no Rosa - R$ 60
🎊 Couvert Livre - a partir de R$ 10

👉 Acesse agora: [SEU-LINK-AQUI]

#RosaMexicano #Blumenau #VouchersOnline #Vouchers
```

---

### Google Meu Negócio

Adicione o link na seção "Links" do seu perfil:

```
Título: Comprar Vouchers Online
URL: [SEU-LINK-AQUI]
```

---

### WhatsApp Status

Crie uma imagem com:
- Logo JPR Móveis Rústicos
- Texto: "VOUCHERS ONLINE"
- QR Code do link
- "Acesse e compre agora!"

---

## 🔗 Links Úteis

Depois do deploy, adicione o link em:

- ✅ Bio do Instagram
- ✅ Sobre do Facebook
- ✅ Google Meu Negócio
- ✅ Menu do site principal (se tiver)
- ✅ Email assinatura
- ✅ Cardápio digital

---

## 📊 Acompanhamento (Opcional)

### Google Analytics

Se quiser acompanhar acessos, adicione antes do `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX'); // Seu ID do GA
</script>
```

---

### Facebook Pixel

Para rastrear conversões do Facebook Ads:

```html
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'SEU_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

---

## 🆘 Problemas Comuns

### O WhatsApp não abre

**Solução:** Verifique se o número está correto: `5547992334348`
- Deve ter: Código país (55) + DDD (47) + número (992334348)

---

### A página não carrega no celular

**Solução:**
- Limpe o cache do navegador
- Teste em navegador anônimo
- Verifique se o arquivo foi enviado corretamente

---

### Cores não aparecem corretamente

**Solução:**
- Salve o arquivo como UTF-8
- Não use editores de texto ricos (Word)
- Use editor simples (Notepad++, VSCode, Sublime)

---

## ✨ Melhorias Futuras

Depois que estiver rodando, você pode:

1. **Adicionar mais vouchers** conforme demanda
2. **A/B testar preços** diferentes
3. **Criar promoções** sazonais
4. **Integrar com sistema automatizado** (Sistema 2)
5. **Coletar emails** para newsletter

---

## 📞 Precisa de Ajuda?

Se tiver qualquer dúvida durante o deploy:

- **Email:** contato@starken.com.br
- **WhatsApp:** [Seu contato]

Ou simplesmente teste! O arquivo é auto-contido e funciona sozinho.

---

## ✅ Checklist Final Antes do Lançamento

- [ ] Arquivo testado localmente no navegador
- [ ] Upload feito com sucesso
- [ ] Link funciona corretamente
- [ ] WhatsApp abre com número certo
- [ ] Testado no celular
- [ ] Testado em diferentes navegadores
- [ ] Todas as informações corretas
- [ ] Preços atualizados
- [ ] Pronto para divulgar!

---

## 🎉 Parabéns!

Se chegou até aqui, seu sistema de vouchers está no ar!

Agora é só divulgar e começar a vender! 🚀

---

**Tempo total:** 15 minutos
**Custo:** R$ 0,00
**Resultado:** Sistema profissional de vouchers funcionando!

🌮 **Boas vendas!** 🌮
