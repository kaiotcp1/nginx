![Node.js](https://img.shields.io/badge/Node.js-22.x-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![Docker](https://img.shields.io/badge/Docker-🛳️-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-Amazon_Web_Services-FF9900?logo=amazonaws&logoColor=white)

```markdown
# 🧪 Clean Architecture Todo API

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

## 🚀 Deploy na AWS EC2

1.  Crie uma instância EC2 com Ubuntu Server 24.04 LTS (t2.micro para o free tier).
2.  Configure o Security Group da EC2:
    *   Permita tráfego SSH (porta 22) do seu IP.
    *   Permita tráfego HTTP (porta 80) de 0.0.0.0/0 (qualquer IP).
    *   Permita tráfego HTTPS (porta 443) de 0.0.0.0/0 (qualquer IP) Caso tenha configurado o certificado SSL.
3.  Conecte-se à instância via SSH.
4.  Instale o Docker e Docker Compose:

    ```bash
    sudo apt update
    sudo apt upgrade -y
    sudo apt install docker.io -y
    sudo apt install docker-compose -y
    sudo usermod -aG docker $USER
    newgrp docker
    ```

5.  Configure o Firewall (UFW):

    ```bash
    sudo apt update
    sudo apt install ufw -y
    sudo ufw allow 80
    sudo ufw allow 443
    sudo ufw enable
    sudo ufw status
    ```

6.  Copie os arquivos do projeto para a instância:

    ```bash
    scp -i "sua-chave.pem ou .pkk" -r docker-compose.yml Dockerfile package.json package-lock.json tsconfig.json nginx src ubuntu@<ip-da-ec2>:/home/ubuntu/todoapp/
    ```

7.  Suba a aplicação com Docker Compose:

    ```bash
    cd /home/ubuntu/todoapp
    docker-compose up -d --build
    ```

8.  Acesse a aplicação no navegador: `http://<ip-da-ec2>`

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

## 🛡️ Configurações de Segurança no Nginx

O projeto implementa diversas práticas recomendadas de segurança no proxy reverso Nginx, visando proteger a aplicação contra ataques comuns e garantir maior robustez em ambientes de produção ou estudo que é o caso destá aplicação.

### Principais configurações aplicadas:

- **Limitação de requisições por IP:**
  Utiliza o módulo `limit_req` para restringir cada IP a no máximo 10 requisições por minuto, mitigando ataques de força bruta e DoS leves.
    ```nginx
    limit_req_zone $binary_remote_addr zone=one:10m rate=10r/m;
    limit_req zone=one burst=5 nodelay;
    ```

- **Cabeçalhos de segurança HTTP:**
  Adiciona cabeçalhos para proteção contra XSS, clickjacking e outros ataques.
    ```nginx
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; img-src 'self' data:;";
    ```

- **Limite de tamanho de upload:**
  Restringe o tamanho máximo do corpo da requisição para evitar abusos e ataques de upload.
    ```nginx
    client_max_body_size 10m;
    ```

- **Timeouts de conexão:**
  Define timeouts para evitar conexões lentas ou maliciosas.
    ```nginx
    client_body_timeout 12s;
    client_header_timeout 12s;
    keepalive_timeout 15s;
    send_timeout 10s;
    ```

- **Proteção contra buffer overflow:**
  Ajusta buffers para evitar ataques de cabeçalho muito grande.
    ```nginx
    client_header_buffer_size 1k;
    large_client_header_buffers 4 4k;
    ```

- **Bloqueio de user agents maliciosos:**
  Bloqueia requisições de ferramentas conhecidas por automação de ataques.
    ```nginx
    if ($http_user_agent ~* (sqlmap|wpscan|nikto|wget) ) {
        return 403;
    }
    ```

## 🧠 Conceitos Aplicados

- ✅ Clean Architecture
- ✅ Domain-Driven Design (DDD)
- ✅ Inversão de Dependência
- ✅ Express com Adapter Controller
- ✅ MongoDB com repositórios desacoplados
- ✅ DTOs e Presenters
- ✅ Docker e Docker Compose
- ✅ Nginx como proxy reverso com práticas de segurança
- ✅ AWS EC2
- ✅ Firewall (UFW)

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
```