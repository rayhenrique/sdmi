# Guia de Deploy - Sistema de Gestão (SecMulher)

Este guia ensina, passo a passo, como fazer o deploy deste sistema (Laravel 11 + React/Inertia + Vite) em uma **VPS da Hostinger** utilizando o painel de controle **CloudPanel**.

## 🎯 Pré-requisitos
1. Uma **VPS Hostinger** com sistema operacional **Ubuntu 22.04 LTS (ou superior)**.
2. O painel **CloudPanel** instalado na VPS.
3. Um **domínio ou subdomínio** apontado para o IP da sua VPS (Ex: `secmulher.teotoniovilela.al.gov.br`).
4. Acesso ao repositório Git onde este projeto está hospedado.

---

## Passo 1: Preparar o CloudPanel

1. Acesse o CloudPanel pelo navegador: `https://<IP-DA-SUA-VPS>:8443`.
2. Faça login com suas credenciais de administrador.
3. No menu lateral, vá em **Sites** e clique em **Add Site**.
4. Selecione a opção **Create a PHP Site**.
5. Preencha as informações:
   - **Domain Name:** O seu subdomínio/domínio (ex: `secmulher.teotoniovilela.al.gov.br`).
   - **PHP Version:** Escolha `PHP 8.2` ou `PHP 8.3`.
   - **Vhost Template:** Escolha o template `Laravel`. *(Isso já garantirá que o Nginx aponte corretamente para a pasta `/public`)*.
   - **Site User:** Preencha um usuário (ex: `secmulher`).
   - **Site User Password:** Crie uma senha segura (guarde-a).
6. Clique em **Create**.

---

## Passo 2: Criar o Banco de Dados

1. Ainda no CloudPanel, dentro da tela do site recém-criado, clique na aba **Databases**.
2. Clique em **Add Database**.
3. Preencha os campos e crie:
   - **Database Name:** `secmulher_db`
   - **Database User:** `secmulher_user`
   - **Database Password:** Gere uma senha forte (anote-a!).
4. Clique em **Add Database**.

---

## Passo 3: Fechar SSL (HTTPS)

1. No CloudPanel, no seu site, vá para a aba **SSL/TLS**.
2. Clique em **New Let's Encrypt Certificate**.
3. Verifique se o subdomínio está correto e clique em **Create e Install**.
   *Importante: Só funcionará se o DNS já estiver apontando para a VPS.*

---

## Passo 4: Fazer Login Via SSH e Clonar o Código

Agora você precisará acessar a máquina pelo terminal para rodar o código. Nós usaremos o *usuário do site* (criado no passo 1) por segurança, não o `root`.

1. Conecte-se na VPS via SSH usando o **Site User**:
   ```bash
   ssh secmulher@<IP-DA-SUA-VPS>
   ```
2. Após logar, entre na pasta raiz do site:
   ```bash
   cd htdocs/secmulher.teotoniovilela.al.gov.br
   ```
   *(Substitua o domínio pela pasta correta que o CloudPanel criou).*
3. Apague os arquivos padrão que o CloudPanel criou dentro dessa pasta:
   ```bash
   rm -rf *
   rm -rf .*
   ```
4. Clone o seu repositório Git (substitua pela sua URL):
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO> .
   ```
   *(O ponto `.` no final é essencial para clonar na mesma pasta).*

---

## Passo 5: Instalar Dependências (Backend e Frontend)

Dentro da pasta do projeto via SSH, rode os seguintes comandos:

1. **Dependências do Laravel (PHP):**
   ```bash
   composer install --optimize-autoloader --no-dev
   ```

2. **Gerar o arquivo de ambiente (.env):**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Edite o `.env`** (`nano .env`) e altere o acesso ao banco e URL:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://secmulher.teotoniovilela.al.gov.br

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=secmulher_db
   DB_USERNAME=secmulher_user
   DB_PASSWORD=senha_criada_no_passo_2
   ```

4. **Dependências Frontend (React/Vite):**
   Como é uma VPS com permissões, você precisa instalar o Node/NPM. Se sua VPS já tiver, basta rodar:
   ```bash
   npm install
   npm run build
   ```
   *(O comando `npm run build` vai compilar os arquivos JS e CSS minificados na pasta `public/build` para produção. O Vite não ficará rodando no servidor, apenas servindo o bundle compilado).*

---

## Passo 6: Banco de Dados Padrão (Migrate)

Por fim, execute no SSH as migrations e cadastre o administrador padrão.

```bash
php artisan migrate --force
php artisan db:seed --force
```

*(O `--force` é necessário pois o sistema identifica que você está no ambiente de Produção e pede confirmação extra).*

### 🔑 Credenciais do Administrador Padrão

Após rodar o seed, o sistema cria automaticamente um usuário administrador:

| Campo  | Valor                    |
|--------|--------------------------|
| E-mail | `admin@secmulher.gov.br` |
| Senha  | `secmulher2026`          |
| Perfil | `Administrador`          |

> ⚠️ **IMPORTANTE:** Acesse o sistema e **altere a senha imediatamente** após o primeiro login em produção. Vá em: *Usuários → Editar seu perfil → Alterar senha*.

---

## Passo 7: Permissões de Pastas e Otimização Laravel

Garantir que as pastas de Cache, Storage e Logs tenham a permissão de escrita correta:

```bash
chmod -R 775 storage bootstrap/cache
```

E otimize o Laravel para melhorar a performance em produção carregando TUDO no cache rapidamente:

```bash
php artisan optimize
php artisan view:cache
```

---

## Pronto! 🎉

Acesse `https://secmulher.teotoniovilela.al.gov.br`. O sistema deve estar rodando de forma fluida e veloz.

### 🔄 Dica: Atualizações Futuras
Quando você programar algo novo e quiser "atualizar o sistema no servidor", não precisa configurar tudo isso novamente. Basta rodar do terminal da VPS:

```bash
git pull origin main
composer install --optimize-autoloader --no-dev
npm install
npm run build
php artisan migrate --force
php artisan optimize
```
