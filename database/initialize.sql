DROP DATABASE IF EXISTS planningpoker;
CREATE DATABASE planningpoker;
CREATE USER IF NOT EXISTS '<user>'@'localhost' IDENTIFIED WITH mysql_native_password BY '<pass>';
GRANT ALL ON planningpoker.* TO '<user>'@'localhost';

USE planningpoker;
CREATE TABLE player (
 	player_id INT AUTO_INCREMENT PRIMARY KEY,
 	player_name VARCHAR(64) NOT NULL,
 	current_room VARCHAR(36),
 	INDEX (current_room)
);

CREATE TABLE room(
	room_id VARCHAR(36) PRIMARY KEY NOT NULL,
	room_name VARCHAR(64) NOT NULL,
	admin_id INT NOT NULL,
	FOREIGN KEY (admin_id) REFERENCES player(player_id),
	UNIQUE (room_name, admin_id)
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
	room_id VARCHAR(36) NOT NULL,
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