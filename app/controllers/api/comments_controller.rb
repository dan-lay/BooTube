class Api::CommentsController < ApplicationController
   wrap_parameters include: Comment.attribute_names + ['commenterId', 'videoId']
   # before_action :require_logged_in, only: [:create, :destroy]

   def create
      @comment = Comment.new(comment_params)
      if @comment.save!
         @video = Video.find("#{@comment.video_id}")
         # render "api/videos/#{@comment.video_id}"
         # render json: {message: "you created a comment"}
         render "api/videos/show"
      else
         render json: {errors: @comment.errors.full_messages }, status: :unprocessable_entity
      end
   end

   def update
      @comment = Comment.find(params[:id])

      if @comment.update!(comment_params)
         @video = Video.find("#{@comment.video_id}")
         # render json: {message: "YOU MADE IT"}
         render "api/videos/show"
      else
         render json: {errors: @comment.errors.full_messages }, status: :unprocessable_entity
      end
   end

   def destroy
      @comment = Comment.find(params[:id])

      if @comment.destroy!
         render json: {message: "comment sucessfully destroyed"}
      else
         render json: { errors: @comments.errors.full_messages }, status: :unprocessable_entity
      end
   end

   private

   def comment_params
      params.require(:comment).permit(:id, :body, :video_id, :commenter_id, :created_at, :updated_at)
   end
end