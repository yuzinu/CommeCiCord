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
  "https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/84347669_196201305091007_7739894654890673432_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=jlMrHeiouJEAX8Y9UQ5&tp=1&oh=9485453d60d8060940e69470ed6c3c2e&oe=6017E4E1"
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
  "https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/58468418_111314526749768_4431244839392208551_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=A6-DmoQIPNkAX-WwOkh&tp=1&oh=77f38ed6911ac4860e8f0f56e42cae7f&oe=6017F2AC"
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
