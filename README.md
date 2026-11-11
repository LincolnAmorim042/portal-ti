# Portal TI

## Visão geral

O Portal TI é uma aplicação web desenvolvida para centralizar ferramentas, conhecimento e utilidades utilizadas pela equipe de TI. O sistema reúne, em uma única interface, acesso aos sistemas internos, tutoriais, documentação, laboratório de entretenimento, gerenciamento de usuários e auditoria de ações.

## Principais funcionalidades

* Dashboard com acesso rápido às ferramentas.
* Central de Conhecimento com pesquisa.
* Cadastro e organização de ferramentas por categoria.
* Gerenciamento de usuários.
* Laboratório (Fun) para exibição de textos, imagens e áudios.
* Sistema de tutoriais em Markdown.
* Exportação e restauração de backup.
* Registro de auditoria das principais ações do sistema.

## Tecnologias utilizadas

### Backend

* Node.js
* Express
* SQLite
* JWT para autenticação
* Multer para upload de arquivos

### Frontend

* Vue 3
* Vue Router
* Pinia
* Bootstrap Icons

## Estrutura do projeto

```bash
client/
    Frontend Vue

gateway/
    Backend Express

database/
    Banco SQLite

uploads/
    Arquivos enviados (imagens e áudios)
```

## Instalação

1. Clone o repositório.

2. Configure as variáveis de ambiente.

3. Inicie a aplicação utilizando Docker Compose ou Node.js.

## Backup

O sistema possui funções integradas para:

* Exportar backup completo.
* Restaurar backup.
* Preservar os dados cadastrados entre atualizações.

## Logs

Todas as principais ações administrativas são registradas automaticamente, incluindo:

* Login e logout.
* Gerenciamento de usuários.
* Alterações nas ferramentas.
* Alterações na Central de Conhecimento.
* Alterações no Laboratório.
* Operações de backup.

Os registros são mantidos por 180 dias, sendo removidos automaticamente após esse período.

## Segurança

* Autenticação via JWT.
* Cookies HTTP Only.
* Rotas protegidas por middleware.
* Auditoria das ações administrativas.

## Licença

Projeto desenvolvido para uso interno da equipe de Tecnologia da Informação.
