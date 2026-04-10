# Escopo do MVP — Sistema de Gestão de Atendimentos

## Objetivo do MVP
Substituir o processo manual atual baseado em formulário textual e base estatística separada, concentrando cadastro, prontuário, histórico e relatórios em um único sistema.

---

## O que ESTÁ no MVP

### Must
- Landing page institucional da secretaria
- Tela de login
- Recuperação de senha
- Dashboard inicial
- Gestão de usuários por administrador
- Perfis: administrador, recepção, psicólogo, advogado, assistente social
- Cadastro único da pessoa atendida
- Busca por nome, CPF e telefone
- Controle de duplicidade básica
- Abertura de caso
- Controle de status do caso
- Registro de atendimentos multiprofissionais
- Prontuário compartilhado
- Histórico cronológico de atendimentos
- Campos estatísticos estruturados
- Relatórios quantitativos essenciais
- Relatórios qualitativos essenciais
- Relatórios híbridos essenciais
- Filtros por período, profissional, status, bairro/região e tipo de violência

### Should
- Exportação tabular dos relatórios
- Série histórica básica por mês/período
- Resumo de produção por profissional
- Produção consolidada por período
- Painel com indicadores operacionais

### Could
- Configuração de listas padronizadas pelo administrador
- Inativação lógica de cadastros
- Favoritos/atalhos para relatórios mais usados
- resumo institucional no dashboard conforme perfil

---

## O que NÃO ESTÁ no MVP

- anexos de documentos e imagens
- assinatura digital
- permissões granulares por campo
- notas privadas por especialidade
- integração com WhatsApp, SMS ou e-mail
- integração com sistemas externos
- agenda/calendário avançado
- abertura pública de atendimento pela landing page
- acompanhamento público do caso
- BI avançado com painéis customizáveis
- automações complexas de workflow

---

## Justificativa das decisões de escopo

### 1. Foco na dor principal
A principal dor atual é o retrabalho entre registro manual e consolidação estatística. Por isso, o MVP prioriza cadastro estruturado, atendimento e relatórios.

### 2. Menor complexidade operacional
Sem anexos e sem permissões granulares, a implantação inicial fica mais simples e rápida.

### 3. Melhor base para expansão futura
Separar Pessoa, Caso e Atendimento no MVP evita retrabalho técnico quando o sistema crescer.

### 4. Relatório como parte do core
Relatórios não entram como feature secundária. Eles são parte central do produto, porque respondem diretamente à necessidade da secretaria.

---

## Hipóteses a validar com o MVP

- a equipe vai abandonar o fluxo manual e registrar os atendimentos direto no sistema
- os campos estruturados serão suficientes para gerar os relatórios exigidos
- o prontuário compartilhado melhora a continuidade do atendimento
- os relatórios qualitativos e quantitativos reduzirão o tempo de fechamento mensal
- a recepção conseguirá cadastrar corretamente sem treinamento excessivo
- o dashboard inicial ajudará a coordenação a acompanhar a operação

---

## Métricas de sucesso do MVP

- 100% dos novos casos lançados no sistema
- redução drástica do uso paralelo de documentos manuais
- relatórios mensais gerados em poucos minutos
- queda na inconsistência de campos categóricos
- histórico encontrado rapidamente pela equipe
- adesão operacional dos 5 perfis previstos

---

## Riscos principais do MVP

- modelagem insuficiente para atender todos os relatórios
- cadastro duplicado por ausência de identificação completa
- excesso de campos tornando o preenchimento lento
- adoção parcial da equipe, mantendo processos paralelos

---

## Estratégia de mitigação

- padronizar listas desde o início
- validar os relatórios prioritários antes do desenvolvimento completo
- separar claramente dados cadastrais, caso e atendimento
- usar interface simples com preenchimento guiado