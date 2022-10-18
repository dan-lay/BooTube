class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.text :body, null: false, length: {maximum: 10000}
      t.references :commenter, index: true, foreign_key: {to_table: :users}
      t.references :video, index: true, foreign_key: {to_table: :videos}

      t.timestamps
    end
  end
end
