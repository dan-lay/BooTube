class Api::VideosController < ApplicationController
   wrap_parameters include: Video.attribute_names

   before_action :require_logged_in, only: [:destroy, :create, :update]

   def create
      @video = Video.new(video_params)
      puts @video
      if @video.save
         render :show
      else
         render json: {errors: @video.errors.full_messages }, status: :unprocessable_entity
      end
   end

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

   def update

   end

   def destroy

   end

   private

   def video_params
      params.require(:video).permit(:title, :description)
   end
end
