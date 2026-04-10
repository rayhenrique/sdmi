# Secretaria da Mulher e do Idoso - Sistema de Gestão

Este é o **Sistema de Gestão de Atendimentos** desenvolvido para a Secretaria Municipal da Mulher e do Idoso de Teotônio Vilela - AL. 
Foi construído utilizando as modernas tecnologias do ecossistema Laravel e React.

## 🛠 Tecnologias Utilizadas

- **Backend:** Laravel 12.x (PHP 8.2+)
- **Frontend:** React 18, @inertiajs/react, Tailwind CSS
- **Banco de Dados:** MySQL/MariaDB
- **Autenticação e Permissões:** Laravel Breeze, Middlewares Customizados
- **Build Tool:** Vite

## 🚀 Como Executar Localmente

Siga o passo a passo abaixo para rodar o projeto em seu ambiente local de desenvolvimento corporativo.

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd secmulher
   ```

2. **Instale as dependências do PHP e Node:**
   ```bash
   composer install
   npm install
   ```

3. **Configure o ambiente:**
   Copie o arquivo `.env.example` e renomeie para `.env`. Configure os dados de acesso do seu banco local.
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Prepare o Banco de Dados:**
   ```bash
   php artisan migrate:fresh --seed
   ```
   > Observação: O comando `--seed` já irá criar os Perfis, os Tipos de Violência Mapeados, Populações Iniciais e um **Usuário Administrativo Padrão**.

5. **Inicie os Servidores de Desenvolvimento:**
   Em um terminal, inicie o backend:
   ```bash
   php artisan serve
   ```
   Em outro terminal paralelo, inicie o Vite HMR para o frontend:
   ```bash
   npm run dev
   ```

O painel estará disponível em `http://localhost:8000`.

## 🔒 Acesso do Administrador Padrão

Estes são os dados criados automaticamente pelo `AdminUserSeeder` ao rodar `php artisan migrate --seed`.

> ⚠️ **IMPORTANTE:** Altere a senha imediatamente após o primeiro acesso em produção!

| Campo  | Valor                       |
|--------|-----------------------------|
| E-mail | `admin@secmulher.gov.br`    |
| Senha  | `secmulher2026`             |
| Perfil | `Administrador`             |

## 📦 Deploy
Para instruções detalhadas de como colocar o sistema no ar (Produção) servidor VPS Hostinger usando o painel **CloudPanel**, consulte o nosso guia exclusivo.

Leia o guia: 👉 [Instruções de Deploy (DEPLOY.md)](./DEPLOY.md)

---
*Desenvolvido em Teotônio Vilela - AL.*
