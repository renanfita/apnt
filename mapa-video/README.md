# Tutorial em vídeo — APNT 2026 · Sistema de Descarte no Mar

Projeto Remotion (React) que gera o tutorial em vídeo em **1920×1080 a 30 fps · ~112 segundos (≤2 min)**, alinhado à identidade do mapa interativo: navy escuro `#07111f`, accent dourado `#d7b45a` (CIAGA / APNT 2026).

Desenvolvido por **1ON Renan Fita** — APNT 2026 · Capitão de Cabotagem · Marinha Mercante.

> Nota operacional: este vídeo é material didático. A decisão de bordo deve conferir a posição real, cartas náuticas/DHN, legislação vigente, certificados, planos do navio, regras de porto/fundeadouro e ordens da companhia.

## Pré-requisitos

- Node.js 18+
- ffmpeg (Remotion baixa automaticamente, se necessário)
- **NÃO** rodar dentro de uma pasta sincronizada por OneDrive/Dropbox/iCloud

## Instalação

Abra o PowerShell **dentro desta pasta** e rode:

```
npm install
npm start          # preview ao vivo no Remotion Studio
npm run render     # gera out/tutorial.mp4
```

## 11 Cenas (~112s · 3.350 frames a 30 fps)

| # | Cena | Duração | Conteúdo |
|---|---|---|---|
| 1 | `VideoIntro` | 8.2 s | Logo APNT 2026 (vídeo MP4) |
| 2 | `Intro` | 5.0 s | Título · "Sistema de Descarte no Mar" + autor |
| 3 | `AmazoniaAzul` | 12.0 s | 5,7 Mkm² + 5 componentes da AJB |
| 4 | `LinhasDeBase` | 11.0 s | Decreto 8.400/2015 + 101 pontos LBR plotados + LBN/DHN |
| 5 | `ZonasMaritimas` | 14.0 s | 12 / 24 / 200 mn + PCE como leito/subsolo |
| 6 | `MarpolAnnexes` | 16.0 s | Grid 3×2 dos seis anexos com regras por resíduo |
| 7 | `HowToUse` | 10.0 s | Mock interativo + "Posição do Navio" |
| 8 | **`ExemploSantos`** | 10.0 s | Petroleiro saindo do Porto de Santos · Anexo I |
| 9 | **`ExemploBuzios`** | 10.0 s | Cruzeiro em Búzios · Anexo IV (esgoto) |
| 10 | **`ExemploBaciaSantos`** | 10.0 s | FPSO offshore na ZEE/Plataforma Continental · Lei 9.966 |
| 11 | `Outro` | 5.5 s | Banner Marinha + créditos |

### Casos de uso reais (cenas 8–10)

Cada caso mostra:
- **Posição real** (lat/lon em graus-minutos, formato MARPOL/cartas náuticas)
- **Mapa esquemático** com bandas de zona aproximadas para a região
- **Zona identificada** com cor codificada
- **Anexo MARPOL aplicável** com regras PROIBIDO/CONDICIONAL/PERMITIDO
- **Observação operacional** (livro de registros, planos PEI/SOPEP, CONAMA)

| Caso | Posição | Zona | Anexo | Regra-chave |
|---|---|---|---|---|
| Porto de Santos | 23°59'S 46°18'W | Mar Territorial | I | porão de máquinas só ≤15 ppm; carga/lastro sujo <50 mn proibidos |
| Búzios | 22°47'S 41°50'W | Mar Territorial | IV | 3–12 mn: esgoto triturado e desinfetado |
| Pré-sal Santos | 25°32'S 43°02'W | ZEE / Plataforma Continental | I + offshore | operação condicionada à licença ambiental/CONAMA vigente |

## Customização rápida

| Quero ajustar | Arquivo |
|---|---|
| Paleta global | `src/theme.ts` |
| Duração total / cenas | `src/Tutorial.tsx` (array `SCENES`) |
| Texto/regras dos casos | `src/scenes/Exemplo*.tsx` (objeto `data`) |
| Texto MARPOL geral | `src/scenes/MarpolAnnexes.tsx` (`ANNEXES`) |
| Coordenadas de demo (HowToUse) | `src/scenes/HowToUse.tsx` |
| Linha de base | `src/baseline.ts` |

## Estrutura

```
mapa-video/
├── package.json · tsconfig.json · remotion.config.ts
├── public/
│   └── assets/
│       ├── apnt-2026-logo.jpeg
│       ├── apnt-2026-badge.png
│       ├── apnt-2026-marinha-banner.png
│       └── intro-apnt.mp4              ← intro institucional
├── src/
│   ├── index.ts · Root.tsx · Tutorial.tsx · theme.ts · baseline.ts
│   ├── components/
│   │   ├── BrandCard.tsx · BrazilMap.tsx · Caption.tsx
│   │   ├── ProgressBar.tsx · TopWordmark.tsx
│   │   └── RealExample.tsx           ← componente compartilhado dos casos
│   └── scenes/
│       ├── VideoIntro.tsx            ← reproduz intro-apnt.mp4
│       ├── Intro.tsx · AmazoniaAzul.tsx · LinhasDeBase.tsx
│       ├── ZonasMaritimas.tsx · MarpolAnnexes.tsx · HowToUse.tsx
│       ├── ExemploSantos.tsx         ← Caso 1 (Anexo I)
│       ├── ExemploBuzios.tsx         ← Caso 2 (Anexo IV)
│       ├── ExemploBaciaSantos.tsx    ← Caso 3 (PCE)
│       └── Outro.tsx
└── README.md
```

## Notas técnicas

- A `VideoIntro` reproduz o MP4 anexo (720×720, 8.1s, 24fps) — Remotion reamostra automaticamente para os 30fps da composição.
- Os mapas dos casos de uso são SVGs esquemáticos otimizados para legibilidade; a precisão geodésica fica no mapa interativo HTML.
- `RealExample.tsx` é um componente reutilizável: para adicionar um quarto caso, basta criar um novo arquivo `Exemplo*.tsx` que passe um objeto `RealExampleData` para ele.
