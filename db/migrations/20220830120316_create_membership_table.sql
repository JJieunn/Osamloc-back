-- migrate:up
create table membership(
    id int not null auto_increment primary key,
    benefit_id int not null,
    grade varchar(10) not null,
    monthly_purchase_amount DECIMAL(6,3),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    constraint membership_benefit_id_fkey foreign key (benefit_id) references membership_benefit(id) on delete cascade
);

-- migrate:down
drop table membership;
