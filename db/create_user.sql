insert into robotUsers 
(user_name, img, auth_id)
values
($1, $2, $3)
returning *;

/* 
insert into recfriends values ( 6,'Sammy', 'https://robohash.org/Sammy', 'Female', 'Green', 'Green', 'Rafting', 02, 'March', 2014, false, null, 'Jarr')

*/