class CreateNewSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :subscriptions do |t|
      t.references :subscriber, foreign_key: { to_table: :users }
      t.references :subscribed_channel, foreign_key: { to_table: :users }
      t.timestamps
    end
  end
end
