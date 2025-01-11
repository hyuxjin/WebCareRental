# WebCareRental

- Install HeidiSQL
- Install XAMPP

- Run XAMPP and Start the MYSQL
- Open HeidiSQL
- Create New Session
- Open
- Find Manage User Authentication and previliges (2 human/people icon)
- Click the username with root
- Set password to root
- Repeat password to root
- Save and Close
- Create new database named carrentaldb

How to run the backend 

- Get the file directory of backend project (WebCareRental)
- Open Command Prompt
- Run these

dotnet ef migrations add InitialCreation
dotnet ef database update (ignore the errors if the table already exists as we already include in database
dotnet run



How to run frontend

- Get the file directory of the frontend project (car-rental-frontend)
- Open Command Prompt
- Run these

npm install
npm install --save-dev @angular-devkit/build-angular
ng serve


Check these links:

- localhost:4200/admin-login (for admin access)
- login access

email: admin@testing.com
password: admin123

- you can change the credentials inside Program.cs


- localhost:4200/login (user access)
- register for new account
