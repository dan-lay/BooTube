class Api::SessionsController < ApplicationController
   before_action :require_logged_in, only: [:destroy]
   before_action :require_logged_out, only: [:create]

   def show
      if current_user
         @user = current_user
         render :show
      else
         render json: { user: nil }
      end
   end

   def create
      email = params[:email]
      password = params[:password]
      @user = User.find_by_credentials(email, password)

      if @user
         login(@user)
         render :show
      else
         render json: { errors: ['Invalid credentials'] }, status: 422
      end
   end

   def destroy
      if current_user
         logout
         head :no_content
      end
   end
end
