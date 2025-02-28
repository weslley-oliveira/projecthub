# ProjectHub - Dashboard de Gerenciamento de Projetos

## Visão Geral
O ProjectHub é uma aplicação web moderna e abrangente para gerenciar projetos, equipes e clientes. Desenvolvido com tecnologias de ponta, oferece uma interface intuitiva e rica em recursos para acompanhar o progresso dos projetos, gerenciar equipes, gerar faturas e analisar dados de desempenho.

## Principais Recursos

### Dashboard
- Visão geral dos projetos ativos
- Estatísticas de desempenho
- Gráficos de progresso dos projetos
- Distribuição da carga de trabalho da equipe
- Feed de atividades recentes

### Gerenciamento de Projetos
- Criação e edição de projetos
- Acompanhamento de progresso com barras de progresso visuais
- Atribuição de membros da equipe
- Definição de marcos e tarefas
- Histórico de atividades do projeto
- Cadastro de endereço para localização do projeto

### Gerenciamento de Equipes
- Registro de membros da equipe
- Monitoramento da carga de trabalho
- Atribuição de projetos
- Controle de disponibilidade

### Clientes
- Registro completo de informações dos clientes
- Histórico de projetos por cliente
- Informações de contato e faturamento

### Sistema de Faturas
- Geração de faturas para projetos concluídos
- Controle de status (Rascunho, Enviado, Pago, Atrasado)
- Exportação de faturas
- Acompanhamento de pagamentos

### Análise
- Gráficos de desempenho do projeto
- Análise de produtividade da equipe
- Distribuição do status do projeto
- Tendências de tempo e recursos

### Localização
- Cadastro de endereço completo para projetos
- Suporte para endereços brasileiros com estados pré-configurados
- Armazenamento de informações como rua, número, complemento, bairro, cidade, estado, CEP e país

## Tecnologias Utilizadas
- **Framework:** Next.js
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Componentes UI:** Radix UI (via shadcn/ui)
- **Gráficos:** Recharts
- **Gerenciamento de Datas:** date-fns
- **Ícones:** Lucide React
- **Temas:** Suporte a temas claro/escuro via next-themes

## Começando

### Pré-requisitos
- Node.js (versão recomendada: 18.x ou superior)
- npm ou yarn

### Instalação
1. Clone o repositório
   ```bash
   git clone https://github.com/seuusuario/projecthub.git
   ```
2. Instale as dependências
   ```bash
   cd projecthub
   npm install
   ```
3. Inicie o servidor de desenvolvimento
   ```bash
   npm run dev
   ```
4. Acesse `http://localhost:3000` no seu navegador

## Estrutura do Projeto
```
├── app/                    # Páginas e rotas da aplicação
│   ├── analytics/         # Página de análises
│   ├── customers/         # Gerenciamento de clientes
│   ├── invoices/         # Sistema de faturas
│   ├── projects/         # Gerenciamento de projetos
│   ├── settings/         # Configurações do sistema
│   └── team/             # Gerenciamento de equipe
├── components/           # Componentes reutilizáveis
│   ├── dashboard/        # Componentes específicos do dashboard
│   ├── invoice/         # Componentes relacionados a faturas
│   └── ui/              # Componentes de UI base
│       └── address.tsx  # Componente de cadastro de endereço
├── hooks/               # Hooks personalizados
├── lib/                 # Utilitários e funções auxiliares
└── public/              # Arquivos estáticos
```

## Construindo para Produção
Para criar uma build de produção otimizada:
```bash
npm run build
```

Para iniciar a versão de produção:
```bash
npm start
```

## Atualizações Recentes
- Adicionado componente de cadastro de endereço para projetos
- Implementada interface para gerenciamento de localização dos projetos
- Suporte completo para endereços brasileiros com estados pré-configurados