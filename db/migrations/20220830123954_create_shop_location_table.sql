-- migrate:up
create table shop_location(
    id int not null auto_increment primary key,
    category_id int not null,
    name varchar(50) not null,
    location varchar(200) not null,
    phone varchar(15) not null,
    is_tea_spot tinyint(1),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    constraint shop_location_category_id_fkey foreign key (category_id) references location_category(id) on delete cascade
);

-- migrate:down
drop table shop_location;
