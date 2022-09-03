-- migrate:up
create table membership_benefit(
    id int not null auto_increment primary key,
    benefit varchar(1000),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- migrate:down
drop table membership_benefit;
