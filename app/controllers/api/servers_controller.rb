class Api::ServersController < ApplicationController
  def index
    @servers = Server.with_attached_icon.includes(:channels, :members).all
  end

  def show
    @server = Server.with_attached_icon.includes(:channels).find_by(id: params[:id])
    if @server
      render :show
    else
      render json: ["Server does not exist"], status: 404
    end
  end

  def create
    @server = Server.new(server_params)
    @server.owner_id = current_user.id
    if @server.save
      Membership.create({member_id: current_user.id, joinable: @server})
      Channel.create({name: "general", server_id: @server.id})
      render :show
    else
      render json: @server.errors.full_messages, status: 422
    end
  end

  def update
    @server = Server.find_by(id: params[:id])
    if @server.owner_id === current_user.id
      if @server.update(server_params)
        render :show
      else
        render json: @server.errors.full_messages, status: 422
      end
    else
      render json: ["You do not have permissions to edit this server"], status: 401
    end
  end

  def destroy
    @server = Server.find_by(id: params[:id])
    if @server.owner_id === current_user.id
      if @server.destroy
        render :show
      else
        render json: @server.errors.full_messages, status: 422
      end
    else
      render json: ["You do not have permissions to delete this server"], status: 401
    end
  end

  private

  def server_params
    params.require(:server).permit(:name, :owner_id, :icon)
  end
end
