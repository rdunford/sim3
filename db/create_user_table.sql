CREATE TABLE IF NOT EXISTS robotUsers (
    id serial primary key,
    user_name VARCHAR(180),
    img text,
    auth_id text,
    gender VARCHAR(10),
    hair_color VARCHAR(20),
    eye_color VARCHAR(20),
    hobby VARCHAR(50),
    birth_day INTEGER,
    birth_month VARCHAR(20),
    birth_year INTEGER
);