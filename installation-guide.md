Installation Guide

=================== Generate Model ====================

- npx sequelize model:generate --name User --attributes username:string,email:string,password:string,role:string

- npx sequelize model:generate --name Brand --attributes name:string

- npx sequelize model:generate --name Profile --attributes name:string,dateOfBirth:date,phoneNumber:string,gender:string,photo:string

- npx sequelize model:generate --name Product --attributes name:string,storage:integer,price:integer,stock:integer,image:string

- npx sequelize model:generate --name Order --attributes status:string

=================== Add Foreign Key ====================

- npx sequelize migration:generate --name add-fk-in-profiles

- npx sequelize migration:generate --name add-fk-in-products

- npx sequelize migration:generate --name add-userid-in-orders

- npx sequelize migration:generate --name add-productid-in-orders

=================== Seeding ====================

- npx sequelize seed:generate --name seed-Users

- npx sequelize seed:generate --name seed-Brands

- npx sequelize seed:generate --name seed-products

- npx sequelize seed:generate --name seed-profiles

- npx sequelize seed:generate --name seed-orders