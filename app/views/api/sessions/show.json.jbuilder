json.user do
   json.extract! @user, :id, :email, :first_name, :last_name, :handle, :created_at, :updated_at
   json.sessionUserPic @user.profile_image.url
   json.subbedChannelIds @user.subscribed_channels.map { |channel| channel.id }
   json.myVideoIds @user.videos.map { |video| video.id}
end

json.subbedChannels do
   @user.subscribed_channels.each do |channel|
      json.set! channel.id, channel
   end
end