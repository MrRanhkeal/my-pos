
create table stock(
    id int primary key auto_increment,
    product_id int(11),
    transaction_type ENUM('IN', 'OUT', 'ADJUST'),
    qty INT,
    reference_type VARCHAR(50),
    notes TEXT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (product_id) references products(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
)

CREATE TABLE supplier (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    code VARCHAR(18),
    phone VARCHAR(18),
    email VARCHAR(120),
    address TEXT,
    description VARCHAR(120),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--add constraint to products table
ALTER TABLE products
ADD COLUMN supplier_id INT,
ADD CONSTRAINT fk_supplier
FOREIGN KEY (supplier_id) REFERENCES supplier(id)
ON DELETE SET NULL
ON UPDATE CASCADE;


CREATE TABLE expense_type (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    code VARCHAR(18),
    create_by INT, -- changed to INT to match users(id)
    description VARCHAR(120),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (create_by) REFERENCES users(id)
);

CREATE TABLE expenses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    expense_type_id INT,
    reference_no VARCHAR(18),
    name VARCHAR(120),
    amount DECIMAL(7,2) DEFAULT 0.00,
    remarks TEXT,
    expense_date DATETIME DEFAULT NULL,
    create_by INT,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (expense_type_id) REFERENCES expense_type(id),
    FOREIGN KEY (create_by) REFERENCES users(id)
);
