# Design Guidelines — Sistema da Secretaria da Mulher e do Idoso

## 1. Direção Visual

### Estilo
- clean
- moderno
- institucional
- acolhedor
- light mode only

### Referências
- Linear
- Vercel
- Resend
- interfaces governamentais modernas e limpas

### Princípios
- clareza antes de ornamentação
- leitura rápida
- baixo ruído visual
- contraste suficiente
- foco em operação de desktop

---

## 2. Paleta de Cores Sugerida

### Base
- Background principal: `#F8FAFC`
- Surface/card: `#FFFFFF`
- Border: `#E2E8F0`
- Text principal: `#0F172A`
- Text secundário: `#475569`

### Primária institucional
- Primary: `#1D4ED8`
- Primary hover: `#1E40AF`
- Primary soft: `#DBEAFE`

### Apoio/neutralidade
- Slate 100 equivalente: `#F1F5F9`
- Slate 200 equivalente: `#E2E8F0`
- Slate 500 equivalente: `#64748B`
- Slate 700 equivalente: `#334155`

### Estados
- Success: `#16A34A`
- Warning: `#D97706`
- Destructive: `#DC2626`
- Info: `#0EA5E9`

### Uso recomendado
- azul institucional para ações principais e navegação
- neutros claros para superfícies
- vermelho apenas para alertas, emergência e ações destrutivas
- verde para confirmação e sucesso de salvamento

---

## 3. Tipografia

### Fonte principal
- `Inter` como primeira opção
- fallback com system font stack

### Hierarquia sugerida
- H1: 32px / 700
- H2: 24px / 700
- H3: 20px / 600
- H4: 18px / 600
- Body: 14px ou 16px / 400
- Small: 12px / 400
- Label: 12px ou 14px / 500

### Regras
- títulos curtos
- corpo de texto com alta legibilidade
- evitar blocos muito densos
- usar peso 600 para títulos de cards e seções

---

## 4. Espaçamento

### Escala base
Sistema de 8px

### Tokens sugeridos
- 4px para microajustes
- 8px para espaçamento interno mínimo
- 12px para agrupamentos curtos
- 16px para espaçamento padrão
- 24px para separação de blocos
- 32px para seções de card complexas
- 48px a 64px para seções de página

### Regras
- formulários devem respirar
- evitar campos colados
- dashboards devem priorizar alinhamento em grid

---

## 5. Border Radius

- inputs e botões: 8px
- cards: 12px a 16px
- modais: 16px
- badges: 999px se pill

### Regra
Formal, mas não rígido. Bordas suaves, sem exagero.

---

## 6. Sombras

### Uso
- muito sutil
- preferência por borda + contraste de superfície
- sombra apenas em cards destacados, dropdowns e modais

### Sugestão visual
- sombras leves equivalentes a `shadow-sm` e `shadow-md`

### Regra
Não usar sombras pesadas no sistema interno.

---

## 7. Diretrizes de Layout

### Landing page
- blocos largos
- duas colunas em hero e seções institucionais
- grids simples para serviços
- CTA bem visível, mas institucional

### Sistema interno
- sidebar ou topbar limpa
- conteúdo principal com largura confortável
- cards de resumo no dashboard
- formulários em seções bem segmentadas
- histórico em timeline

### Densidade
- média
- suficiente para uso em repartição sem poluir a interface

---

## 8. Diretrizes de uso do shadcn/ui

### Componentes recomendados

#### Navegação
- `Sidebar`
- `Breadcrumb`
- `Tabs`
- `DropdownMenu`

#### Formulários
- `Form`
- `Input`
- `Textarea`
- `Select`
- `Combobox`
- `RadioGroup`
- `Checkbox`
- `Date Picker`
- `Dialog`

#### Dados
- `Table` / `DataTable`
- `Badge`
- `Card`
- `Accordion`
- `Tooltip`

#### Feedback
- `Toast`
- `Alert`
- `Skeleton`
- `Empty State`

### Regras de uso
- usar `Select` para categorias fechadas
- usar `Combobox` para listas longas, como bairro ou profissão
- usar `Checkbox` para múltiplos tipos de violência
- usar `Tabs` para organizar seções da tela, não para quebrar fluxo de preenchimento de forma confusa
- usar `Textarea` para relato e evolução
- usar `Badge` para status do caso

---

## 9. Diretrizes específicas por tela

### Login
- tela limpa
- foco total no formulário
- branding institucional discreto
- sem distrações

### Dashboard
- cards resumo no topo
- filtros visíveis
- atalhos rápidos
- tabela ou lista recente logo abaixo

### Cadastro da pessoa
- dividir em blocos:
  - identificação
  - contato
  - endereço
  - perfil socioeconômico
  - recortes demográficos

### Caso
- bloco próprio com:
  - origem
  - status
  - violência
  - relação com agressor
  - encaminhamentos

### Prontuário
- timeline cronológica
- identificação clara do profissional
- data/hora visível
- diferenciação por tipo de atendimento

### Relatórios
- filtros no topo
- visão resumo primeiro
- tabela detalhada depois
- opção de exportação em destaque secundário

---

## 10. Acessibilidade e usabilidade

- contraste adequado entre texto e fundo
- labels sempre visíveis
- mensagens de erro claras
- foco visível em inputs
- áreas clicáveis confortáveis
- navegação previsível
- não depender apenas de cor para status

---

## 11. Regras de consistência

- mesma nomenclatura em todo o sistema
- usar “Pessoa Atendida” ou “Assistido(a)” em vez de “Paciente”
- status sempre com a mesma taxonomia
- tipos de violência sempre padronizados
- mesma estrutura visual para formulários, filtros e tabelas