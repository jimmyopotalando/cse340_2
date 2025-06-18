CREATE TABLE review (
  review_id SERIAL PRIMARY KEY,
  review_text TEXT NOT NULL,
  review_rating INT CHECK (review_rating BETWEEN 1 AND 5),
  review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  inv_id INT REFERENCES inventory(inv_id),
  account_id INT REFERENCES account(account_id)
);
