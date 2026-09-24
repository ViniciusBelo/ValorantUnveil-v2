# ValorantUnveil

**Produzido por Vinicius Belo**  
Aluno do 5° período de Sistemas de Informação da UNINASSAU

---

## Sobre o projeto

ValorantUnveil é uma plataforma web dedicada ao jogo **Valorant**, onde o usuário pode explorar informações sobre agentes e mapas do jogo.

### Funcionalidades

- **Home** — Apresentação do projeto e do jogo, com atalhos para as seções principais
- **Agentes** — Grid com os 12 agentes do jogo, cada card exibe a imagem do personagem com seu nome. Ao clicar, abre um modal com:
  - Imagem do agente
  - Nome e classe (Duelista, Iniciador, Controlador, Sentinela)
  - Biografia completa
- **Mapas** — Página que consome a **API pública do Valorant** em tempo real, exibindo todos os mapas jogáveis com:
  - Imagem oficial do mapa
  - Nome e localização no mundo real
  - Descrição narrativa
  - Característica tática exclusiva de cada mapa
  - Pontos do mapa (callouts: A Site, B Site, Mid, etc.)
- **Formulário** — Cadastro de novos agentes na API local com campos de nome, classe e biografia

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Back-end | Java 17+ com Spring Boot 3.2 |
| Banco de dados | H2 (in-memory, sem instalação) |
| Front-end | HTML5, CSS3, JavaScript puro |
| Dados de mapas | [valorant-api.com](https://valorant-api.com) (API pública) |
| Ícones | Bootstrap Icons 1.11 |
| Fonte | Google Fonts — Outfit |

---

## Como rodar

### Pré-requisitos

- **Java 17 ou superior** instalado
- **VSCode** com a extensão **Oracle Java** instalada (ou Maven configurado no PATH)

### Passo a passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/ViniciusBelo/ValorantUnveil-v2.git
   cd ValorantUnveil-v2
   ```

2. Dê **duplo clique** no arquivo `rodar.bat` na raiz do projeto.

3. Aguarde a mensagem `Started CourseApplication` aparecer no terminal.

4. Abra o navegador em:

   | Página | URL |
   |---|---|
   | Home | http://localhost:8080 |
   | Agentes | http://localhost:8080/Valoagents.html |
   | Mapas | http://localhost:8080/Valomaps.html |
   | Formulário | http://localhost:8080/Valoform.html |

5. Para parar o servidor: `Ctrl+C` no terminal.

> **Sem necessidade de PostgreSQL.** O projeto usa banco H2 em memória — os 12 agentes são carregados automaticamente ao iniciar.

### Rodando manualmente (sem o .bat)

Se preferir via terminal:

```bash
# Compilar
mvn package -DskipTests

# Executar
java -jar target/course-0.0.1-SNAPSHOT.jar
```

---

## Estrutura do projeto

```
ValorantUnveil/
├── public/                  # Frontend (HTML, CSS, JS)
│   ├── Valohome.html        # Página Home
│   ├── Valoagents.html      # Página de Agentes
│   ├── Valomaps.html        # Página de Mapas
│   ├── Valoform.html        # Página de Formulário
│   ├── Valohome.css         # Estilos da Home
│   ├── Valoagents.css       # Estilos de Agentes, Mapas e Formulário
│   ├── Valohome.js          # Lógica dos cards de agentes
│   ├── Valomaps.js          # Lógica da página de mapas
│   └── Valoform.js          # Lógica do formulário de cadastro
├── img/                     # Imagens dos agentes
├── src/main/java/           # Código Java (Spring Boot)
│   └── com/educandoweb/course/
│       ├── entities/        # Entidade User (agente)
│       ├── repositories/    # JPA Repository
│       ├── services/        # Regras de negócio
│       ├── resources/       # Controllers REST
│       └── config/          # CORS, dados de teste, recursos estáticos
├── src/main/resources/
│   ├── application.properties        # Perfil ativo: local
│   └── application-local.properties  # Config H2 in-memory
└── rodar.bat                # Script para iniciar o projeto no Windows
```

---

## API REST

O back-end expõe endpoints REST para os agentes:

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/users` | Lista todos os agentes |
| GET | `/users/{id}` | Busca agente por ID |
| POST | `/users` | Cadastra novo agente |
| PUT | `/users/{id}` | Atualiza agente |
| DELETE | `/users/{id}` | Remove agente |
