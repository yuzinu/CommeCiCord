class Api::UsersController < ApplicationController
  def index
    @users = User.with_attached_avatar.includes(:own_servers).all
  end

  def show
    @user = User.with_attached_avatar.includes(:own_servers).find(params[:id])
    if @user
      render :show
    else
      render json: ["User does not exist"], status: 404
    end
  end

  def create
    @user = User.new(user_params)
    # TODO ADD AVATAR FUNCTIONALITY
    # if params[:avatar]
    #   @user.avatar.attach(
    #     io: params[:avatar], 
    #     filename: `#{@user.username}_avatar.jpeg`, 
    #     content_type: 'image/jpeg'
    #   )
    # else
    #   @user.avatar.attach(
    #     io: @user.username
    #   )
    # end
    if @user.save
      login!(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(params[:id])
    if params[:id] == "1"
      render json: ["You cannot change demo user credentials"], status: 403
    elsif @user.update(user_params)
      render "/api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  # TODO method to delete user
  # they must first transfer server ownerships first or delete all owned servers
  def destroy
    @user = User.find(params[:id])
    if @user.own_servers.length == 0
      if @user.destroy
        render "/api/users/show"
      else
        render json: @user.errors.full_messages, status: 422
      end
    else
      render json: ["Please transfer ownership of all servers or delete all servers your own"], status: 403
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :avatar)
  end
end
