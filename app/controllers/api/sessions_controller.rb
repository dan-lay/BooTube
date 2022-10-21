class Api::SessionsController < ApplicationController
   before_action :require_logged_in, only: [:destroy]
   before_action :require_logged_out, only: [:create]
   
   def show
      if current_user
         @user = current_user
         puts session
         puts "there is someone here"
         render 'api/users/show'
      else
         puts "there is noone here"
         render json: { user: nil }
      end
   end

   def create
      email = params[:email]
      password = params[:password]
      @user = User.find_by_credentials(email, password)
      if @user
         login(@user)
         render 'api/users/show'
      else
         render json: { errors: ['Invalid credentials'] }, status: 422
      end
   end

   def destroy
      p "check for current user"
      p current_user
      logout
      render json: { message: 'success' }
      # head :no_content
   end
end
