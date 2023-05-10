const insert_user = `
INSERT INTO users VALUES($username, $password);
`
const get_user = `
SELECT * FROM users WHERE username = $username;
`
const remove_user =`
DELETE FROM users WHERE username = $username;
`
const insert_room = `
INSERT INTO rooms VALUES(NULL, $name, $password, $p1, NULL);
`
const remove_room =`
DELETE FROM rooms WHERE room_id = $room_id;
`
const get_rooms = `
SELECT * FROM rooms WHERE p1 = $username OR p2 = $username;
`
module.exports = { insert_user, insert_room, remove_user, remove_room, get_user, get_rooms }