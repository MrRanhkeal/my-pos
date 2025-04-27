-- mytable
    create table users(
        id int primary key auto_increment,
        role_id int(11),
        name varchar(120),
        username varchar(255),
        password varchar(255),
        is_active varchar(1),
        create_by varchar(120),
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        foreign key (role_id) references roles(id)
    )
    create table roles(
        id int primary key auto_increment,
        name varchar(255),
        code int(11),
        status boolean default true,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    )
    create table customers(
        id int primary key auto_increment,
        name varchar(120),
        tel varchar(18),
        email varchar(120),
        address text,
        description varchar(120),
        create_by varchar(120),
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    )
    create table category(
        id int primary key auto_increment,
        name varchar(120) not null,
        code int(11) not null,
        description varchar(120),
        status boolean default true,
        create_by varchar(120),
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    )
    create table products(
        id int primary key auto_increment,
        category_id int(11),
        barcode varchar(120),
        name varchar(120),
        brand varchar(120),
        description text,
        qty int(6),
        price DECIMAL(7,2),
        discount DECIMAL(3,2),
        status boolean default true,
        image varchar(255),
        create_by varchar(120),
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        foreign key (category_id) references category(id),
    )
    create table orders(
        id int primary key auto_increment,
        order_no varchar(120),
        customer_id int(11),
        user_id int(11),
        paid_amount  DECIMAL(7,2),
        payment_method varchar(120),
        remark varchar(120),
        create_by varchar(120),
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        foreign key (customer_id) references customers(id)
    )
    create table order_items(
        id int primary key auto_increment,
        order_id int(11),
        proudct_id  int(11),
        qty  int(6),
        price DECIMAL(7,2),
        discount DECIMAL(7,2),
        total DECIMAL(7,2),
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        foreign key (order_id) references orders(id),
        foreign key (product_id) references products(id)
    )
    create table invoices(
        id int primary key auto_increment,
        invoice_no varchar(120),
        customer_id int(11),
        invoice_date  varchar(120),
        order_id int(11),
        product_id int(11),
        total_amount DECIMAL(7,2),
        tax_amount decimal(7,2),
        disconnect_amount decimal(7,2),
        payment_method varchar(120),
        paid_date datetime,
        payment_status varchar(120),
        create_by varchar(120),
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        foreign key (order_id) references orders(id),
        foreign key (product_id) references products(id)
    )
    CREATE TABLE permissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL
    );
    CREATE TABLE role_permissions (
        role_id INT NOT NULL,
        permission_id INT NOT NULL,
        FOREIGN KEY (role_id) REFERENCES roles(id),
        FOREIGN KEY (permission_id) REFERENCES permissions(id)
    );


-- disconnect ERD
    alter table products drop foreign key category_id;

    -- show data type create table
    show create table products

    --check table with data type
        DESCRIBE roles;
    -- drop columnalter syntax
    table roles 
    drop column status;

    -- category drop column
    alter table category drop column code;
    
    --modify column syntax
    alter table roles modify column code varchar(120);

    --update syntax
    update roles set code= 'admin' where id=1;
    -- add foreign key syntax
    alter table orders add foreign key (product_id) references products(id);
    -- add column syntax
    alter table suppliers add column code varchar(12);
    -- rename table syntax
    alter table order_items rename order_detail;
    
    -- rename column syntax
    alter table roles change column code permission varchar(120)