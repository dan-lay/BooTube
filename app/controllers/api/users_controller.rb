class Api::UsersController < ApplicationController
   wrap_parameters include: User.attribute_names + ['password', 'firstName', 'lastName', 'subscriberId']
   before_action :require_logged_out, only: [:create]
   before_action :require_logged_in, only: [:update]

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
         login(@user)
         render "api/sessions/show"
      else
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
      subscriber = User.find(params[:subscriber_id])

      if @user && subscriber
         if @user.subscribe!(subscriber.id)
            render :show
         else
            render json: {errors: "Unable to subscribe to this channel"}, status: :unprocessable_entity
         end
      else
         render json: {errors: "Can't find accounts to subscribe"}, status: :unprocessable_entity
      end
   end

   def unsubscribe
      @user = User.find(params[:id])
      subscriber = User.find(params[:subscriber_id])

      if @user && subscriber
         if @user.unsubscribe!(subscriber.id)
            puts "succesfully unsubbed"
            render :show
         else
            render json: {errors: "Unable to unsubscribe at this time"}, status: :unprocessable_entity
         end
      else
         render json: {errors: "Unable to find the user you subscribed to"}, status: :unprocessable_entity
      end
   end

   private

   def user_params
      params.require(:user).permit(:email, :password, :first_name, :last_name, :handle, :subscriber_id)
   end
end
