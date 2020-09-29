json.server do
  json.partial! "api/servers/server", server: @server
end

json.channels do
  @server.channels.each do |channel|
    json.extract! #all channel stuff
  end
end
#channel.messages.create(body:"",author_id:1)