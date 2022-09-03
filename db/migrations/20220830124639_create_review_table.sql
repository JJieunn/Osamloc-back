-- migrate:up
create table review(
    id int not null auto_increment primary key,
    user_id int not null,
    product_id int not null,
    contents varchar(2000),
    image_url varchar(2000),
    rate int,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    constraint review_user_id_fkey foreign key (user_id) references users(id) on delete cascade,
    constraint review_product_id_fkey foreign key (product_id) references products(id) on delete cascade
);

-- migrate:down
drop table review;
