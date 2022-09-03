-- migrate:up
create table category(
    id int not null auto_increment primary key,
    name varchar(30),
    parent_id int,
    level int,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    constraint category_parent_id_fkey foreign key (parent_id) references category(id) on delete cascade
);

-- migrate:down
drop table category;
