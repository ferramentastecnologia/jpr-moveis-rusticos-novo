# 📹 Como Baixar o Vídeo do YouTube e Adicionar ao Site

## Vídeo para baixar:
**URL:** https://www.youtube.com/watch?v=FiA5uLvD-Ag

## 🔧 Opção 1: Usar Site Online (Mais Fácil)

### Sites confiáveis para download:
1. **Y2Mate** - https://y2mate.com
2. **SaveFrom.net** - https://savefrom.net
3. **SnapDownloader** - https://snapdownloader.com

### Passos:
1. Abra um dos sites acima
2. Cole o link: `https://www.youtube.com/watch?v=FiA5uLvD-Ag`
3. Escolha qualidade **1080p MP4** (se disponível, senão 720p)
4. Clique em Download
5. Salve o arquivo como `video-fabricacao.mp4`
6. Mova o arquivo para: `/Users/juanminni/jpr-moveis-rusticos-clean/`

## 🔧 Opção 2: Instalar yt-dlp (Melhor Qualidade)

### No Mac (usando Homebrew):
```bash
# Instalar Homebrew (se não tiver)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar yt-dlp
brew install yt-dlp

# Baixar o vídeo (navegue até a pasta do projeto)
cd /Users/juanminni/jpr-moveis-rusticos-clean/

# Baixar em MP4 (melhor qualidade até 1080p)
yt-dlp -f "bestvideo[ext=mp4][height<=1080]+bestaudio[ext=m4a]/best[ext=mp4]" \
  -o "video-fabricacao.mp4" \
  https://www.youtube.com/watch?v=FiA5uLvD-Ag
```

### Comando alternativo (mais simples):
```bash
cd /Users/juanminni/jpr-moveis-rusticos-clean/
yt-dlp -f "best[ext=mp4]" -o "video-fabricacao.mp4" https://www.youtube.com/watch?v=FiA5uLvD-Ag
```

## 🔧 Opção 3: Aplicativo Desktop

### 4K Video Downloader (Gratuito)
1. Baixe em: https://www.4kdownload.com/pt-br/products/videodownloader
2. Instale o aplicativo
3. Cole o link do YouTube
4. Escolha MP4, qualidade 1080p ou 720p
5. Baixe e salve como `video-fabricacao.mp4`
6. Mova para a pasta do projeto

## ⚙️ Opção 4: Converter para Web (Recomendado)

Se o vídeo ficar muito grande, comprima para web:

### Usando FFmpeg:
```bash
# Instalar FFmpeg
brew install ffmpeg

# Comprimir vídeo para web (mantém boa qualidade)
ffmpeg -i video-fabricacao.mp4 \
  -c:v libx264 -crf 28 -preset fast \
  -c:a aac -b:a 128k \
  video-fabricacao-web.mp4

# Depois renomeie
mv video-fabricacao-web.mp4 video-fabricacao.mp4
```

## 📋 Checklist Final

- [ ] Vídeo baixado
- [ ] Arquivo salvo como `video-fabricacao.mp4`
- [ ] Arquivo colocado em `/Users/juanminni/jpr-moveis-rusticos-clean/`
- [ ] Tamanho do arquivo < 50MB (ideal) ou < 100MB (aceitável)
- [ ] Testado no navegador abrindo `index-nova.html`

## 🎬 Como Ficará

Depois que você adicionar o vídeo:
- ✅ Player HTML5 nativo com controles
- ✅ Thumbnail do YouTube enquanto carrega
- ✅ Play/Pause, fullscreen, controle de volume
- ✅ Funciona offline
- ✅ Mais rápido que iframe do YouTube
- ✅ Sem bloqueios ou restrições
- ✅ Link alternativo para YouTube caso necessário

## 🚀 Dica de Otimização

Se o vídeo for muito grande para deploy:
1. Faça upload para Cloudinary (gratuito até 25GB)
2. Use a URL do Cloudinary no `<source src="URL_CLOUDINARY">`
3. Ou use Vimeo (melhor privacidade que YouTube)

## ⚠️ Importante

- O vídeo precisa ser público ou você precisa ter direitos sobre ele
- Para produção, considere hospedar em CDN (Cloudinary, Vimeo, Bunny.net)
- Vídeos grandes podem deixar o site lento no Netlify (limite 100MB por arquivo)
