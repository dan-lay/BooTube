class Api::VideosController < ApplicationController
   wrap_parameters include: Video.attribute_names + [:media_object, :thumbnail]
   before_action :require_logged_in, only: [:update, :destroy, :create]

   def create
      puts video_params
      # @video = Video.new(video_params)

      # if @video.save!
      #    render :show
      # else
      #    render json: {errors: @video.errors.full_messages }, status: 422
      # end
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
         # render "api/videos/show"
         puts "you got a video!"
         render :show
      else
         render json: { errors: ['unable to find video']}, status: :unprocessable_entity
      end
   end

   def update
      # not adding for now
   end

   def destroy
      @video = Video.find(params[:id])

      if @video.destroy
         render json: { message: 'video successfully destroyed' }
      else
         render json: { errors: @video.errors.full_messages }, status: :unprocessable_entity
      end
   end

   def add_view
      @video = Video.find(params[:id])

      if @video
         # if @video.view!()
      else

      end
   end

   private

   def video_params
      params.require(:video).permit(:title, :description, :uploader_id, :media_object, :thumbnail)
   end
end
