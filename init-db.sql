SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema todo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `todo` DEFAULT CHARACTER SET utf8 ;
USE `todo` ;

-- -----------------------------------------------------
-- Table `todo`.`BOARD`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo`.`BOARD` (
  `BOARD_ID` INT NOT NULL AUTO_INCREMENT,
  `USER_ID` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`BOARD_ID`)
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo`.`BOARD_AUTHORITY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo`.`BOARD_AUTHORIBOARD` (
  `AUTHORITY_TYPE` VARCHAR(10) NOT NULL,
  `BOARD_ID` INT NOT NULL,
  `USER_ID` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`AUTHORITY_TYPE`)
 )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo`.`USER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo`.`USER` (
  `ID` VARCHAR(30) NOT NULL,
  `NAME` VARCHAR(20) NOT NULL,
  `PASSWORD` VARCHAR(150) NOT NULL,
  `AUTHORITY` INT(2),
  PRIMARY KEY (`ID`)
    )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo`.`LIST`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo`.`LIST` (
  `BOARD_ID` INT NOT NULL,
  `NAME` VARCHAR(30) NOT NULL,
  `LIST_ID` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`LIST_ID`)
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo`.`CARD`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo`.`CARD` (
  `LIST_ID` INT NOT NULL,
  `CARD_ID` INT NOT NULL AUTO_INCREMENT,
  `TITLE` VARCHAR(100) NOT NULL,
  `CONTENT` TEXT NULL,
  `EXTRA_FILE` VARCHAR(500) NULL,
  `WRITER_ID` VARCHAR(30) NULL,
  PRIMARY KEY (`CARD_ID`)
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo`.`LOG`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo`.`LOG` (
  `BOARD_ID` INT NOT NULL,
  `ACTION` VARCHAR(20) NOT NULL,
  `DATE` DATETIME NOT NULL,
  `USER_ID` VARCHAR(30) NOT NULL,
  `FROM` VARCHAR(30) NULL,
  `TO` VARCHAR(30) NULL,
  `TITLE` VARCHAR(100) NOT NULL
  )
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



-- -----------------------------------------------------
-- 외래키 지정
-- -----------------------------------------------------

ALTER TABLE `todo`.`BOARD` 
ADD FOREIGN KEY (`USER_ID`)
  REFERENCES `todo`.`USER` (`ID`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `todo`.`BOARD_AUTHORITY` 
ADD FOREIGN KEY (`BOARD_ID`)
  REFERENCES `todo`.`BOARD` (`BOARD_ID`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `todo`.`BOARD_AUTHORITY` 
ADD FOREIGN KEY (`USER_ID`)
  REFERENCES `todo`.`USER` (`ID`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `todo`.`CARD` 
ADD FOREIGN KEY (`LIST_ID`)
  REFERENCES `todo`.`LIST` (`LIST_ID`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `todo`.`LIST` 
ADD FOREIGN KEY (`BOARD_ID`)
  REFERENCES `todo`.`BOARD` (`BOARD_ID`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `todo`.`LOG` 
ADD FOREIGN KEY (`BOARD_ID`)
  REFERENCES `todo`.`BOARD` (`BOARD_ID`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;


-- -----------------------------------------------------
-- 데이터 
-- -----------------------------------------------------
-- password: 1111
INSERT INTO USER VALUES ("bella","bella","MydaiqSOqRi9U6kYGql18Vqw0GRTmPWRigBtCGdcHLJ9XGRdvQhO7lbmdeJbpAGfLs6jfKnimVtJ/LEsCWoDLg==",99); 
INSERT INTO USER VALUES ("heesun","heesun","MydaiqSOqRi9U6kYGql18Vqw0GRTmPWRigBtCGdcHLJ9XGRdvQhO7lbmdeJbpAGfLs6jfKnimVtJ/LEsCWoDLg==",10);