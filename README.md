# Technologies Used
- 💻 Web Framework: Express
- 🛢️ Database: MySQL
- 🔄 ORM: Sequelize
- 🔐 Password Encryption: bcrypt
- 🔐 Authentication: JSONWebToken

# How to Run Locally?
1. 📋 Clone this repo.
2. 📦 Install all modules: `npm install`.
3. 🚀 Run MySQL Server and Create Schema: `sales-management`.
4. 🔧 Configure `dbConfig` File with the username and password of your MySQL Server.
5. 🏁 Start the project: `npm start`.

# Routes & Endpoints
## /login
- 📝 POST /login: To get authenticated (Generate Token).

## /user
- 📄 GET /user: To get all the users.
- ➕ POST /user/create: To create an account.
  - **Required**: fullname, email, password.
- 📄 GET /user/profile: To get user's details (Bearer token required).
- 📝 POST /user/profile: To update an account.

## /product
- 📄 GET /product: To get all the products.
- ➕ POST /product/create: To create a product.
  - **Required**: title, price, category.
  - **Optional**: description, image.
- 📝 PUT /product/update/:id: To update a product (id=1,2,3,...).
- 🗑️ DELETE /product/remove/:id: To delete a product.

# Live Version
To view the live version, visit: [https://sales-management.bibakbhusal.com.np](https://sales-management.bibakbhusal.com.np)
