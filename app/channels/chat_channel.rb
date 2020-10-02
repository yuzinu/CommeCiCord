class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_for 'chat_channel'
  end

  def speak(data)
    message = Message.create(
      body: data['body'], 
      author_id: data['author_id'], 
      messageable_id: data['messageable_id'],
      messageable_type: data['messageable_type']
    )
    socket = { 
      id: message.id, 
      body: message.body, 
      author_id: message.author_id, 
      messageable_id: message.messageable_id, 
      messageable_type: message.messageable_type, 
      created_at: message.created_at
    }
    ChatChannel.broadcast_to('chat_channel', socket)
  end

  # def load
  #   messages = Message.all.collect(&:body)
  #   socket = { messages: messages, type: 'messages' }
  #   ChatChannel.broadcast_to('chat_channel', socket)
  # end

  def unsubscribed; end
end