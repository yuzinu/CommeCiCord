json.extract! server, :id, :name
json.owner server.owner_id
json.icon(url_for(server.icon)) if server.icon.attached?