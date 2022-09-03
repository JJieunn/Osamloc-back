-- migrate:up
create table thumbnail_images(
    id int not null auto_increment primary key,
    default_img varchar(2000),
    hover_img varchar(2000),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- migrate:down
drop table thumbnail_images;
