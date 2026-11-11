-- Testovací používateľ: admin / admin123 (heslo hashované BCrypt)
INSERT INTO app_users (username, password, role)
VALUES ('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ROLE_ADMIN');

-- Vzoroví zákazníci
INSERT INTO customers (first_name, last_name, email, phone, created_at, updated_at)
VALUES 
('Ján', 'Novák', 'jan.novak@example.sk', '+421901234567', NOW(), NOW()),
('Mária', 'Kováčová', 'maria.kovacova@example.sk', '+421902345678', NOW(), NOW()),
('Peter', 'Horváth', 'peter.horvath@example.sk', '+421903456789', NOW(), NOW());

-- Vzorové SIM karty
INSERT INTO sim_cards (iccid, imsi, type, status, note, customer_id, created_at, updated_at)
VALUES 
('8904212345678901234', '231010123456789', 'PHYSICAL', 'IN_STOCK', 'Nová SIM karta', NULL, NOW(), NOW()),
('8904212345678901235', '231010123456790', 'ESIM', 'IN_STOCK', 'eSIM profil', NULL, NOW(), NOW()),
('8904212345678901236', '231010123456791', 'PHYSICAL', 'ASSIGNED', 'Priradená zákazníkovi', 1, NOW(), NOW()),
('8904212345678901237', '231010123456792', 'ESIM', 'ACTIVE', 'Aktívna eSIM', 2, NOW(), NOW()),
('8904212345678901238', '231010123456793', 'PHYSICAL', 'RESERVED', 'Rezervovaná', NULL, NOW(), NOW());
