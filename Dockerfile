FROM --platform=linux/amd64 node:21.7.2-slim
WORKDIR /opt/app/front
COPY ./ .
RUN npm install
EXPOSE 5001
CMD [ "node","index.js"]


