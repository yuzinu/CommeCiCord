json.extract! server, :id
json.owner server.owner_id
json.extract! server, :name
json.icon url_for(server.icon) if server.icon.attached?
json.channels do
  json.array! server.channel_ids
end

# servers: {
#   1: {
#     id: 1,
#     ownerid_: 1,
#     name: "aasdf",
#     icon: "some_icon.jpg",
#     channels: [1,2,3,4,5]
#   },
#   2: {
#     id: 1,
#     owner_id: 1,
#     name: "aasdf",
#     icon: "some_icon.jpg",
#     channels: [6,7,8,9,10]
#   }
# }
