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
#
class User < ApplicationRecord
   has_secure_password

   before_validation :ensure_session_token
   validates :email, uniqueness: true, length: { in: 3..255, message: "Email must be between 3 and 255 characters long"}, format: { with: URI::MailTo::EMAIL_REGEXP, message: "Incorrect email format" }
   validates :session_token, presence: true, uniqueness: true
   validates :password, length: { in: 6..255, message: "Password must be atleast 6 characters long"}, allow_nil: true
   validates :first_name, presence: true
   validates :last_name, presence: true


   def self.find_by_credentials(email, password)
      user = User.find_by(email: email)

      if user&.authenticate(password)
         return user
      else
         return nil
      end
   end

   def ensure_session_token
      self.session_token ||= generate_unique_session_token
   end

   def reset_session_token!
      self.session_token = generate_unique_session_token
      save!
      session_token
   end

   private

   def generate_unique_session_token
      while true
         token = SecureRandom.urlsafe_base64
         return token unless User.exists?(session_token: token)
      end
   end
end
