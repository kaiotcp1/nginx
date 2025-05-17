
# 🧪 Clean Architecture Todo API

![Node.js](https://img.shields.io/badge/Node.js-22.x-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![Docker](https://img.shields.io/badge/Docker-🛳️-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)

Uma aplicação de estudo construída com foco em aprender os fundamentos de **Clean Architecture**, **DDD**, **Docker**, **Nginx (reverse proxy)** e práticas modernas com Node.js + TypeScript.

---

## 📁 Estrutura do Projeto

```bash
src/
├── application/           # Casos de uso e DTOs
│   ├── dtos/              # Objetos de Transferência de Dados (entrada/saída)
│   └── use-cases/         # Implementações dos casos de uso
│
├── common/                # Código utilitário e erros genéricos
│   └── errors/            # Erros de aplicação personalizados
│
├── contracts/             # Interfaces e contratos para abstrações
│
├── domain/                # Camada de domínio (entidades e interfaces)
│   ├── entities/          # Entidades do domínio (ex: Task)
│   ├── repositories/      # Contratos dos repositórios
│   └── usecases/          # Interfaces dos casos de uso
│
├── infrastructure/        # Detalhes de implementação externa
│   ├── database/mongo/    # Implementação de repositórios com MongoDB
│   └── http/              # Camada de entrega (Express, middlewares, presenters)
│
└── main/                  # Entry point e injeção de dependência
    ├── factory/           # Montagem de casos de uso com dependências
    └── express-server.ts  # Inicialização do servidor Express
```

---

## 🚀 Como rodar com Docker

```bash
# Build da aplicação
docker-compose build

# Subir os containers
docker-compose up
```

A aplicação estará disponível em: [http://localhost](http://localhost)

> Para testar a saúde da API:
> ```bash
> curl http://localhost/v1/health
> ```

---

## 🔄 Usando Nginx como Proxy Reverso

- Nginx é usado para rotear as requisições externas para o container da API.
- Ele recebe requisições HTTP na porta 80 e as repassa para o serviço `api` na porta 3000.

### 💡 O que é Proxy Reverso?

> É um servidor que intercepta requisições feitas ao backend e as encaminha internamente.  
> Ele resolve problemas como:
- Balanceamento de carga
- Encapsulamento do backend
- Cache, compressão e HTTPS

---

## 🧠 Conceitos Aplicados

- ✅ Clean Architecture
- ✅ Domain-Driven Design (DDD)
- ✅ Inversão de Dependência
- ✅ Express com Adapter Controller
- ✅ MongoDB com repositórios desacoplados
- ✅ DTOs e Presenters
- ✅ Docker e Docker Compose
- ✅ Nginx como proxy reverso

---

## ⚠️ Aviso

> Esta aplicação é apenas para fins de estudo e aprendizado.  
> Não deve ser usada em produção sem antes aplicar medidas de segurança e validação adequadas.

---

## 📬 Contato

Se você quiser trocar ideias, colaborar ou apenas bater um papo sobre arquitetura de software, Docker, Clean Architecture ou qualquer outra coisa nerd — me chama no LinkedIn:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-hpkaio-blue?logo=linkedin)](https://www.linkedin.com/in/hpkaio)

---

## 👨‍💻 Autor

Feito com 💙 por um estudante de Engenharia de Software.