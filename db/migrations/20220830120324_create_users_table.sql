-- migrate:up
create table users(
    id int not null auto_increment primary key,
    account varchar(15) not null unique,
    name varchar(50) not null,
    password varchar(3000) not null,
    birth varchar(10) not null,
    phone varchar(15) not null unique,
    membership_id int not null default 1,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    constraint users_membership_id_fkey foreign key (membership_id) references membership(id) on delete cascade
);

-- migrate:down
drop table users;
