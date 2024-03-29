export const fetchMessages = (channelId) => (
  $.ajax({
    method: 'GET',
    url: `/api/messages`,
    data: {messageable_type: "Channel",
           messageable_id: `${channelId}`}
  })
);

export const fetchMessage = (messageId) => (
  $.ajax({
    method: 'GET',
    url: `/api/messages/${messageId}`
  })
);

export const createMessage = (message) => (
  $.ajax({
    method: 'POST',
    url: `/api/messages`,
    data: {message}
  })
);

export const updateMessage = (message) => (
  $.ajax({
    method: 'PATCH',
    url: `/api/messages/${message.id}`,
    data: {message}
  })
);

export const deleteMessage = (id) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/messages/${id}`
  })
);