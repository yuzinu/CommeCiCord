json.partial! "api/channels/channel", channel: @channel

# json.messages do
#   @channel.messages.each do |message|
#     json.partial! "api/messages/message", message: message
#   end
# end

#channel.messages.create(body:"",author_id:1)