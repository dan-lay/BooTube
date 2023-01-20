json.video do
   json.extract! @video, :id, :title, :description, :uploader_id, :created_at, :updated_at
   json.media_object @video.media_object.url
   json.thumbnail @video.thumbnail
   json.uploaderName @video.uploader.first_name
   json.uploaderHandle @video.uploader.handle
   json.channelIcon @video.uploader.profile_image.url
   json.channelSubCount @video.uploader.subscribers.length                                    #change to username later
   json.set! :comments do
      json.array! @video.comments, :id
   end
   json.likes @video.reactions.likes.length
   json.dislikes @video.reactions.dislikes.length
end

json.comments do
   @video.comments.each do |comment|
      json.set! comment.id do
         json.extract! comment, :id, :body, :commenter_id, :video_id, :created_at, :updated_at
         json.commenterHandle comment.commenter.handle
         json.commenterName comment.commenter.first_name
         json.commenterIcon comment.commenter.profile_image.url
         json.likes comment.reactions.likes.length
         json.dislikes comment.reactions.dislikes.length
      end
   end
end