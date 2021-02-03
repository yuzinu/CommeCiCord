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

user1_avatar = File.open(File.join(Rails.root,'app/assets/images/juni_avatar.jpg'));

user1.avatar.attach(
  io: user1_avatar, 
  filename: 'junipoo_avatar.jpeg', 
  content_type: 'image/jpeg'
);

server1 = Server.create!(
  name: "pubstomperz",
  owner_id: user1.id
);

server1_icon = File.open(File.join(Rails.root,'app/assets/images/jumi_avatar.jpg'));

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
