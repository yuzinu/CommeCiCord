class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      login!(@user)
      render "api/users/show"
    else
      render json: ["Password does not match"], status: 401
    end
  end

  def destroy
    @user = current_user
    if @user
      logout!
      render "api/users/show"
    else
      render json: ["You done goofed"], status: 404
    end
  end
end
