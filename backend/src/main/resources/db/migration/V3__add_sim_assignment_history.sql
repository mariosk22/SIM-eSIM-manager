CREATE TABLE sim_assignment_history (
    id BIGSERIAL PRIMARY KEY,
    sim_card_id BIGINT NOT NULL REFERENCES sim_cards(id) ON DELETE CASCADE,
    customer_id BIGINT REFERENCES customers(id) ON DELETE SET NULL,
    assigned_at TIMESTAMP NOT NULL,
    unassigned_at TIMESTAMP,
    note VARCHAR(255)
);

CREATE INDEX idx_history_sim_card ON sim_assignment_history(sim_card_id);
CREATE INDEX idx_history_customer ON sim_assignment_history(customer_id);
CREATE INDEX idx_history_assigned_at ON sim_assignment_history(assigned_at);

INSERT INTO sim_assignment_history (sim_card_id, customer_id, assigned_at, unassigned_at, note) VALUES
(1, 1, '2023-01-10 09:00:00', '2023-06-15 14:30:00', 'Pôvodné priradenie, SIM bola vrátená'),
(3, 1, '2024-01-15 10:00:00', NULL, 'Aktuálne priradenie SIM karty'),
(4, 3, '2023-05-01 08:00:00', '2025-03-10 12:00:00', 'Predchádzajúci vlastník čísla'),
(4, 2, '2025-03-10 12:00:00', NULL, 'Aktuálny vlastník čísla');
