class Api::VideosController < ApplicationController
   wrap_parameters include: Video.attribute_names

   # def create
   #    @user = User.new(user_params)
   #    puts @user
   #    if @user.save
   #       login(@user)
   #       render :show
   #    else
   #       render json: {errors: @user.errors.full_messages }, status: :unprocessable_entity
   #    end
   # end

   def index
      @videos = Video.all

      if @videos
         render :index
      else
         render json: { errors: @videos.errors.full_messages }, status: 422
      end
   end

   def show
      @video = Video.find(params[:id])

      if @video
         render :show
      else
         render json: { errors: ['unable to grab the thing']}, status: :unprocessable_entity
      end
   end

   private

   def video_params
      params.require(:video).permit(:title, :description)
   end
end
