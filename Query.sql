-- Create the Users table
CREATE TABLE `Users` (
  `Id` INT AUTO_INCREMENT PRIMARY KEY,
  `Name` VARCHAR(255) NOT NULL,
  `Email` VARCHAR(255) NOT NULL UNIQUE,
  `PasswordHash` VARCHAR(255) NOT NULL
);

-- Create the Cars table
CREATE TABLE `Cars` (
  `Id` INT AUTO_INCREMENT PRIMARY KEY,
  `Name` VARCHAR(255) NOT NULL,
  `Model` VARCHAR(255) NOT NULL,
  `PricePerDay` DECIMAL(18,2) NOT NULL,
  `PricePerHour` DECIMAL(18,2) NOT NULL,
  `IsAvailable` BOOLEAN NOT NULL
);

-- Create the Bookings table
CREATE TABLE `Bookings` (
  `Id` INT AUTO_INCREMENT PRIMARY KEY,
  `CarId` INT NOT NULL,
  `UserId` INT NOT NULL,
  `StartDate` DATETIME NOT NULL,
  `EndDate` DATETIME NOT NULL,
  `TotalAmount` DECIMAL(18,2) NOT NULL,
  `IsPaid` BOOLEAN NOT NULL,
  `Accepted` BOOLEAN NOT NULL,
  FOREIGN KEY (`CarId`) REFERENCES `Cars`(`Id`) ON DELETE CASCADE,
  FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE CASCADE
);

-- Create the PaymentInfos table
CREATE TABLE `PaymentInfos` (
  `Id` INT AUTO_INCREMENT PRIMARY KEY,
  `BookingId` INT NOT NULL,
  `PaymentMethod` VARCHAR(255) NOT NULL,
  `Amount` DECIMAL(18,2) NOT NULL,
  `PaymentDate` DATETIME NOT NULL,
  FOREIGN KEY (`BookingId`) REFERENCES `Bookings`(`Id`) ON DELETE CASCADE
);
