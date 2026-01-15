CREATE TABLE IF NOT EXISTS t_p70214554_forma_design_site.projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    year VARCHAR(4) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_projects_category ON t_p70214554_forma_design_site.projects(category);
CREATE INDEX idx_projects_created_at ON t_p70214554_forma_design_site.projects(created_at DESC);