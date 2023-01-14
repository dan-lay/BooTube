json.video do
   json.extract! @video, :id, :title, :description, :uploader_id, :created_at, :updated_at
   json.media_object @video.media_object.url
   json.uploaderName @video.uploader.first_name                                      #change to username later
   json.set! :comments do
      json.array! @video.comments, :id
   end
   json.likes @video.reactions.where(is_like: true).length
   json.dislikes @video.reactions.where(is_like: false).length
end

json.comments do
   @video.comments.each do |comment|
      json.set! comment.id do
         json.extract! comment, :id, :body, :commenter_id, :video_id, :created_at, :updated_at
         json.commenterName comment.commenter.first_name
         json.likes comment.reactions.where(is_like: true).length
         json.dislikes comment.reactions.where(is_like: false).length
      end
   end
end