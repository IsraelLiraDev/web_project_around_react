# Around The U.S. (React)

Aplicação web em **React** para compartilhar lugares com fotos: um perfil de usuário, uma galeria de cartões e pop-ups para editar dados, visualizar imagens e confirmar exclusões. Este é o projeto do sprint de React do curso de Desenvolvimento Web da **TripleTen**, migrado de HTML/CSS/JS puro para componentes React com **Vite**.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-build%20tool-646CFF?logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-configurado-4B32C3?logo=eslint&logoColor=white)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

---

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Como executar](#como-executar)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como a aplicação funciona](#como-a-aplicação-funciona)
- [Conceitos de React praticados](#conceitos-de-react-praticados)
- [Próximos passos](#próximos-passos)
- [Autor](#autor)

---

## Funcionalidades

- **Perfil do usuário** com nome, descrição e avatar.
- **Galeria de cartões** renderizada dinamicamente a partir de um array de dados (mock data).
- **Curtir / descurtir** um cartão, com o estado do coração atualizado na hora.
- **Excluir cartão com confirmação**: um pop-up "Tem certeza?" evita exclusões acidentais.
- **Pop-up de imagem**: clicar na foto de um cartão abre a imagem ampliada com legenda.
- **Pop-ups com formulários** para adicionar um novo local, editar o perfil e alterar a foto do perfil.
- **Pop-up reutilizável**: um único componente `Popup` serve a todos os casos, mudando só título e conteúdo.
- **Layout responsivo**, herdado do projeto original em HTML/CSS (metodologia BEM).

## Tecnologias

| Tecnologia | Uso |
|---|---|
| [React](https://react.dev/) | Interface em componentes funcionais com Hooks |
| [Vite](https://vite.dev/) | Servidor de desenvolvimento rápido e build de produção |
| JavaScript (ES6+) | Lógica da aplicação |
| HTML5 / CSS3 | Marcação semântica e estilos organizados por blocos (BEM) |
| [ESLint](https://eslint.org/) | Padronização e verificação do código |

## Como executar

**Pré-requisitos:** [Node.js](https://nodejs.org/) (versão LTS recomendada) e npm.

```bash
# 1. Clonar o repositório
git clone https://github.com/IsraelLiraDev/web_project_around_react.git

# 2. Entrar na pasta do projeto
cd web_project_around_react

# 3. Instalar as dependências
npm install

# 4. Iniciar o servidor de desenvolvimento
npm run dev
```

Depois, abra no navegador o endereço que aparecer no terminal (por exemplo, `http://localhost:3000`).

> **Atenção:** se o código do projeto estiver dentro de uma subpasta do repositório, entre nela antes do `npm install` (por exemplo, `cd "EUA Afora"`). O `package.json` precisa estar na pasta onde você roda os comandos.

### Scripts disponíveis

| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com recarregamento automático |
| `npm run build` | Gera a versão otimizada para produção na pasta `dist/` |
| `npm run preview` | Serve localmente a versão gerada pelo build |
| `npm run lint` | Executa o ESLint em todo o projeto |

## Estrutura do projeto

```
src/
├── main.jsx                  # Ponto de entrada: monta <App /> no #root
├── App.jsx                   # Componente raiz: Header + Main + Footer
├── index.css                 # Importa vendor/ e blocks/ (CSS por bloco BEM)
├── images/                   # Logo, avatar, ícones (SVG/PNG)
├── vendor/                   # normalize.css e fontes
├── blocks/                   # Um arquivo CSS por bloco (page, header, profile, card, popup...)
└── components/
    ├── Header/
    │   └── Header.jsx
    ├── Footer/
    │   └── Footer.jsx
    └── Main/
        ├── Main.jsx          # Estado dos pop-ups e dos cartões
        └── components/
            ├── Card/
            │   └── Card.jsx
            └── Popup/
                ├── Popup.jsx             # Estrutura comum: botão fechar + título + conteúdo
                └── components/
                    ├── NewCard/          # Formulário de novo local
                    ├── EditProfile/      # Formulário de edição do perfil
                    ├── EditAvatar/       # Formulário de troca da foto
                    ├── ImagePopup/       # Imagem ampliada com legenda
                    └── DeleteConfirmation/  # Botão "Sim" da confirmação de exclusão
```

A organização segue um princípio simples: **cada componente fica ao lado dos componentes que só ele usa**. Por isso `Popup` e `Card` ficam dentro de `Main`, e os conteúdos dos pop-ups ficam dentro de `Popup`.

## Como a aplicação funciona

### Composição de componentes

```
App
├── Header
├── Main
│   ├── Card (um por cartão)
│   └── Popup (renderizado só quando há um pop-up aberto)
│       └── NewCard | EditProfile | EditAvatar | ImagePopup | DeleteConfirmation
└── Footer
```

### Um único estado controla os pop-ups

Em `Main.jsx` existe um estado `popup`. Quando ele é `null`, nenhum pop-up aparece. Para abrir um, basta guardar nele um objeto com o título e o conteúdo:

```jsx
const [popup, setPopup] = useState(null);

const newCardPopup = { title: "New card", children: <NewCard /> };

{popup && (
  <Popup onClose={handleClosePopup} title={popup.title}>
    {popup.children}
  </Popup>
)}
```

Abrir é `setPopup(objeto)`; fechar é `setPopup(null)`. O componente `Popup` só existe no DOM enquanto estiver aberto (renderização condicional).

Variações do mesmo componente:

- **Sem título** (`title` nulo): o `Popup` aplica o estilo de imagem ampliada.
- **`isConfirmation`**: aplica o estilo compacto do pop-up de confirmação.

### Cartões, curtidas e exclusão

Os cartões vivem em um estado (`cards`) inicializado com dados fictícios. As atualizações são **imutáveis**: em vez de alterar o array, criam um novo.

```jsx
// Curtir: alterna isLiked apenas do cartão clicado
setCards((cards) =>
  cards.map((card) =>
    card._id === cardId ? { ...card, isLiked: !card.isLiked } : card
  )
);

// Excluir: devolve todos os cartões, menos o escolhido
setCards((cards) => cards.filter((card) => card._id !== cardId));
```

O fluxo de exclusão tem uma etapa de proteção: o botão da lixeira **não apaga direto**; ele abre o pop-up "Tem certeza?", e só o botão "Sim" chama `handleCardDelete`.

### Imagens e Vite

Imagens que ficam em `src/` são **importadas como módulos**, e não referenciadas por caminho de texto:

```jsx
import avatar from "../../images/avatar.jpg";
<img src={avatar} alt="Avatar" />
```

Assim o Vite resolve o caminho correto e otimiza o arquivo no build.

## Conceitos de React praticados

- Componentes funcionais e composição (`props`, `children`)
- Hook `useState` para estado de interface e de dados
- Renderização condicional (`&&` e operador ternário)
- Renderização de listas com `map()` e `key` única (`_id`)
- Manipuladores de eventos (`onClick`) e funções passadas por props
- Atualização imutável de estado (`map`, `filter`, spread)
- Migração de HTML para JSX (`className`, tags auto-fechadas, expressões entre `{}`)
- Organização de pastas por componente e imports de CSS/imagens no Vite

## Próximos passos

- [ ] Validação e envio dos formulários (controlled components)
- [ ] Adicionar novos cartões a partir do formulário "Novo local"
- [ ] Editar nome, descrição e avatar do perfil de fato
- [ ] Fechar pop-ups com a tecla `Esc` e com clique fora
- [ ] Integração com a API (dados reais em vez de mock data)
- [ ] Contexto global do usuário (`CurrentUserContext`)
- [ ] Deploy da aplicação

## Autor

**Israel Lira**
GitHub: [@IsraelLiraDev](https://github.com/IsraelLiraDev)

Projeto desenvolvido como parte do curso de Desenvolvimento Web da [TripleTen](https://tripleten.com/).
