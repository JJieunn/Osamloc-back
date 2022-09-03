-- migrate:up
create table detail_images(
    id int not null auto_increment primary key,
    product_id int,
    img_url varchar(2000),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    constraint detail_images_product_id_fkey foreign key (product_id) references products(id) on delete cascade
);

-- migrate:down
drop table detail_images;
