# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'open-uri'

ActiveRecord::Base.transaction do

  puts "Destroying tables..."

  Video.destroy_all
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


  puts "Creating videos..."

  demo_vid = Video.create!(title: "i am the demo video", uploader_id: demo.id)

  dan_vid = Video.create!(title: "dan's cool vid", uploader_id: dan.id)
  fred_vid = Video.create!(title: "fred's cool vid", uploader_id: fred.id)
  clide_vid = Video.create!(title: "clide's cool vid", uploader_id: clide.id)
  adina_vid = Video.create!(title: "adina's cool vid", uploader_id: adina.id)
  ben_vid = Video.create!(title: "ben's cool vid", uploader_id: ben.id)
  ian_vid = Video.create!(title: "ian's cool vid", uploader_id: ian.id)

  
  puts "Attaching media objects to videos"

  demo_media_object = URI.open('https://booootube-seeds.s3.amazonaws.com/zombie_chilling_out.mp4')
  demo_vid.media_object.attach(io: demo_media_object, filename: "zombie_chilling.mp4")

  dan_media_object = URI.open('https://booootube-seeds.s3.amazonaws.com/corn_lady.mp4')
  dan_vid.media_object.attach(io: dan_media_object, filename: "corn_lady.mp4")

  fred_media_object = URI.open('https://booootube-seeds.s3.amazonaws.com/laughing_clown.mp4')
  fred_vid.media_object.attach(io: fred_media_object, filename: "laughing_clown.mp4")

  clide_media_object = URI.open('https://booootube-seeds.s3.amazonaws.com/ghost_friends.mp4')
  clide_vid.media_object.attach(io: clide_media_object, filename: "ghost_friends.mp4")

  adina_media_object = URI.open('https://booootube-seeds.s3.amazonaws.com/construction.mp4')
  adina_vid.media_object.attach(io: adina_media_object, filename: "construction.mp4")

  ben_media_object = URI.open('https://booootube-seeds.s3.amazonaws.com/all_smiles.mp4')
  ben_vid.media_object.attach(io: ben_media_object, filename: "all_smiles.mp4")

  ian_media_object = URI.open('https://booootube-seeds.s3.amazonaws.com/jackolantern.mp4')
  ian_vid.media_object.attach(io: ian_media_object, filename: "jackolantern.mp4")


  puts "Media objects succesfully attached!"

  puts "BooooTube all set up!"
end