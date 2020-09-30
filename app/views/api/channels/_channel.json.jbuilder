json.extract! channel, :id
json.server channel.server_id
json.extract! channel, :name
json.messages channel.message_ids

# channels: {
#   1: {
#     id: 1,
#     server: 1,
#     name: "aasdf",
#     messages: [1,2,3,4,5]
#   },
#   2: {
#     id: 1,
#     server: 1,
#     name: "aasdf",
#     messages: [6,7,8,9,10]
#   }
# }
