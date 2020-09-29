json.user do
  json.partial! "api/users/user", user: @user
end

#channel.messages.create(body:"",author_id:1)