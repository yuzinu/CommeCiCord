json.extract! user, :id, :username, :email
json.avatar(url_for(user.avatar)) if user.avatar.attached?
json.own_servers do
  json.array! user.own_servers.ids
end