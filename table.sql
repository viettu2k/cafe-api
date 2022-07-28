create table user(
  id int primary key AUTO_INCREMENT,
  name varchar(255),
  contact varchar(20),
  email varchar(50),
  password varchar(255),
  status varchar(20),
  role varchar(20),
  UNIQUE (email)
)

insert into user(name, contact, email, password, status, role) values('Admin', '0373686373', 'admin@gmail.com', 'admin', 'true','admin')

create table category(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  primary key (id)
)