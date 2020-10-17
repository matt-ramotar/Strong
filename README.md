# Strong

## Getting Started

### 1. Clone repository

`git clone https://github.com/mightytag/strong.git`

### 2. Install dependencies

`npm install`

### 3. Create `.env`

`cp .env.example .env && code .env`

- [ ] Change `username`
- [ ] Change `password`

### 4. Create database user

`psql -c "CREATE USER <user> WITH PASSWORD '<password>' CREATEDB;"`

### 5. Create database

`npx dotenv sequelize db:create`

### 6. Run migrations

`npx dotenv sequelize db:migrate`

### 7. Run seeders

`npx dotenv sequelize db:seed:all`

### 8. Start app

`npm start`
