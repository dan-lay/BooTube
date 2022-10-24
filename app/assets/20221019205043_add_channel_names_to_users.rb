class AddChannelNamesToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :channel_name, :string, null: false, length: { maximum: 30 }, index: {unique: true}
  end
end
