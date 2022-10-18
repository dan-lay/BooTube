class Api::CommentsController < ApplicationController
   wrap_parameters include: Comment.attribute_names
   before_action :require_logged_out, only: [:create, :destroy]

   #working on this

   def create
      @comment = Comment.new(comment_params)
      puts @comment
      if @comment.save!
         # render "api/videos/#{@comment.video_id}"
         render json: {message: "you created a comment"}
      else
         render json: {errors: @comment.errors.full_messages }, status: :unprocessable_entity
      end
   end

   def index

   end

   def destroy

   end

   private

   def comment_params
      params.require(:comment).permit(:body, :video_id, :commenter_id)
   end
end