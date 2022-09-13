-- migrate:up
create table location_category (
    id int not null auto_increment primary key,
    name varchar(100) not null);

-- migrate:down
drop table location_category;
