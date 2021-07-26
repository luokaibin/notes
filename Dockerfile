FROM node:14.17.3
WORKDIR /app
COPY . /app
RUN rm -f package-lock.json \
    ; rm -rf .idea \
    ; rm -rf node_modules \
    ; rm -rf .git \
    ; rm -rf .gitignore \
    ; rm -rf docs/* \
    ; npm config set registry "https://registry.npm.taobao.org/" \
    && npm install
EXPOSE 4000
CMD [ "node", "cmd.js", "server" ]