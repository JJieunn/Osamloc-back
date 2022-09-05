-- migrate:up
create table product_wishlist(
    id int not null auto_increment primary key,
    user_id int,
    product_id int,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    foreign key (user_id) references users (id),
    foreign key (product_id) references products (id)
);

-- migrate:down
drop table product_wishlist;
