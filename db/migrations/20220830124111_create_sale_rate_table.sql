-- migrate:up
create table sale_rate(
    id int not null auto_increment primary key,
    sale int,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- migrate:down
drop table sale_rate;
