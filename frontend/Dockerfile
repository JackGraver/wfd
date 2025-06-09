FROM node:20

WORKDIR /app

# Only copy package.json + lock first to leverage Docker cache
COPY package*.json ./

RUN npm install

# Now copy the actual app code
COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]