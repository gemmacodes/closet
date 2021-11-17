

DROP TABLE if exists `items_to_seasons`;

CREATE TABLE `items_to_seasons` (
	`item_id` INT NOT NULL,
	`season_id` INT NOT NULL,
	PRIMARY KEY (`item_id`,`season_id`)
);

DROP TABLE if exists `items_to_colors`;

CREATE TABLE `items_to_colors` (
	`item_id` INT NOT NULL,
	`colors_id` INT NOT NULL,
	PRIMARY KEY (`item_id`,`colors_id`)
);

DROP TABLE if exists `items`;

CREATE TABLE `items` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`image` varchar(400) NOT NULL,
	`category_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

DROP TABLE if exists `seasons`;

CREATE TABLE `seasons` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	PRIMARY KEY (`id`)
);

DROP TABLE if exists `categories`;

CREATE TABLE `categories` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	PRIMARY KEY (`id`)
);

DROP TABLE if exists `colors`;

CREATE TABLE `colors` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	PRIMARY KEY (`id`)
);



ALTER TABLE `items` ADD CONSTRAINT `items_fk0` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`);

ALTER TABLE `items_to_seasons` ADD CONSTRAINT `items_to_seasons_fk0` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`);

ALTER TABLE `items_to_seasons` ADD CONSTRAINT `items_to_seasons_fk1` FOREIGN KEY (`season_id`) REFERENCES `seasons`(`id`);

ALTER TABLE `items_to_colors` ADD CONSTRAINT `items_to_colors_fk0` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`);

ALTER TABLE `items_to_colors` ADD CONSTRAINT `items_to_colors_fk1` FOREIGN KEY (`colors_id`) REFERENCES `colors`(`id`);


INSERT INTO `categories` (name) VALUES ("coats"), ("jackets"), ("sweatshirts"), ("shirts"), ("t-shirts"), ("jeans"), ("trousers"), ("skirts"), ("shorts"), ("dresses"), ("hats"), ("scarves"), ("bags"), ("shoes");

INSERT INTO `colors` (name) VALUES ("red"), ("blue"), ("pink"), ("yellow"), ("brown"), ("purple"), ("black"), ("white"), ("green"), ("orange"), ("gray"), ("beige");

INSERT INTO `seasons` (name) VALUES ("spring"), ("summer"), ("fall"), ("winter");




