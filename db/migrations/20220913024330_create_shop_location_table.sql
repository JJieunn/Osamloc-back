-- migrate:up
create table shop_location (
    id int not null auto_increment primary key,
    category_id int,
    name varchar(100) not null,
    phone varchar(15),
    is_tea_spot tinyint,
    location varchar(1000) not null,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    foreign key (category_id) references location_category (id));
    
-- migrate:down
drop table shop_location;
