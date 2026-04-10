# Guia de Deploy - Sistema SDMI (Secretaria da Mulher e do Idoso)

Este guia ensina, passo a passo, como fazer o deploy deste sistema (Laravel + React/Inertia + Vite) na **VPS** utilizando o painel **CloudPanel**.

## 📋 Informações do Servidor

| Item               | Valor                                        |
|--------------------|----------------------------------------------|
| **Repositório**    | https://github.com/rayhenrique/sdmi          |
| **VPS IP**         | `72.60.142.2`                                |
| **Domínio**        | `sdmi.kltecnologia.com`                      |
| **Usuário do Site**| `kltecnologia-sdmi`                          |
| **Caminho do Site**| `/home/kltecnologia-sdmi/htdocs/sdmi.kltecnologia.com` |
| **PHP**            | `8.5`                                        |
| **DB Name**        | `secretariamulher`                           |
| **DB User**        | `secretariamulher`                           |
| **DB Host**        | `127.0.0.1`                                  |
| **DB Port**        | `3306`                                       |

---

## Passo 1: Acessar a VPS e o Usuário do Site

```bash
ssh root@72.60.142.2
su - kltecnologia-sdmi
cd htdocs/sdmi.kltecnologia.com
```

---

## Passo 2: Clonar o Repositório

Limpar arquivos padrão do CloudPanel e clonar o projeto:

```bash
rm -rf public
git clone https://github.com/rayhenrique/sdmi.git .
```

> ⚠️ O ponto `.` no final é essencial para clonar na mesma pasta.

---

## Passo 3: Instalar Dependências

### Backend (PHP/Laravel):
```bash
composer install --optimize-autoloader --no-dev
```

### Frontend (React/Vite):
```bash
npm install
npm run build
```

---

## Passo 4: Configurar o Ambiente (.env)

```bash
cp .env.example .env
php artisan key:generate
nano .env
```

Altere os seguintes valores no `.env`:

```env
APP_NAME="SDMI"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://sdmi.kltecnologia.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=secretariamulher
DB_USERNAME=secretariamulher
DB_PASSWORD=1508Cristiane@
```

---

## Passo 5: Banco de Dados (Migrate + Seed)

```bash
php artisan migrate --force
php artisan db:seed --force
```

### 🔑 Credenciais do Administrador Padrão

| Campo  | Valor                    |
|--------|--------------------------|
| E-mail | `admin@secmulher.gov.br` |
| Senha  | `secmulher2026`          |
| Perfil | `Administrador`          |

> ⚠️ **IMPORTANTE:** Altere a senha imediatamente após o primeiro login em produção.

---

## Passo 6: Permissões e Otimização

```bash
chmod -R 775 storage bootstrap/cache
php artisan storage:link
php artisan optimize
php artisan view:cache
```

---

## Pronto! 🎉

Acesse: https://sdmi.kltecnologia.com

---

## 🔄 Atualizações Futuras

Para atualizar o sistema no servidor após novas alterações:

```bash
ssh root@72.60.142.2
su - kltecnologia-sdmi
cd htdocs/sdmi.kltecnologia.com

git pull origin main
composer install --optimize-autoloader --no-dev
npm install
npm run build
php artisan migrate --force
php artisan optimize
php artisan view:cache
```
