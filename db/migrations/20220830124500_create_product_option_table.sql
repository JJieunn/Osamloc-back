-- migrate:up
create table product_option(
    id int not null auto_increment primary key,
    product_id int,
    option_product_id int,
    constraint product_option_product_id_fkey foreign key (product_id) references products(id) on delete cascade,
    constraint product_option_option_product_id_fkey foreign key (option_product_id) references products(id) on delete cascade
);

-- migrate:down
drop table product_option;
