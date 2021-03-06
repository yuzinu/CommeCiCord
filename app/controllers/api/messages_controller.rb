class Api::MessagesController < ApplicationController
  def index
    @messages = Message.includes(:author).all
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
    @message.channel_id = params[:message][:channel_id]
    if message.author.id == current_user.id
      if @channel.save
        render :show
      else
        render json: @channel.errors.full_messages, status: 422
      end
    else
      render json: ["You do not have permissions to create a channel"]
    end
  end

  def update
    @channel = Channel.find_by(id: params[:id])
    if @channel.server.owner.id == current_user.id
      if @channel.update(channel_params)
        render :show
      else
        render json: @channel.errors.full_messages, status: 422
      end
    else
      render json: ["You do not have permissions to edit this channel"], status: 401
    end
  end

  def destroy
    @channel = Channel.find_by(id: params[:id])
    if @channel.owner_id === current_user.id
      if @channel.destroy
        render :show
      else
        render json: @channel.errors.full_messages, status: 422
      end
    else
      render json: ["You do not have permissions to delete this channel"], status: 401
    end
  end

  def channel_params
    params.require(:channel).permit(:body, :author_id, :messageable_id, :messageable_type)
  end
end
