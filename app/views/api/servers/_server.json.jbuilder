json.owner server.owner_id
json.extract! server, :id, :name
json.icon url_for(server.icon) if server.icon.attached?
json.channels do
  server.channels.each do |channel|
    json.set! channel.id do
      channel
    end
  # json.set! server.channels.map { |channel| channel.id }
end

# servers: {
#   owner: 1,
#   id: 1,
#   name: "aasdf",
#   icon: "some_icon.jpg",
#   channels: [1,2,3,4,5]
# }
