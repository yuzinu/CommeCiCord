class ServersController < ApplicationController
  def index
    @servers = Server.all
  end

  def create
    @server = Server.new(server_params)
    @server.owner_id = current_user.id
    if @server.save
      # login!(@server)
      render "api/servers/show"
    else
      render json: @server.errors.full_messages, status: 422
    end
  end

  def 
  private

  def server_params
    params.require(:server).permit(:name, :owner_id)
  end
end
