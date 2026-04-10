# PRD — Sistema de Gestão de Atendimentos da Secretaria da Mulher e do Idoso

## 1. Visão Geral do Produto

O produto será uma plataforma web composta por duas áreas:

1. **Área pública**
   - landing page institucional da Secretaria da Mulher e do Idoso
   - informações sobre serviços, contatos e orientações

2. **Área restrita**
   - autenticação
   - dashboard operacional
   - cadastro de pessoas atendidas
   - gestão de casos
   - registro de atendimentos
   - prontuário compartilhado
   - relatórios quantitativos, qualitativos e híbridos

O objetivo do produto é substituir o processo manual baseado em formulário textual e base estatística separada, permitindo que o atendimento e a consolidação gerencial aconteçam dentro de um único sistema.

---

## 2. Objetivos do Produto

### Objetivos principais
- Centralizar o histórico da pessoa atendida
- Permitir atendimento multiprofissional compartilhado
- Padronizar a coleta de dados estatísticos
- Reduzir retrabalho operacional
- Gerar relatórios gerenciais confiáveis
- Acelerar fechamento mensal de produção

### Objetivos secundários
- Melhorar rastreabilidade dos casos
- Facilitar consulta de histórico
- Padronizar classificações de atendimento e violência
- Dar mais visibilidade para o volume e perfil dos atendimentos da secretaria

---

## 3. Escopo Funcional do Produto

O sistema será organizado nos seguintes módulos:

1. Landing Page Institucional
2. Autenticação e Controle de Acesso
3. Gestão de Usuários
4. Cadastro de Pessoas Atendidas
5. Gestão de Casos
6. Registro de Atendimentos / Prontuário
7. Dashboard
8. Relatórios

---

## 4. Personas

### 4.1 Administrador
**Perfil:** responsável pela operação do sistema e gestão de acessos.

**Objetivos:**
- criar, editar, ativar e desativar usuários
- configurar listas e opções padronizadas
- acompanhar uso do sistema
- apoiar a gestão com dados consolidados

**Dores:**
- falta de controle centralizado
- risco de usuários desatualizados
- retrabalho na consolidação de dados

---

### 4.2 Recepção
**Perfil:** porta de entrada do atendimento.

**Objetivos:**
- cadastrar a pessoa atendida
- localizar cadastros existentes
- evitar duplicidade
- abrir ou encaminhar o caso para atendimento

**Dores:**
- repetição de cadastro
- informações incompletas
- dificuldade de localizar histórico anterior

---

### 4.3 Psicólogo
**Perfil:** profissional técnico que registra atendimento psicológico e acompanha evolução do caso.

**Objetivos:**
- acessar histórico anterior
- registrar evolução
- visualizar contexto completo do caso
- apoiar continuidade do acompanhamento

**Dores:**
- falta de histórico consolidado
- informações espalhadas
- perda de contexto entre atendimentos

---

### 4.4 Advogado
**Perfil:** profissional técnico responsável por orientação jurídica e encaminhamentos legais.

**Objetivos:**
- consultar contexto do caso
- registrar atendimento jurídico
- acompanhar situação da pessoa atendida
- contribuir para evolução conjunta

**Dores:**
- ausência de linha do tempo
- dificuldade de cruzar atendimento com situação do caso

---

### 4.5 Assistente Social
**Perfil:** profissional técnico responsável por acolhimento, encaminhamentos e acompanhamento social.

**Objetivos:**
- registrar evolução social
- consultar histórico compartilhado
- acompanhar encaminhamentos para rede
- atualizar situação do caso

**Dores:**
- baixa padronização de dados
- consolidação manual de informações
- dificuldade de medir produção

---

### 4.6 Gestão
**Perfil:** coordenação que consome relatórios e indicadores.

**Objetivos:**
- visualizar produção
- acompanhar perfil da demanda
- gerar relatórios quantitativos e qualitativos
- monitorar evolução por período

**Dores:**
- dependência de planilhas manuais
- inconsistência estatística
- demora no fechamento gerencial

---

## 5. User Stories

### Cadastro e acesso
- Como **Administrador**, quero criar usuários e definir perfis para controlar quem acessa o sistema.
- Como **Recepção**, quero localizar rapidamente uma pessoa já cadastrada para evitar duplicidade.
- Como **Recepção**, quero cadastrar uma nova pessoa atendida de forma padronizada para que os profissionais possam iniciar o acompanhamento.

### Gestão de caso
- Como **Profissional**, quero abrir ou atualizar um caso para acompanhar a situação ao longo do tempo.
- Como **Profissional**, quero atualizar o status do caso para refletir sua etapa atual.
- Como **Profissional**, quero registrar origem do encaminhamento e encaminhamentos realizados para manter rastreabilidade.

### Atendimento e prontuário
- Como **Psicólogo**, quero registrar evolução de atendimento para manter continuidade clínica e institucional.
- Como **Advogado**, quero registrar orientação e ações jurídicas para que a equipe veja o andamento do caso.
- Como **Assistente Social**, quero registrar encaminhamentos sociais e observações para apoiar a rede de proteção.
- Como **Profissional**, quero ver a linha do tempo completa do caso para não repetir coleta de contexto.

### Relatórios
- Como **Gestão**, quero gerar relatórios quantitativos por período para acompanhar volume e perfil da demanda.
- Como **Gestão**, quero gerar relatórios qualitativos por caso e por período para acompanhar conteúdo e evolução dos atendimentos.
- Como **Gestão**, quero consolidar produção por profissional para prestação de contas e gestão interna.
- Como **Gestão**, quero visualizar série histórica para comparar comportamento da demanda ao longo do tempo.

---

## 6. Requisitos Funcionais

### 6.1 Landing Page Institucional
O sistema deve disponibilizar uma área pública com:
- apresentação da secretaria
- missão institucional
- serviços oferecidos
- canais de contato
- orientações básicas
- CTA para contatos e ajuda
- acesso restrito ao login do sistema

**Requisitos:**
- página inicial institucional
- seção de serviços
- seção de contatos
- seção de orientação/emergência
- rodapé com link de acesso restrito

---

### 6.2 Autenticação e Controle de Acesso
O sistema deve permitir acesso apenas para usuários previamente cadastrados.

**Requisitos:**
- login com e-mail e senha
- logout
- recuperação/redefinição de senha
- proteção de rotas privadas
- redirecionamento por autenticação
- bloqueio de área restrita para usuários não autenticados

---

### 6.3 Gestão de Usuários
Apenas o perfil Administrador poderá gerenciar usuários.

**Requisitos:**
- criar usuário
- editar usuário
- ativar/desativar usuário
- definir perfil de acesso
- listar usuários
- filtrar usuários por perfil e status

**Perfis suportados:**
- Administrador
- Recepção
- Psicólogo
- Advogado
- Assistente Social

---

### 6.4 Cadastro da Pessoa Atendida
O sistema deve permitir cadastro único da pessoa atendida.

**Campos mínimos:**
- nome completo
- data de nascimento
- CPF
- telefone/WhatsApp
- endereço
- bairro
- cidade
- UBS
- público atendido:
  - mulher
  - idoso
  - ambos
- gênero
- identidade de gênero
- orientação sexual
- cor/raça
- escolaridade
- número de filhos
- condição de trabalho
- renda
- estado civil

**Regras:**
- o sistema deve permitir cadastro sem CPF
- o sistema deve alertar sobre possíveis duplicidades por nome + data de nascimento + telefone
- o cadastro deve poder ser editado
- a pessoa pode ter múltiplos casos e múltiplos atendimentos ao longo do tempo

---

### 6.5 Gestão de Casos
O sistema deve separar a entidade “caso” da entidade “pessoa”.

**Campos mínimos do caso:**
- pessoa vinculada
- data de abertura
- status do caso
- origem do encaminhamento
- possui medida protetiva
- possui registro de IML
- tipos de violência
- relação com agressor
- tempo de convivência
- interesse em curso profissionalizante
- área de interesse do curso
- observações iniciais

**Status suportados:**
- novo
- em acompanhamento
- encaminhado
- aguardando retorno
- encerrado
- arquivado

**Regras:**
- um caso deve pertencer a uma pessoa atendida
- um caso pode ter vários atendimentos
- o status do caso deve ser atualizado ao longo do fluxo
- um caso encerrado não deve aceitar novos atendimentos sem reabertura, se essa regra for ativada em configuração futura

---

### 6.6 Registro de Atendimentos / Prontuário
O sistema deve permitir registrar atendimentos vinculados a um caso.

**Campos mínimos do atendimento:**
- data e hora
- profissional responsável
- tipo de atendimento:
  - psicológico
  - jurídico
  - social
- relato do atendimento
- evolução
- encaminhamento realizado
- observações complementares
- status do caso após atendimento

**Regras:**
- todos os profissionais autorizados devem visualizar o histórico completo
- os atendimentos devem ser exibidos em ordem cronológica
- cada atendimento deve registrar autor e data
- o prontuário deve permitir busca por período, profissional e tipo de atendimento

---

### 6.7 Classificações Estatísticas
O sistema deve suportar classificação estruturada para alimentar relatórios quantitativos.

**Dimensões estatísticas mínimas:**
- faixa etária
- bairro/região
- escolaridade
- filhos
- condição de trabalho
- renda
- tipo de violência
- estado civil
- tempo de convivência
- relação com agressor
- origem do encaminhamento
- encaminhamento para rede
- medida protetiva
- IML
- cor/raça
- identidade de gênero
- orientação sexual
- profissional
- tipo de atendimento
- status do caso
- período

**Regras:**
- listas devem ser padronizadas
- sempre que possível, usar select, combobox, radio ou checkbox em vez de texto livre
- campos categóricos devem ser reaproveitados nos relatórios
- sistema deve permitir múltipla seleção em tipos de violência

---

### 6.8 Dashboard
O sistema deve exibir um dashboard operacional inicial para usuários autenticados.

**Indicadores mínimos:**
- total de atendimentos no mês
- total de casos novos no mês
- casos em acompanhamento
- casos aguardando retorno
- casos encerrados
- distribuição por profissional
- distribuição por tipo de atendimento

**Funcionalidades:**
- filtros por período
- visão resumida por cards
- acesso rápido para relatórios
- acesso rápido para novos cadastros e busca

---

### 6.9 Relatórios
O sistema deve gerar relatórios em três categorias.

#### A. Relatórios Quantitativos
- atendimentos por mês
- atendimentos por profissional
- atendimentos por bairro/região
- atendimentos por tipo de violência
- atendimentos por origem do encaminhamento
- atendimentos por faixa etária
- atendimentos por gênero
- atendimentos por identidade de gênero
- atendimentos por orientação sexual
- atendimentos por cor/raça
- atendimentos por status do caso
- resumo de produção
- produção consolidada
- série histórica por período

#### B. Relatórios Qualitativos
- relatório analítico por pessoa atendida
- relatório analítico por caso
- histórico cronológico do caso
- consolidado narrativo por período
- resumo descritivo por profissional

#### C. Relatórios Híbridos
- panorama mensal com totais e síntese textual
- produção por profissional com volume e resumo
- casos por status com observações consolidadas

**Funcionalidades dos relatórios:**
- filtros por período
- filtros por profissional
- filtros por status
- filtros por bairro/região
- filtros por tipo de violência
- filtros por origem do encaminhamento
- visualização em tela
- exportação em formato tabular
- retrocompatibilidade com base estatística histórica

---

## 7. Critérios de Aceitação por Feature

### Landing Page
- deve carregar em rota pública
- deve apresentar serviços da secretaria
- deve conter acesso restrito ao login

### Autenticação
- usuário não autenticado não acessa área interna
- usuário autenticado acessa dashboard
- senha pode ser redefinida com fluxo seguro

### Gestão de Usuários
- apenas administrador vê módulo de usuários
- administrador pode criar e desativar contas

### Cadastro da Pessoa
- recepção consegue criar cadastro completo
- sistema alerta possíveis duplicidades
- pessoa cadastrada pode ser localizada por nome, CPF ou telefone

### Caso
- caso é vinculado a uma pessoa
- caso possui status obrigatório
- caso aceita atualizações ao longo do acompanhamento

### Atendimento
- atendimento fica vinculado a um caso
- histórico aparece em ordem cronológica
- todos os profissionais autorizados enxergam o histórico

### Relatórios
- filtros retornam dados coerentes com os registros
- relatórios quantitativos agrupam corretamente os campos estruturados
- relatórios qualitativos exibem conteúdo narrativo por período/caso
- relatórios híbridos combinam contagem e síntese sem perda de contexto

---

## 8. Requisitos Não Funcionais

### Performance
- páginas principais devem carregar rapidamente em ambiente institucional
- busca de pessoa e histórico deve responder em até 2 segundos em volume inicial esperado
- listagens devem suportar paginação e filtros

### Segurança
- rotas privadas protegidas
- senhas armazenadas com hash seguro
- registro de autoria e data dos atendimentos
- acesso baseado em perfil
- proteção contra acesso não autorizado a dados sensíveis

### Usabilidade
- interface simples e objetiva
- foco em operação de desktop
- responsividade suficiente para tablets
- formulários com baixo esforço de preenchimento
- uso de componentes consistentes

### Integridade de Dados
- evitar duplicidade de cadastro
- padronizar campos categóricos
- preservar histórico de atendimento
- manter coerência entre pessoa, caso e atendimento

### Auditoria mínima
- guardar usuário criador e atualizador de registros críticos
- registrar data/hora de criação e atualização

---

## 9. Integrações Necessárias

### MVP
- sem integrações externas obrigatórias

### Estrutura técnica prevista
- backend: Laravel 13.x
- banco de dados: MySQL
- arquitetura: client-side first
- UI base: shadcn/ui

### Futuro
- exportação avançada
- integração com outros órgãos
- notificações
- armazenamento de anexos

---

## 10. Casos de Borda e Edge Cases

- pessoa sem CPF
- pessoa com nome semelhante a cadastro já existente
- pessoa atendida como mulher, idoso ou ambos
- caso sem violência doméstica confirmada
- múltiplos tipos de violência no mesmo caso
- múltiplos atendimentos do mesmo caso no mesmo mês
- mudança de status ao longo do tempo
- profissional registrar atendimento em caso antigo
- registro com campos estatísticos incompletos
- necessidade de manter dados compatíveis com relatórios históricos
- pessoa com mais de um ciclo de acompanhamento ao longo do tempo

---

## 11. Estrutura Conceitual de Dados

### Pessoa Atendida
dados cadastrais e sociodemográficos permanentes ou semi-estáveis

### Caso
contexto principal do acompanhamento, classificação da demanda e status

### Atendimento
cada interação profissional registrada no prontuário

### Classificações Estatísticas
campos usados para agrupamentos, contagens e consolidação gerencial

---

## 12. Fora do Escopo do MVP

- anexos de documentos
- assinatura digital
- agenda avançada
- notificações automáticas
- permissões granulares por campo
- notas privadas por especialidade
- integração com polícia, saúde, assistência ou judiciário
- triagem pública online
- BI avançado fora do módulo de relatórios essenciais