class ChangeCommentBodyLengthValidation < ActiveRecord::Migration[7.0]
  def change
    add_column :comments, :body, :text, length: {in: 1..10000}
  end
end
