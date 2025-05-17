#O que faz: usa a imagem oficial do Node.js v22, baseada em Alpine Linux (muito enxuta).
#o container já vem com node e npm pré-instalados, mas pesando ~30 MB em vez de centenas.
FROM node:22-alpine

#define /app como diretório de trabalho dentro do container.
#todo comando subsequente (COPY, RUN, CMD) vai “correr” dentro de /app.
WORKDIR /app

#Copia os arquivos de definição de dependências
#copia somente esses dois arquivos da sua máquina para /app/package.json e /app/package-lock.json.
COPY package.json package-lock.json ./

#Instala dependências
RUN npm ci

#Copia todo o código fonte
#copia tudo (exceto o que está em .dockerignore) para dentro de /app.
COPY . .

#Compila o TypeScript
#roda o script build definido no seu package.json
#gera a pasta dist/ ou equivalente com JS puro, pronto para produção.
RUN npm run build

#Porta padrão da aplicação
#expõe a porta 3000 do container para o host.
#documenta que o container “ouve” na porta 3000.
#facilita mapeamentos com -p 3000:3000 ou em orquestradores.
EXPOSE 3000

#Comando para iniciar a aplicação já compilada
#roda o script start definido no seu package.json.
#define o comando default. Normalmente start roda node dist/main.js.
#ao rodar docker run api-todo-list, ele entra em /app e executa esse comando.
CMD ["npm", "run", "start"]