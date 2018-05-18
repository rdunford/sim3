select * from recfriends
where friendid = 
(select id from robotusers
where id = 1)
-- or $1 but not using session