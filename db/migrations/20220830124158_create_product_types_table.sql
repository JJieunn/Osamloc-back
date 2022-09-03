-- migrate:up
create table product_types(
    id int not null auto_increment primary key,
    name varchar(15),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);


-- migrate:down
drop table product_types;
