CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

SELECT uuid_generate_v1();
SELECT uuid_generate_v4();

CREATE TABLE categories (
    cateId uuid DEFAULT uuid_generate_v4 (),
    cateName VARCHAR
);

CREATE TABLE users (
    userId uuid DEFAULT uuid_generate_v4 (),
    userName VARCHAR
);

CREATE TABLE products (
    prodId uuid DEFAULT uuid_generate_v4 (),
    name VARCHAR,
	CategoryId uuid,
	stock INT,
	price FLOAT(53)
);

CREATE TABLE itemproducts (
    cartId uuid DEFAULT uuid_generate_v4 (),
    ProductId uuid,
	qty INTEGER,
	subTotal FLOAT(53),
	UserId uuid
);

CREATE TABLE orders (
    orderId uuid DEFAULT uuid_generate_v4 (),
    orderNo VARCHAR,
	UserId uuid,
	totalPrice FLOAT(53),
	status VARCHAR
);

CREATE TABLE orderlineitems (
    orderLineId uuid DEFAULT uuid_generate_v4 (),
    ProductId uuid,
	qty INT,
	subTotal FLOAT(53),
	OrderId uuid
);

CREATE TABLE cart (
    CartId uuid
);

INSERT INTO categories(cateName)
VALUES ('Furniture'),
('Electronic'),
('Food And Beverage');

INSERT INTO products(name, CategoryId, stock, price)
VALUES 
    ('Chair Informa', '4ce974ec-4507-491c-b199-f4f0c54d9700', 20, 100000),
    ('Drawer Ace Hardware', '4ce974ec-4507-491c-b199-f4f0c54d9700', 20, 250000),
    ('Table IKEA', '4ce974ec-4507-491c-b199-f4f0c54d9700', 20, 220000),
    ('French Fry Mcdonald', 'db163dbe-e72a-4689-9619-b6717fc27cef', 20, 40000),
    ('Kitkat', 'db163dbe-e72a-4689-9619-b6717fc27cef', 20, 8000),
    ('Fiesta Nugget', 'db163dbe-e72a-4689-9619-b6717fc27cef', 20, 39000),
    ('Samsung Cable', '7b131cdc-a9e3-46f9-b787-d56c51ba74a0', 20, 20000),
    ('Media Tech Ethernet Cable', '7b131cdc-a9e3-46f9-b787-d56c51ba74a0', 20, 109000),
    ('Powerbank Baseus', '7b131cdc-a9e3-46f9-b787-d56c51ba74a0', 20, 300000)

INSERT INTO users(userName)
VALUES
    ('nikkoprasetyo'),
    ('smithyjansen')
	
ALTER TABLE categories ADD CONSTRAINT unique_cateid UNIQUE (cateId);
ALTER TABLE users ADD CONSTRAINT unique_userId UNIQUE (userId);
ALTER TABLE products ADD CONSTRAINT unique_prodId UNIQUE (prodId);
ALTER TABLE orders ADD CONSTRAINT unique_orderId UNIQUE (orderId);
ALTER TABLE orderlineitems ADD CONSTRAINT unique_orderLineId UNIQUE (orderLineId);
ALTER TABLE itemproducts ADD CONSTRAINT unique_itemproducts UNIQUE (ProductId);
ALTER TABLE cart ADD CONSTRAINT unique_CartId UNIQUE (CartId);

ALTER TABLE products
    ADD CONSTRAINT fk_products_categories
    FOREIGN KEY (CategoryId) 
    REFERENCES categories (cateid);
	
ALTER TABLE itemproducts
    ADD CONSTRAINT fk_itemproducts_products
    FOREIGN KEY (ProductId) 
    REFERENCES products (prodId);
	
ALTER TABLE itemproducts
    ADD CONSTRAINT fk_itemproducts_users
    FOREIGN KEY (UserId) 
    REFERENCES users (userId);
	
ALTER TABLE orders
    ADD CONSTRAINT fk_orders_users
    FOREIGN KEY (UserId) 
    REFERENCES users (userId);
	
ALTER TABLE orderlineitems
    ADD CONSTRAINT fk_orderlineitems_orders
    FOREIGN KEY (OrderId) 
    REFERENCES orders (orderId);
	
ALTER TABLE cart
    ADD CONSTRAINT fk_cart_itemproducts
    FOREIGN KEY (CartId) 
    REFERENCES itemproducts (ProductId);