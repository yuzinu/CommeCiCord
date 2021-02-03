class Api::ChannelsController < ApplicationController
  def index
    # @channels = Channel.includes(:messages).where(server_id: params[:server_id])
    @channels = Channel.includes(:messages).where(server_id: params[:server_id])
    render :index
  end

  def show
    @channel = Channel.includes(:messages).find(params[:id])
    if @channel
      render :show
    else
      render json: ["Channel does not exist"], status: 404
    end
  end

  def create
    @channel = Channel.new(channel_params)
    @channel.server_id = params[:channel][:server_id]
    if @channel.server.owner.id == current_user.id
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
    if @channel.owner_id == current_user.id
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
    params.require(:channel).permit(:name, :server_id)
  end
end
