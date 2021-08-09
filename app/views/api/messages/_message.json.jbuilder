json.extract! message, :id
json.author_id message.author.id
json.author message.author.username
json.avatar(url_for(message.author.avatar)) if message.author.avatar.attached?
json.created_at message.created_at.strftime("%m/%d/%Y %-I:%M %p")
json.updated_at message.updated_at.strftime("%m/%d/%Y %-I:%M %p")
json.type message.messageable_type
json.channel_id message.messageable_id if message.messageable_type == "Channel"
json.dm_id message.messageable_id if message.messageable_type == "DM"
json.extract! message, :body

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
