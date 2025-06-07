![Node.js](https://img.shields.io/badge/Node.js-22.x-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![Docker](https://img.shields.io/badge/Docker-🛳️-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![Oracle Cloud](https://img.shields.io/badge/Oracle_Cloud-Free_Tier-F80000?logo=oracle)
![AWS](https://img.shields.io/badge/AWS-Amazon_Web_Services-FF9900?logo=amazonaws&logoColor=white)
![SSL](https://img.shields.io/badge/SSL-Let's_Encrypt-0066CC?logo=letsencrypt&logoColor=white)

# 🧪 Clean Architecture Todo API

Uma aplicação de estudo construída com foco em aprender os fundamentos de **Clean Architecture**, **DDD**, **Docker**, **Nginx (reverse proxy)**, **SSL/HTTPS com Let's Encrypt** e práticas modernas com Node.js + TypeScript.

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

### Rotas da API
Esta API RESTful permite criar, listar, buscar e deletar tarefas. Todas as rotas estão sob o prefixo `/v1/tasks`.
## 🔎 Health Check

- **GET** `/v1/health`
  Verifica se a API está online.

  **Resposta:**
  ```json
  { "status": "ok" }
  ```

---

## 📝 Criar Tarefa

- **POST** `/v1/tasks`
  Cria uma nova tarefa.

  **Body:**
  ```json
  {
    "title": "Minha nova tarefa",
    "completed": false
  }
  ```

  **Resposta (201):**
  ```json
  {
    "message": "Task created successfully",
    "task": {
      "title": "Minha nova tarefa",
      "completed": false
    }
  }
  ```

---

## 📋 Listar Todas as Tarefas

- **GET** `/v1/tasks`
  Retorna todas as tarefas cadastradas.

  **Resposta (200):**
  ```json
  [
    {
      "id": "uuid-da-tarefa",
      "title": "Minha nova tarefa",
      "completed": false
    }
    // ...
  ]
  ```

---

## 🔍 Buscar Tarefa por ID

- **GET** `/v1/tasks/:id`
  Retorna uma tarefa específica pelo ID.

  **Resposta (200):**
  ```json
  {
    "id": "uuid-da-tarefa",
    "title": "Minha nova tarefa",
    "completed": false
  }
  ```

  **Erro (404):**
  ```json
  { "error": "Task with id \"...\" not found" }
  ```

---

## 🗑️ Deletar Tarefa por ID

- **DELETE** `/v1/tasks/:id`
  Remove uma tarefa pelo ID.

  **Resposta (200):**
  ```json
  { "message": "Task deleted successfully" }
  ```

  **Erro (404):**
  ```json
  { "error": "Task not found" }
  ```

---

## ⚠️ Erros Comuns

- **400 Bad Request:** Dados inválidos (ex: título muito curto)
- **404 Not Found:** Tarefa não encontrada

---

## Exemplos de uso com `curl`

```bash
# Criar tarefa
curl -X POST https://seudominio.com/v1/tasks -H "Content-Type: application/json" -d '{"title":"Estudar Clean Architecture"}'

# Listar tarefas
curl https://seudominio.com/v1/tasks

# Buscar tarefa por ID
curl https://seudominio.com/v1/tasks/<id>

# Deletar tarefa por ID
curl -X DELETE https://seudominio.com/v1/tasks/<id>
```

---

> Todas as respostas são em JSON.
> Para dúvidas ou sugestões, consulte o código ou entre em contato!

---

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

## ☁️ Deploy em Cloud (AWS EC2 ou Oracle Cloud)

### 1. **Criando a VM**

- **AWS EC2:** Crie uma instância `Ubuntu 24.04 LTS` (`t2.micro para free tier`).
- **Oracle Cloud:** Crie uma VM `VM.Standard.E2.1.Micro` (free tier) com Ubuntu 24.04 LTS.

### 2. **Configuração de Rede**

- **Porta 22 (SSH):** Libere apenas para o seu IP.
- **Portas 80 e 443:** Libere para 0.0.0.0/0 (acesso público).
- **No Ubuntu:**  ***Não obrigatório para teste*** | ***Cuidado bloquear o acesso a maquina pela porta 22***
  ```bash
  sudo ufw allow 22
  sudo ufw allow 80
  sudo ufw allow 443
  sudo ufw enable
  ```

### 3. **Instale Docker e Docker Compose**

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install docker.io -y
sudo apt install docker-compose -y
sudo usermod -aG docker $USER
newgrp docker
```

### 4. **Copie os arquivos do projeto para a VM**

No seu computador local:

```bash
scp -i "sua-chave.key" -r docker-compose.yml Dockerfile package.json package-lock.json tsconfig.json nginx src ubuntu@<ip-da-vm>:/home/ubuntu/todoapp/
```

---

## 🔒 Configuração de Domínio e SSL/HTTPS

### 1. **Configuração do Domínio**

- Adquira um domínio (Hostinger, GoDaddy, etc).
- Configure o DNS:
  ```
  Tipo: A
  Nome: @
  Valor: IP_PUBLICO_DA_VM
  TTL: 3600

  Tipo: CNAME
  Nome: www
  Valor: seudominio.com
  TTL: 3600
  ```
- Aguarde a propagação DNS (pode levar até 24h).

---

### 2. **Emissão do Certificado SSL (Let's Encrypt)**

#### **Passo a passo seguro:**

1. **Crie a pasta de validação no host:**
   ```bash
   sudo mkdir -p /var/www/certbot
   sudo chown 1000:1000 /var/www/certbot
   ```

2. **Ajuste temporário no nginx.conf:**
   - **Remova ou comente o bloco HTTPS (porta 443)**
   - **Remova o redirecionamento de HTTP para HTTPS**
   - Deixe apenas o bloco:
     ```nginx
     server {
         listen 80;
         server_name seudominio.com www.seudominio.com;

         location /.well-known/acme-challenge/ {
             root /var/www/certbot;
             try_files $uri =404;
         }

         location / {
             return 200 'ok';
             add_header Content-Type text/plain;
         }
     }
     ```

3. **Reinicie o nginx:**
   ```bash
   docker-compose down
   docker-compose up -d
   ```

4. **Teste o acesso externo:** | **Não obrigatório**
   ```bash
   curl http://seudominio.com/.well-known/acme-challenge/teste.txt
   ```

5. **Emita o certificado:**
   ```bash
   docker-compose run --rm certbot certonly --webroot \
     --webroot-path=/var/www/certbot \
     --email seu-email@exemplo.com \
     --agree-tos --no-eff-email \
     -d seudominio.com -d www.seudominio.com
   ```

6. **Volte o nginx.conf para a configuração com HTTPS e redirecionamento:**
   - Reative o bloco HTTPS (porta 443)
   - Reative o redirecionamento HTTP → HTTPS

7. **Reinicie o nginx novamente:**
   ```bash
   docker-compose down
   docker-compose up -d
   ```

8. **Acesse sua aplicação em:**
   [https://seudominio.com](https://seudominio.com)

---

### 3. **Renovação Automática do Certificado**

Crie um script de renovação:

```bash
cat > renew-ssl.sh << 'EOF'
#!/bin/bash
cd /home/ubuntu/todoapp
docker-compose run --rm certbot renew --quiet
if [ $? -eq 0 ]; then
    docker-compose exec nginx nginx -s reload
fi
EOF

chmod +x renew-ssl.sh
```

Adicione ao cron:

```bash
sudo crontab -e
# Adicione:
0 2 * * * /home/ubuntu/todoapp/renew-ssl.sh >> /var/log/ssl-renewal.log 2>&1
```

---
### 🛡️ Recursos de Segurança HTTPS

- **TLS 1.2/1.3:** Protocolos modernos de criptografia
- **HSTS:** Força conexões HTTPS no navegador
- **HTTP/2:** Protocolo mais eficiente
- **Certificado válido por 90 dias** com renovação automática
- **Redirecionamento automático** HTTP → HTTPS

---

## 🔄 Usando Nginx como Proxy Reverso

- Nginx é usado para rotear as requisições externas para o container da API.
- Ele recebe requisições HTTP/HTTPS e as repassa para o serviço `api` na porta 3000.
- Atua como terminador SSL, descriptografando HTTPS antes de enviar para a API.

### 💡 O que é Proxy Reverso?

> É um servidor que intercepta requisições feitas ao backend e as encaminha internamente.
> Ele resolve problemas como:
- Balanceamento de carga
- Encapsulamento do backend
- Cache, compressão e HTTPS
- Terminação SSL/TLS

---

## 🛡️ Configurações de Segurança no Nginx

O projeto implementa diversas práticas recomendadas de segurança no proxy reverso Nginx, visando proteger a aplicação contra ataques comuns e garantir maior robustez em ambientes de produção ou estudo que é o caso desta aplicação.

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
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
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

- **Configurações SSL/TLS modernas:**
  Implementa protocolos e cifras seguras para HTTPS.
    ```nginx
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
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
- ✅ SSL/TLS com Let's Encrypt
- ✅ Renovação automática de certificados
- ✅ AWS EC2
- ✅ Oracle Cloud
- ✅ Firewall (UFW)
- ✅ DNS e domínios personalizados

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