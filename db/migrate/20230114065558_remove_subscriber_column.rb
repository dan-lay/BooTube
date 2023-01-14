class RemoveSubscriberColumn < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :subscriber_id
  end
end
