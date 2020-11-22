DROP DATABASE IF EXISTS planning_poker;
CREATE DATABASE planning_poker;
CREATE USER IF NOT EXISTS '<user>'@'<host>' IDENTIFIED WITH mysql_native_password BY '<pass>';
GRANT ALL ON planning_poker.* TO '<user>'@'<host>';

USE planning_poker;
CREATE TABLE player (
 	player_id INT AUTO_INCREMENT PRIMARY KEY,
 	player_name VARCHAR(64) NOT NULL,
 	player_type ENUM('admin', 'voter', 'observer', 'none') NOT NULL,
 	current_room INT,
 	INDEX (current_room)
);

CREATE TABLE room(
	room_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	room_name VARCHAR(64) NOT NULL,
	admin_id INT NOT NULL,
	FOREIGN KEY (admin_id) REFERENCES player(player_id)
);

-- Add after room table exists
ALTER TABLE player
	ADD FOREIGN KEY (current_room)
		REFERENCES room(room_id)
		ON DELETE SET NULL;

CREATE TABLE ticket(
	ticket_id INT PRIMARY KEY AUTO_INCREMENT,
	ticket_name VARCHAR(64) NOT NULL,
	order_index INT NOT NULL,
	state ENUM('incomplete', 'complete', 'skipped'),
	room_id INT NOT NULL,
	FOREIGN KEY (room_id) REFERENCES room(room_id)
);

CREATE TABLE vote(
	player_id INT NOT NULL,
	ticket_id INT NOT NULL,
	vote_value INT NOT NULL,
	PRIMARY KEY (player_id, ticket_id),
	FOREIGN KEY (player_id) REFERENCES player(player_id),
	FOREIGN KEY (ticket_id) REFERENCES ticket(ticket_id)
);