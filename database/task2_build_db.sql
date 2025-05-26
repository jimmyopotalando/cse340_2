CREATE TYPE account_type AS ENUM ('Client', 'Admin');
CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    account_firstname VARCHAR(50) NOT NULL,
    account_lastname VARCHAR(50) NOT NULL,
    account_email VARCHAR(100) UNIQUE NOT NULL,
    account_password VARCHAR(255) NOT NULL,
    account_type account_type DEFAULT 'Client'
);
CREATE TABLE classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR(30) NOT NULL
);
CREATE TABLE inventory (
    inv_id SERIAL PRIMARY KEY,
    inv_make VARCHAR(50) NOT NULL,
    inv_model VARCHAR(50) NOT NULL,
    inv_description TEXT NOT NULL,
    inv_image TEXT,
    inv_thumbnail TEXT,
    inv_price NUMERIC(10, 2) NOT NULL,
    inv_year INT NOT NULL,
    inv_miles INT,
    inv_color VARCHAR(30),
    classification_id INT REFERENCES classification(classification_id)
);
INSERT INTO classification (classification_name)
VALUES ('Sport'),
    ('SUV'),
    ('Truck'),
    ('Sedan');
INSERT INTO inventory (
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color,
        classification_id
    )
VALUES (
        'GM',
        'Hummer',
        'A powerful SUV with small interiors',
        '/images/hummer.jpg',
        '/images/thumbs/hummer.jpg',
        65000.00,
        2021,
        5000,
        'Black',
        2
    ),
    (
        'Ford',
        'Mustang',
        'A classic sport car with excellent handling',
        '/images/mustang.jpg',
        '/images/thumbs/mustang.jpg',
        55000.00,
        2022,
        3000,
        'Red',
        1
    ),
    (
        'Chevrolet',
        'Camaro',
        'A modern sport coupe',
        '/images/camaro.jpg',
        '/images/thumbs/camaro.jpg',
        48000.00,
        2022,
        2000,
        'Blue',
        1
    );
UPDATE inventory
SET inv_description = REPLACE(
        inv_description,
        'small interiors',
        'a huge interior'
    )
WHERE inv_make = 'GM'
    AND inv_model = 'Hummer';
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');