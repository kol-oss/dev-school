CREATE TABLE users (
    user_id serial PRIMARY KEY,
    first_name varchar(64) NOT NULL,
    last_name varchar(64) NOT NULL,
    password varchar(128) NOT NULL
);

INSERT INTO users (first_name, last_name, password)
VALUES ('Mykola', 'Khozhainov', 'dyakuy_bogu_sho_ne_ipsa') RETURNING *;