class Api::UsersController < ApplicationController
   wrap_parameters include: User.attribute_names + [:password]
   before_action :require_logged_out, only: [:create, :check_email]
   before_action :require_logged_in, only: [:update, :destroy, :subscribe, :unsubscribe]

   def show
      @user = User.find_by(handle: params[:handle])

      if @user
         render :show
      else
         render json: {errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
   end

   def create
      @user = User.new(user_params)
   
      if @user.save!
         puts "SAVED!~!!!!!"
         login(@user)
         render "api/sessions/show"
      else
         puts "YOU FUCKED UP!!!"
         render json: {errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
   end

   def update
      @user = User.find(params[:id])

      if @user.update!(user_params)
         puts "FOUND USER!!!!!!!!!!!!!!!!!!!!!!!!"
         render :show
      else
         render json: {errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
   end

   def destroy
      @user = User.find(params[:id])

      if @user.destroy!
         head :no_content
      else
         render json: {errors: @user.errors.full_messages }, status: :unprocessable_entity
      end         
   end
   
   def subscribe
      @user = User.find(params[:id])

      if @user.subscribe!(current_user.id)
         render :show
      else
         render json: {errors: "Unable to subscribe to this channel"}, status: :unprocessable_entity
      end
   end

   def unsubscribe
      @user = User.find(params[:id])

      if @user.unsubscribe!(current_user.id)
         puts "succesfully unsubbed"
         render :show
      else
         render json: {errors: "Unable to unsubscribe at this time"}, status: :unprocessable_entity
      end
   end

   def check_email
      @user = User.find_by(email: params[:email])
      puts @user
      puts params

      if @user
         render :password_check
      else
         render json: {errors: ["Couldn't find your Boogle Account"]}, status: 422
      end
   end

   private

   def user_params
      params.require(:user).permit(:email, :password, :first_name, :profile_image, :last_name, :handle)
   end
end
