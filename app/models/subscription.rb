# == Schema Information
#
# Table name: subscriptions
#
#  id            :bigint           not null, primary key
#  subscriber_id :bigint
#  channel_id    :bigint
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Subscription < ApplicationRecord
   belongs_to :subscriber,
      foreign_key: :subscriber_id,
      class_name: :User,
      inverse_of: :subscribed_channels

   belongs_to :subscribed_channel,
   foreign_key: :channel_id,
   class_name: :User,
   inverse_of: :subscribers
end
