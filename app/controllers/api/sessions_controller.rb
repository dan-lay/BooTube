class Api::SessionsController < ApplicationController
   before_action :require_logged_in, only: [:destroy]
   before_action :require_logged_out, only: [:create]
   
   def show
      if current_user
         @user = current_user
         puts @user
         puts "in session show"
         render 'api/users/show'
      else
         render json: { session: nil }
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
      if current_user
         puts "made it to inside the if"
         logout
         head :no_content
      end
   end
end
