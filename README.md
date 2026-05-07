# APNT 2026 · Mapa de Zonas Marítimas e Descarte MARPOL

Projeto da turma APNT 2026 para disponibilização pública de uma ferramenta didática de consulta sobre linhas de base, zonas marítimas brasileiras, Amazônia Azul e regras de descarte por anexo MARPOL.

Desenvolvido por **1ON Renan Fita**.

## Estrutura pública

- `index.html` — landing page para LinkedIn e captura de leads.
- `mapa_descarte_brasil.html` — ferramenta interativa principal.
- `download.html` — página de entrega do pacote offline.
- `checklist.html` — checklist pré-descarga imprimível.
- `privacidade.html` — política LGPD resumida.
- `downloads/apnt2026-mapa-descarte-brasil-offline.zip` — pacote offline para bordo.
- `netlify.toml` — configuração de hospedagem Netlify.

URL pública: https://apnt2026-mapa-descarte.netlify.app

## Deploy no Netlify

1. Importar o repositório `renanfita/apnt` no Netlify ou usar o site já publicado.
2. Usar configurações:
   - Build command: `node scripts/build-netlify-site.mjs`
   - Publish directory: `.release-staging/netlify-site`
3. Confirmar que **Form detection** está ativo no Netlify.
4. Verificar em **Forms** se o formulário `lead-download` foi reconhecido.
5. Configurar notificações de formulário para `apnt2026.1@gmail.com`.

## Uso offline

Baixar e extrair:

`downloads/apnt2026-mapa-descarte-brasil-offline.zip`

Depois abrir `mapa_descarte_brasil.html` no navegador.

## Aviso operacional

Material didático. A decisão de bordo deve conferir legislação vigente, carta náutica/ENC DHN, posição real, regras locais de porto/fundeadouro, áreas sensíveis, planos do navio, registros aplicáveis e ordens da companhia.
