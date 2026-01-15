CREATE TABLE IF NOT EXISTS t_p70214554_forma_design_site.contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contacts_created_at ON t_p70214554_forma_design_site.contacts(created_at DESC);
CREATE INDEX idx_contacts_email ON t_p70214554_forma_design_site.contacts(email);