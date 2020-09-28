json.extract! user, :id, :username, :email
json.avatar(url_for(user.avatar)) if user.avatar.attached?