# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri'

User.destroy_all
Server.destroy_all

user1 = User.create!(
  username: "junipoo",
  email: "junipoo@test.com",
  password: "junipoo"
);

user1_avatar = open(
  "https://scontent-ort2-2.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/84347669_196201305091007_7739894654890673432_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com&_nc_cat=111&_nc_ohc=uzvYeQFtfyUAX_FIEJ8&_nc_tp=15&oh=d32147b3a22867860c1cbc8be9e5003c&oe=5F9954E1"
);

user1.avatar.attach(
  io: user1_avatar, 
  filename: 'junipoo_avatar.jpeg', 
  content_type: 'image/jpeg'
);

server1 = Server.create!(
  name: "pubstomperz",
  owner_id: user1.id
);

server1_icon = open(
  "https://scontent-ort2-2.cdninstagram.com/v/t51.2885-15/e35/58468418_111314526749768_4431244839392208551_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com&_nc_cat=108&_nc_ohc=KYGeHDp1JZ8AX8SLHka&_nc_tp=18&oh=025615bd4cb369e3b7e91dced071cfbc&oe=5F9962AC"
);

server1.icon.attach(
  io: server1_icon, 
  filename: 'pubstomperz_icon.jpeg', 
  content_type: 'image/jpeg'
);

membership1 = Membership.create(
  member_id: user1.id,
  joinable_id: server1.id,
  joinable_type: "Server"
)

channel1 = Channel.create(
  name: "general",
  server_id: server1.id
)

message1 = Message.create(
  body: "Welcome to the fam!",
  author_id: user1.id,
  messageable_id: channel1.id,
  messageable_type: "Channel"
)
