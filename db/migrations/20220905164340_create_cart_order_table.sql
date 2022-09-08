-- migrate:up
create table cart_order (
    id int not null auto_increment primary key,
    user_id int not null,
    product_id int not null,
    quantity int default 1,
    status char(1) default 1,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    foreign key (user_id) references users (id),
    foreign key (product_id) references products (id));
    
-- migrate:down
drop table cart_order;
