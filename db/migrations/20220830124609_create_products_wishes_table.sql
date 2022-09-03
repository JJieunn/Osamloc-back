-- migrate:up
create table products_wishes(
    id int not null auto_increment primary key,
    user_id int not null,
    product_id int not null,
    constraint products_wishes_user_id_fkey foreign key (user_id) references users(id) on delete cascade,
    constraint products_wishes_product_id_fkey foreign key (product_id) references products(id) on delete cascade
);

-- migrate:down
drop table products_wishes;
