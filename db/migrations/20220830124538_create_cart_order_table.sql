-- migrate:up
create table cart_order(
    id int not null auto_increment primary key,
    user_id int not null,
    product_id int not null,
    quantity int not null,
    status char(1),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    constraint cart_order_user_id_fkey foreign key (user_id) references users(id) on delete cascade,
    constraint cart_order_product_id_fkey foreign key (product_id) references products(id) on delete cascade
);

-- migrate:down
drop table cart_order;
