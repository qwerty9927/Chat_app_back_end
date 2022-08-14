create table account (
    Username varchar(20) not null PRIMARY KEY,
    Password varchar(72) not null,
    Name varchar(20) not null,
    Image varchar(100) not null,
    DateCreate date not null,
    Status int(2) not null, 
    Role int(2) not null
)

create table groups (
    idRoom varchar(50) not null PRIMARY KEY,
    Name varchar(20) not null,
    Image varchar(100) not null,
    DateCreate date not null,
    Admin varchar(20) not null
)