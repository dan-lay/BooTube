# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ActiveRecord::Base.transaction do

   puts "Destroying tables..."

   User.destroy_all

   puts "Resetting primary keys..."
 
   ActiveRecord::Base.connection.reset_pk_sequence!('users')
  
   puts "Creating users..."
 
   demo = User.create!(email: 'demouser@gmail.com', password: 'password', first_name:'spooky', last_name: 'ghoul')
   dan = User.create!(email: 'dantheman@gmail.com', password: 'password', first_name:'dan' , last_name: 'lay')
   fred = User.create!(email: 'bigford@gmail.com', password: 'password', first_name: 'fred', last_name: 'something')
   clide = User.create!(email: 'monkeyman@protonmail.com', password: 'password', first_name: 'clide', last_name: 'stefani')
   adina = User.create!(email: 'coffee_and_communism@gmail.com', password: 'password', first_name: 'adina', last_name: 'something')
   ben = User.create!(email: 'brilliantdamage@gmail.com', password: 'password', first_name: 'ben', last_name: 'schwartz')
   ian = User.create!(email: 'queenbitch@gmail.com', password: 'password', first_name: 'ian', last_name: 'verger')

  puts "BooTube all set up!"
 end