-- migrate:up
create table address (
    id int not null auto_increment primary key,
    user_id int not null,
    name varchar(50) not null,
    phone varchar(15) not null unique,
    zip_code varchar(15) not null,
    address varchar(1000) not null,
    detailed_address varchar(1000),
    default_address char(1),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    foreign key (user_id) references users (id));
    
-- migrate:down
drop table address;
