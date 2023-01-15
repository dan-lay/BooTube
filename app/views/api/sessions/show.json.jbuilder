json.user do
   json.extract! @user, :id, :email, :first_name, :last_name, :handle, :created_at, :updated_at
   json.sessionUserPic @user.profile_image.url
   json.set! :subscribedChannels do
      @user.subscribed_channels.each do |channel|
         json.set! channel.id, channel.handle
      end
   end
end