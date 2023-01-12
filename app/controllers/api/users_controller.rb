class Api::UsersController < ApplicationController
   wrap_parameters include: User.attribute_names + ['password', 'firstName', 'lastName']
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
         render :update
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

   private

   def user_params
      params.require(:user).permit(:email, :password, :first_name, :last_name, :handle)
   end
end
