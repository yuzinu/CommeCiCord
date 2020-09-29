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

    if @user.save
      login!(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render "/api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  # TODO method to delete user
  # they must first transfer server ownerships first or delete all owned servers
  # def destroy
  #   @user = User.find(params[:id])
  #   if @user.servers.length == 0 && @user.destroy
  #     render ""
  #   else
  #     render json: @user.errors.full_messages, status: 422
  #   end
  # end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
end
