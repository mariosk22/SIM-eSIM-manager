CREATE TABLE phone_reviews (
    id BIGSERIAL PRIMARY KEY,
    sim_card_id BIGINT NOT NULL REFERENCES sim_cards(id) ON DELETE CASCADE,
    author VARCHAR(50) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_phone_reviews_sim_card ON phone_reviews(sim_card_id);
CREATE INDEX idx_phone_reviews_created_at ON phone_reviews(created_at);

INSERT INTO phone_reviews (sim_card_id, author, rating, comment, created_at) VALUES
(4, 'admin', 5, 'Výborná eSIM, aktivácia bola rýchla a bez problémov.', '2025-03-12 10:30:00'),
(4, 'admin', 4, 'Číslo funguje spoľahlivo, len podpora by mohla odpovedať rýchlejšie.', '2025-04-02 14:15:00');
