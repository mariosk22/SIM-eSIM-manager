CREATE TABLE app_users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE customers (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

CREATE TABLE sim_cards (
    id BIGSERIAL PRIMARY KEY,
    iccid VARCHAR(22) NOT NULL UNIQUE,
    imsi VARCHAR(15),
    type VARCHAR(10) NOT NULL,
    status VARCHAR(15) NOT NULL,
    note VARCHAR(255),
    customer_id BIGINT REFERENCES customers(id) ON DELETE SET NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

CREATE INDEX idx_sim_cards_status ON sim_cards(status);
CREATE INDEX idx_sim_cards_iccid ON sim_cards(iccid);
CREATE INDEX idx_customers_email ON customers(email);
