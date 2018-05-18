select * from recfriends
where $1 like $2
and friend != true;