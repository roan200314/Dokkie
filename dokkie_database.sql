-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema pb1a2324_hellyr_live
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pb1a2324_hellyr_live` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `pb1a2324_hellyr_live` ;

-- -----------------------------------------------------
-- Table `pb1a2324_hellyr_live`.`Event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pb1a2324_hellyr_live`.`Event` (
  `eventId` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(100) NOT NULL,
  `dateCreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`eventId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `pb1a2324_hellyr_live`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pb1a2324_hellyr_live`.`User` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`userId`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `pb1a2324_hellyr_live`.`Participant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pb1a2324_hellyr_live`.`Participant` (
  `eventId` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `userId` INT NULL,
  PRIMARY KEY (`eventId`, `name`),
  INDEX `event_idx` (`eventId` ASC),
  INDEX `user_idx` (`userId` ASC),
  CONSTRAINT `fk_participant_event`
    FOREIGN KEY (`eventId`)
    REFERENCES `pb1a2324_hellyr_live`.`Event` (`eventId`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_participant_user`
    FOREIGN KEY (`userId`)
    REFERENCES `pb1a2324_hellyr_live`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `pb1a2324_hellyr_live`.`Payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pb1a2324_hellyr_live`.`Payment` (
  `paymentId` INT NOT NULL AUTO_INCREMENT,
  `datePaid` DATE NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  `amount` DOUBLE NOT NULL,
  `eventId` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`paymentId`),
  INDEX `participant_idx` (`eventId` ASC, `name` ASC),
  CONSTRAINT `fk_payment_participant`
    FOREIGN KEY (`eventId` , `name`)
    REFERENCES `pb1a2324_hellyr_live`.`Participant` (`eventId` , `name`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;

USE `pb1a2324_hellyr_live` ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
