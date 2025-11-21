# 📹 Instruções para Adicionar o Vídeo do Patrick

## Como Adicionar o Vídeo ao Site

### Opção 1: Arquivo Local (Recomendado para Desenvolvimento)

1. **Copie o arquivo de vídeo** para a pasta do projeto:
   ```bash
   cp "/caminho/para/Ultima versaoJPR.mov" /Users/juanminni/jpr-moveis-rusticos-clean/
   ```

2. **Opcional: Converter para MP4** (melhor compatibilidade):
   ```bash
   # Se você tem ffmpeg instalado
   ffmpeg -i "Ultima versaoJPR.mov" -c:v libx264 -c:a aac "Ultima versaoJPR.mp4"
   ```

### Opção 2: Hospedar em CDN ou Storage (Recomendado para Produção)

Para melhor performance em produção, considere hospedar o vídeo em:

1. **Netlify Large Media** (se usar Netlify)
2. **Cloudinary** (gratuito até 25GB)
3. **AWS S3 + CloudFront**
4. **YouTube (como alternativa)** - veja instruções abaixo

#### Se optar por YouTube:

Edite o arquivo `index-nova.html` e substitua a seção do vídeo por:

```html
<div class="video-wrapper" style="aspect-ratio: 9/16;">
    <iframe
        style="width: 100%; height: 100%; border: none; border-radius: 24px;"
        src="https://www.youtube.com/embed/SEU_VIDEO_ID"
        title="Conheça Patrick e Nossa Operação"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
    </iframe>
</div>
```

### Opção 3: Vídeo em Pasta Separada

Se o vídeo for muito grande, crie uma pasta `videos/`:

```bash
mkdir -p /Users/juanminni/jpr-moveis-rusticos-clean/videos
cp "Ultima versaoJPR.mov" /Users/juanminni/jpr-moveis-rusticos-clean/videos/
```

Depois atualize o HTML:
```html
<source src="videos/Ultima versaoJPR.mov" type="video/quicktime">
<source src="videos/Ultima versaoJPR.mp4" type="video/mp4">
```

## Criar Thumbnail do Vídeo (Opcional)

Para melhorar o carregamento, crie uma imagem de thumbnail:

```bash
# Com ffmpeg
ffmpeg -i "Ultima versaoJPR.mov" -ss 00:00:02 -vframes 1 images/video-thumbnail.jpg
```

## Compressão do Vídeo (Recomendado)

Para web, é recomendado comprimir o vídeo:

```bash
# Compressão para web (mantém qualidade razoável)
ffmpeg -i "Ultima versaoJPR.mov" \
  -c:v libx264 -crf 23 -preset medium \
  -c:a aac -b:a 128k \
  "Ultima versaoJPR-web.mp4"
```

## ✅ Checklist

- [ ] Vídeo copiado para a pasta do projeto
- [ ] Formato MP4 criado (opcional mas recomendado)
- [ ] Thumbnail criado (opcional)
- [ ] Testado no navegador
- [ ] Testado no mobile
- [ ] Vídeo comprimido para web (se muito grande)

## 📱 Importante para Mobile

O vídeo está configurado com `playsinline` para funcionar bem em dispositivos móveis.
O formato 9:16 (vertical/reels) foi otimizado para visualização mobile.

## 🎨 Design Implementado

A seção do vídeo inclui:
- ✅ Container formato reels (9:16)
- ✅ Botão de play customizado
- ✅ Informações sobre Patrick e a oficina
- ✅ Estatísticas de confiança (15+ anos, 500+ clientes, 5.0⭐)
- ✅ Design responsivo
- ✅ Efeitos hover e animações
- ✅ Gradientes alinhados com a identidade visual

## 🚀 Deploy

Ao fazer deploy no Netlify:
1. Se o vídeo for < 100MB: pode subir direto
2. Se for > 100MB: use Netlify Large Media ou CDN externa
3. Considere ter duas versões: uma para desktop (alta qualidade) e outra para mobile (comprimida)
