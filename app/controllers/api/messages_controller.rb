class Api::MessagesController < ApplicationController
  def index
    id, type = params[:messageable_id], params[:messageable_type]

    if type
      @messages = Message.includes(:author).where(messageable_id: id)
    else
      @messages = Message.includes(:author).all
    end
    # @messages = Message.where(messageable_id: params[:messageable_id], messageable_type: "Channel")
    render :index
  end

  def show
    @message = Message.includes(:author).find(params[:id])
    if @message
      render :show
    else
      render json: ["Message does not exist"], status: 404
    end
  end

  def create
    @message = Message.new(message_params)
    if @message.author_id == current_user.id
      if @message.save
        render :show
      else
        render json: @message.errors.full_messages, status: 422
      end
    else
      render json: ["You do not have permissions to create a channel"]
    end
  end

  def update
    @message = Message.find(params[:id])
    if @message && @message.author_id == current_user.id
      if @message.update(message_params)
        socket = JSON.parse(render :show)
        ChatChannel.broadcast_to('chat_channel', socket)
      else
        render json: @message.errors.full_messages, status: 422
      end
    else
      render json: ["You do not have permissions to edit this channel"], status: 401
    end
  end

  def destroy
    @message = Message.includes(:author).find(params[:id])
    if @message.author_id == current_user.id
      if @message.destroy
        render :show
      else
        render json: @message.errors.full_messages, status: 422
      end
    else
      render json: ["You do not have permissions to delete this message"], status: 403
    end
  end

  def message_params
    params.require(:message).permit(:id, :body, :author_id, :messageable_id, :messageable_type)
  end
end
