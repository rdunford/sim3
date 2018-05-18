update recfriends
set friend = true,
    friendid = 1
where id = $1;
