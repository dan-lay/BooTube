class RemoveChannel < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :channel_name
  end
end
