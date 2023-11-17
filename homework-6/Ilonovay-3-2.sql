SELECT COUNT(DISTINCT district)
FROM address
INNER JOIN customer ON customer.address_id = address.address_id
