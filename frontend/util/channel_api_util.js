export const fetchChannels = (serverId) => (
  $.ajax({
    method: 'GET',
    url: `/api/channels`,
    data: {server_id: `${serverId}`}
  })
);

export const fetchChannel = (channelId) => (
  $.ajax({
    method: 'GET',
    url: `/api/channels/${channelId}`
  })
);

export const createChannel = (channel) => (
  $.ajax({
    method: 'POST',
    url: `/api/channels`,
    data: {channel}
  })
);

export const updateChannel = (channel) => (
  $.ajax({
    method: 'PATCH',
    url: `/api/channels/${channel.id}`,
    data: {channel}
  })
);

export const deleteChannel = (channelId) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/channels/${channelId}`
  })
);