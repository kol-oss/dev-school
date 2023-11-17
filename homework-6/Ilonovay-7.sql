INSERT INTO city (city, country_id)
VALUES ('Hadiach', (SELECT country_id FROM country WHERE country.country = 'Ukraine'))
RETURNING *;