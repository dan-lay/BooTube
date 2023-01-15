# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  first_name      :string           not null
#  last_name       :string           not null
#  handle          :string
#
class User < ApplicationRecord
   has_secure_password

   before_validation :ensure_session_token
   validates :email, uniqueness: true, length: { in: 3..255, message: "Email must be between 3 and 255 characters long"}, format: { with: URI::MailTo::EMAIL_REGEXP, message: "Incorrect email format" }
   validates :session_token, presence: true, uniqueness: true
   validates :password, length: { in: 6..255, message: "Password must be atleast 6 characters long"}, allow_nil: true
   validates :first_name, presence: true
   validates :last_name, presence: true
   validates :handle, presence: true, length: { maximum: 30 }

   has_one_attached :profile_image

   has_many :videos,
      class_name: :Video,
      foreign_key: :uploader_id,
      dependent: :destroy

   has_many :videoComments,
      foreign_key: :commenter_id,
      class_name: :Comment,
      dependent: :destroy

   has_many :views,
      foreign_key: :viewer_id,
      class_name: :View

   has_many :viewed_videos,
      through: :views,
      source: :Video

   # has_many :liked_videos,
   #    through: :reactable,
   #    source: :Video,
   #    dependent: :destroy

   # has_many :liked_comments,
   #    through: :reactable,
   #    source: :Comment,
   #    dependent: :destroy

   has_many :subscriber_subs,
      foreign_key: :channel_id,
      class_name: :Subscription,
      dependent: :destroy

   has_many :subscribers,
      through: :subscriber_subs,
      source: :subscriber

   has_many :channel_subs,
      foreign_key: :subscriber_id,
      class_name: :Subscription,
      dependent: :destroy

   has_many :subscribed_channels,
      through: :channel_subs,
      source: :subscribed_channel

   def subscribe!(subscriber_id)
      subscription = Subscription.new(subscriber_id: subscriber_id, channel_id: self.id)
   
      if subscription.save!
         return true
      else
         return false
      end
   end

   def unsubscribe!(subscriber_id)
      if Subscription.destroy_by(subscriber_id: subscriber_id, channel_id: self.id)
         puts "destroyed the subscription"
         return true
      else
         puts "unable to destroy subscription"
         return false
      end
   end

   def self.find_by_credentials(email, password)
      @user = User.find_by(email: email)
      @user.authenticate(password) if @user
   end

   def reset_session_token!
      self.update!(session_token: generate_unique_session_token)
      self.session_token
   end

   private

   def generate_unique_session_token
      while true
         token = SecureRandom.urlsafe_base64
         return token unless User.find_by(session_token: token)
      end
   end

   def ensure_session_token
      self.session_token ||= generate_unique_session_token
   end
end
