CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `role_id` int,
  `name` varchar(120),
  `username` varchar(120),
  `password` varchar(120),
  `is_active` varchar(120),
  `create_by` varchar(120),
  `create_at` timestamp
);
insert into users (role_id, name, username, password, create_by) 
  values (1, 'dara', 'dara@gmail.com', '123', 'admin');

CREATE TABLE `roles` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(120),
  `code` int
);
insert into roles (name, code) values ('admin', 1);

CREATE TABLE `customers` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(120),
  `phone` varchar(18),
  `email` varchar(120),
  `address` text,
  `description` varchar(120),
  `create_by` varchar(120),
  `create_at` timestamp
);
insert into customers (name, phone, email, address, description, create_by) 
  values ('dara', '012-12-13-14', 'dara@gmail.com', 'pp', 'cust', 'admin');

CREATE TABLE `category` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `code` int(11),
  `description` varchar(120),
  `status` boolean
);
insert into category (name, code, description, status) values ('coffee', 1, 'coffee', true);

CREATE TABLE `products` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `category_id` int,
  `productype_id` int,
  `name` varchar(120),
  `barcode` varchar(120),
  `brand` varchar(120),
  `description` text,
  `qty` int(6),
  `price` DECIMAL(7,2),
  `discount` DECIMAL(3,2),
  `status` tinyint(1),
  `image` blob,
  `create_by` varchar(120),
  `create_at` timestamp
);
insert into products (category_id, productype_id, name, barcode, brand, description, qty, price, discount, status, image, create_by) 
  values (1, 1, 'coffee', '123', 'coffee', 'coffee', 10, 100, 0, 1, null, 'admin');

CREATE TABLE `product_image` (
  `id` int(11),
  `product_id` int(11),
  `image` blob
);

CREATE TABLE `orders` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `customer_id` int,
  `order_no` varchar(120),
  `user_id` int(11),
  `paid_amount` DECIMAL(7,2),
  `payment_method` varchar(120),
  `remark` text,
  `create_by` varchar(120),
  `create_at` timestamp
);
insert into orders (customer_id, order_no, user_id, paid_amount, payment_method, remark, create_by) 
  values (1, '123', 1, 100, 'cash', 'remark', 'admin');

CREATE TABLE `order_items` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `order_id` int,
  `product_id` int,
  `qty` int(6),
  `price` DECIMAL(7,2),
  `discount` DECIMAL(7,2),
  `total` DECIMAL(7,2),
  `create_at` timestamp
);
insert into order_items (order_id, product_id, qty, price, discount, total) 
  values (1, 1, 10, 100, 0, 1000);

CREATE TABLE `invoices` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `invoice_no` varchar(120),
  `customer_id` int(11),
  `invoice_date` datetime,
  `order_id` int,
  `prduct_id` int,
  `total_amount` DECIMAL(7,2),
  `tax_amount` decimal(7,2),
  `discount_amount` decimal(7,2),
  `payment_method` varchar(120),
  `paid_date` datetime,
  `payment_status` varchar(120),
  `create_by` varchar(120),
  `create_at` timestamp
);

CREATE TABLE `product_type` (
  `pro_type_id` int PRIMARY KEY AUTO_INCREMENT,
  `product_type_name` VARCHAR(255),
  `image` blob,
  `create_at` timestamp
);
insert into product_type (product_type_name, image) values ('coffee', null);

CREATE TABLE `purchase` (
  `purchase_id` int PRIMARY KEY AUTO_INCREMENT,
  `supplier_id` int,
  `shipp_company` varchar(120),
  `ship_cost` decimal,
  `paid_amount` decimal,
  `paid_date` datetime,
  `status` boolean,
  `create_at` timestamp
);
insert into purchase (supplier_id, shipp_company, ship_cost, paid_amount, paid_date, status) 
  values (1, 'dara', 100, 100, now(), true);

CREATE TABLE `purchase_products` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `purchase_id` int,
  `product_id` int,
  `qty` int,
  `cost` decimal,
  `discount` decimal,
  `amount` decimal,
  `retail_price` decimal,
  `remark` text,
  `status` boolean,
  `create_at` timestamp
);
insert into purchase_products (purchase_id, product_id, qty, cost, discount, amount, retail_price, remark)  
  values (1, 1, 10, 100, 0, 1000, 100, 'remark');

CREATE TABLE `suppliers` (
  `supplier_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(120),
  `phone` varchar(18),
  `email` varchar(120),
  `address` text,
  `description` varchar(120),
  `create_at` timestamp
);
insert into suppliers (name, phone, email, address, description) 
  values ('dara', '123', '123', '123', '123');

CREATE TABLE `permissions` (
  `id` int,
  `name` varchar(120)
);
insert into permissions (id, name) values (1, 'admin'); 

CREATE TABLE `role_permissions` (
  `role_id` int,
  `permission_id` int
);
insert into role_permissions (role_id, permission_id) values (1, 1);  


ALTER TABLE `users` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`productype_id`) REFERENCES `product_type` (`pro_type_id`);

ALTER TABLE `product_image` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `invoices` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

ALTER TABLE `invoices` ADD FOREIGN KEY (`prduct_id`) REFERENCES `products` (`id`);

ALTER TABLE `purchase` ADD FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`);

ALTER TABLE `purchase_products` ADD FOREIGN KEY (`purchase_id`) REFERENCES `purchase` (`purchase_id`);

ALTER TABLE `purchase_products` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `role_permissions` ADD FOREIGN KEY (`id`) REFERENCES `roles` (`id`);

ALTER TABLE `role_permissions` ADD FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`);