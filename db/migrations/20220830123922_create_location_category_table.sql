-- migrate:up
create table location_category(
    id int not null auto_increment primary key,
    name varchar(15)
);

-- migrate:down
drop table location_category;
