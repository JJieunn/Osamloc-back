-- migrate:up
create table products(
    id int not null auto_increment primary key,
    name varchar(50) not null, 
    description varchar(3000),
    type_id int,
    price_origin DECIMAL(6,3) not null,
    category_id int not null,
    thumbnail_id int not null,
    sale_rate_id int,
    sale_price DECIMAL(6,3),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    constraint products_type_id_fkey foreign key (type_id) references product_types(id) on delete cascade,
    constraint products_category_id_fkey foreign key (category_id) references category(id) on delete cascade,
    constraint products_thumbnail_id_fkey foreign key (thumbnail_id) references thumbnail_images(id) on delete cascade,
    constraint products_sale_rate_id foreign key (sale_rate_id) references sale_rate(id) on delete cascade
);

-- migrate:down
drop table products;
