# Migração de domínio, transferência de contas e pendências do cliente

## 1. Pendências do cliente — confirmar antes do go-live

| # | Item | Situação | Onde é usado |
|---|------|----------|--------------|
| 1 | **Número de WhatsApp** | ⬜ pendente | CTA, FAB, mensagens contextuais (`src/lib/whatsapp.ts`) |
| 2 | **Nome do fundador** | ⬜ pendente confirmar "Luiz Marques" | Seção História |
| 3 | **Ano de fundação** | ⬜ pendente confirmar "2025" | Seção História |
| 4 | **Endereço completo** | ⬜ só Atibaia-SP disponível — confirmar rua, número e CEP | JSON-LD LocalBusiness (`src/components/seo/LocalBusinessJsonLd.tsx`) |
| 5 | **Horário de atendimento** | ⬜ pendente | JSON-LD `openingHoursSpecification` |
| 6 | **Domínio definitivo** | ⬜ pendente | `NEXT_PUBLIC_SITE_URL` na Vercel, sitemap, canonical, hreflang |
| 7 | **Foto da Bioplugs finalizada** | ⬜ cover atual é obra em andamento | `src/lib/obras.ts` → `mostrarNaHome: false` até substituir |
| 8 | **Verificação do Google Search Console** | ⬜ arquivo presente (`/google365ea41a0bf72660.html`) — verificar após deploy | GSC |

---

## 2. Variáveis de ambiente na Vercel

Configurar antes do primeiro deploy em produção:

```
NEXT_PUBLIC_SITE_URL=https://SEU-DOMINIO.com.br
```

Sem essa variável o site usa `https://carmesim.vitorsantos.dev.br` como fallback (definido em `src/lib/seo.ts`).

---

## 3. Deploy na Vercel

### 3.1 Primeira vez

1. Acesse [vercel.com](https://vercel.com) e faça login.
2. **Add New → Project → Import Git Repository** → selecione `carmesimesquadrias`.
3. Framework: **Next.js** (detectado automaticamente).
4. Adicione a variável `NEXT_PUBLIC_SITE_URL` antes de clicar em Deploy.
5. Clique em **Deploy**.

### 3.2 Deploys seguintes

Cada push em `main` dispara um deploy automático. PRs geram preview URLs automáticas.

---

## 4. Migração de domínio

### 4.1 Registrar o domínio (se ainda não tiver)

Registre no [Registro.br](https://registro.br) ou em outro registrador. Domínios `.com.br` exigem CNPJ ou CPF.

### 4.2 Apontar para a Vercel

Após o domínio registrado:

1. No painel da Vercel: **Project → Settings → Domains → Add**.
2. Digite o domínio (ex.: `carmesim.com.br`).
3. A Vercel mostra os registros DNS a configurar — normalmente:
   - `A` apontando para `76.76.21.21`
   - ou `CNAME` de `www` para `cname.vercel-dns.com`
4. No painel do registrador (Registro.br ou outro), adicione os registros.
5. Aguarde propagação (minutos a 48 h).
6. A Vercel provisiona o certificado TLS automaticamente.

### 4.3 Atualizar `NEXT_PUBLIC_SITE_URL`

Após o domínio ativo:

1. Vercel → Project → **Settings → Environment Variables**.
2. Edite `NEXT_PUBLIC_SITE_URL` para o domínio definitivo.
3. Redeploy (Vercel → Deployments → ⋯ → Redeploy).

---

## 5. Transferência de contas

### 5.1 GitHub

- Repositório atual: `vitorsacz/carmesimesquadrias`
- Para transferir ao cliente: **Settings → Danger Zone → Transfer repository**.
- O cliente precisa ter uma conta GitHub.
- Após a transferência, atualize a URL remota localmente:
  ```bash
  git remote set-url origin https://github.com/NOVO-USUARIO/carmesimesquadrias.git
  ```

### 5.2 Vercel

- Vercel permite transferir projetos entre contas via **Settings → Transfer Project**.
- Alternativa: o cliente cria a conta Vercel, conecta o repositório GitHub transferido e faz novo deploy.

### 5.3 Google Search Console

- Acesse [search.google.com/search-console](https://search.google.com/search-console).
- Adicione a propriedade com o domínio definitivo.
- O arquivo de verificação já está em `public/google365ea41a0bf72660.html` — ficará acessível em `https://SEU-DOMINIO.com.br/google365ea41a0bf72660.html` após o deploy.
- Para passar ao cliente: **Settings → Users and permissions → Add user**.

### 5.4 Vercel Analytics

- Os dados ficam no painel da conta Vercel que fizer o deploy.
- Para que o cliente acesse: convidar em **Team → Members** ou transferir o projeto.

---

## 6. Checklist de go-live

- [ ] Confirmar todos os itens da seção 1
- [ ] `NEXT_PUBLIC_SITE_URL` configurado na Vercel
- [ ] Domínio apontado e certificado TLS ativo
- [ ] Deploy em produção sem erros
- [ ] Verificação do Google Search Console concluída
- [ ] Sitemap submetido no GSC (`/sitemap.xml`)
- [ ] Teste em celular iOS e Android (tema claro e escuro)
- [ ] Testar WhatsApp CTA com número real
