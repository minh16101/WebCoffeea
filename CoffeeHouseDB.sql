CREATE DATABASE CoffeeHouseDB
CREATE SCHEMA product;

Use CoffeeHouseDB;
create schema product
CREATE TABLE product.categories(
	category_id int identity primary key,
	category_name varchar(255) not null
);
insert into product.categories(
	category_name
)values(
	'Cake'
);
CREATE TABLE product.brands(
	brand_id int identity primary key,
	brand_name varchar(255) not null
);
insert into product.brands(
	brand_name
)values(
	'From Company'
);
CREATE TABLE product.size(
	size_id int identity primary key,
	size_name varchar(10) not null
);

CREATE TABLE product.productions(
	product_id int identity primary key,
	product_name varchar(255) not null,
	product_price int not null,
	size_id int not null,
	product_image image not null,
	brand_id INT,
	category_id INT,
	FOREIGN KEY (brand_id)
		REFERENCES product.brands(brand_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (category_id)
		REFERENCES product.categories(category_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (size_id)
		REFERENCES product.size(size_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
)
create table product.stocks(
	product_id int primary key,
	quantity int not null default 0,
	FOREIGN KEY (product_id) 
        REFERENCES product.productions(product_id) 
        ON DELETE CASCADE ON UPDATE CASCADE
);
insert into product.productions(
	product_name,
	product_price,
	brand_id,
	category_id,
	size_id,
	product_image
) select
	'Banh Ngot',
	80000,
	5,
	6,
	2,
	BulkColumn FROM OPENROWSET(BULK N'D:\CC++\BanhNgot.jpg', SINGLE_BLOB) image;

insert into product.size(
	size_name
)values(
	'To'
);

INSERT INTO [dbo].[SaveFiles] (Name,number, Files)
SELECT 'Home Page 2',123, 
	BulkColumn FROM OPENROWSET(BULK N'D:\CC++\2022-02-23.png', SINGLE_BLOB) image;

Select * from [SaveFiles]