# 🏭 Como Adicionar a Imagem Aérea da Fábrica no Header

## Passos para adicionar a imagem:

### 1. Salvar a Imagem
Salve a imagem aérea da fábrica JPR Móveis Rústicos com o nome:
```
fabrica-aerea.jpg
```

### 2. Colocar na Pasta Correta
Coloque o arquivo na pasta:
```
/Users/juanminni/jpr-moveis-rusticos-clean/images/
```

### 3. Comando Rápido
Se a imagem estiver em Downloads, use:
```bash
cp ~/Downloads/[nome-da-imagem].jpg /Users/juanminni/jpr-moveis-rusticos-clean/images/fabrica-aerea.jpg
```

### 4. Otimizar a Imagem (Opcional mas Recomendado)
Para web, comprima a imagem para ~200-300KB:

**Usando ImageMagick:**
```bash
convert fabrica-aerea.jpg -quality 85 -resize 1920x fabrica-aerea-optimized.jpg
```

**Ou online:**
- TinyPNG.com
- Squoosh.app
- Compressor.io

## 📐 Especificações Recomendadas:

- **Formato:** JPG ou PNG
- **Tamanho:** 1920x400px (ou similar panorâmico)
- **Peso:** < 300KB (otimizado para web)
- **Qualidade:** 80-85% (balanço entre qualidade e tamanho)

## 🎨 Como Ficará:

O header terá:
- ✅ Imagem aérea da fábrica como background sutil
- ✅ Overlay gradiente escuro semi-transparente por cima
- ✅ Logo e menu links brancos bem visíveis
- ✅ Efeito profissional e moderno
- ✅ Transmite escala e profissionalismo da empresa

## ⚙️ O CSS já está configurado!

O arquivo `styles-novo.css` já está preparado para receber a imagem.
Assim que você adicionar `fabrica-aerea.jpg` na pasta `images/`,
o header automaticamente mostrará a imagem!

## 🔄 Alternativa: Usar URL Externa

Se preferir, você pode hospedar a imagem em:
- Imgur
- Cloudinary
- Google Drive (link público)

E atualizar o CSS com a URL completa:
```css
background: linear-gradient(...), url('https://url-da-imagem.jpg') center/cover;
```

## ✅ Checklist

- [ ] Imagem salva como `fabrica-aerea.jpg`
- [ ] Imagem colocada na pasta `images/`
- [ ] Imagem otimizada para web (< 300KB)
- [ ] Testado no navegador
- [ ] Testado no mobile
