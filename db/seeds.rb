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

  Comment.destroy_all
  Video.destroy_all
  User.destroy_all

  puts "Resetting primary keys..." 

  ActiveRecord::Base.connection.reset_pk_sequence!('users')
  ActiveRecord::Base.connection.reset_pk_sequence!('videos')
  ActiveRecord::Base.connection.reset_pk_sequence!('comments')

  puts "Creating users..."

  demo = User.create!(email: 'demouser@gmail.com', password: 'password', first_name:'spooky', last_name: 'ghoul')


  dan = User.create!(email: 'dantheman@gmail.com', password: 'password', first_name:'dan' , last_name: 'lay')
  fred = User.create!(email: 'bigford@gmail.com', password: 'password', first_name: 'fred', last_name: 'something')
  clide = User.create!(email: 'monkeyman@protonmail.com', password: 'password', first_name: 'clide', last_name: 'stefani')
  adina = User.create!(email: 'coffee_and_communism@gmail.com', password: 'password', first_name: 'adina', last_name: 'something')
  ben = User.create!(email: 'brilliantdamage@gmail.com', password: 'password', first_name: 'ben', last_name: 'schwartz')
  ian = User.create!(email: 'queenbee@gmail.com', password: 'password', first_name: 'ian', last_name: 'verger')


  puts "Creating videos..."

  demo_vid_description = "This video is from when our DIY home-improvement project went horribly wrong. As you can see I was very visibly frustrated, as was my family in the background. Next time, I think I might seek out a professional..."
  demo_vid = Video.new(title: "i am the demo video", uploader_id: demo.id, description: demo_vid_description)
  demo_media_object = URI.open('https://booootube-dev.s3.amazonaws.com/zombie_chilling_out.mp4')
  demo_vid.media_object.attach(io: demo_media_object, filename: "zombie_chilling.mp4")
  demo_vid.thumbnail.attach(io: demo_media_object.preview(resize_to_limit: [300, 180]), filename: "zombie_chilling_thumbnail.jpeg")
  demo_vid.save!

  dan_vid = Video.new(title: "dan's cool vid", uploader_id: dan.id)
  dan_media_object = URI.open('https://booootube-dev.s3.amazonaws.com/corn_lady.mp4')
  dan_vid.media_object.attach(io: dan_media_object, filename: "corn_lady.mp4")
  dan_vid.save!

  fred_vid = Video.new(title: "fred's cool vid", uploader_id: fred.id)
  fred_media_object = URI.open('https://booootube-dev.s3.amazonaws.com/laughing_clown.mp4')
  fred_vid.media_object.attach(io: fred_media_object, filename: "laughing_clown.mp4")
  fred_vid.save!

  clide_vid = Video.new(title: "clide's cool vid", uploader_id: clide.id)
  clide_media_object = URI.open('https://booootube-dev.s3.amazonaws.com/ghost_friends.mp4')
  clide_vid.media_object.attach(io: clide_media_object, filename: "ghost_friends.mp4")
  clide_vid.save!

  adina_vid = Video.new(title: "adina's cool vid", uploader_id: adina.id)
  adina_media_object = URI.open('https://booootube-dev.s3.amazonaws.com/construction.mp4')
  adina_vid.media_object.attach(io: adina_media_object, filename: "construction.mp4")
  adina_vid.save!

  ben_vid = Video.new(title: "ben's cool vid", uploader_id: ben.id)
  ben_media_object = URI.open('https://booootube-dev.s3.amazonaws.com/all_smiles.mp4')
  ben_vid.media_object.attach(io: ben_media_object, filename: "all_smiles.mp4")
  ben_vid.save!

  ian_vid = Video.new(title: "ian's cool vid", uploader_id: ian.id)
  ian_media_object = URI.open('https://booootube-dev.s3.amazonaws.com/jackolantern.mp4')
  ian_vid.media_object.attach(io: ian_media_object, filename: "jackolantern.mp4")
  ian_vid.save!

  puts "Videos succesfully created!"

  puts "-----------------------------------------"

  puts "Creating comments..."

  comment1 = Comment.create!(body: "this is so scary, right?!?", commenter_id: 1, video_id: 1)
  comment2 = Comment.create!(body: "not scary at all, actually", commenter_id: 6, video_id: 1)
  comment3 = Comment.create!(body: "hey nerd, you're bleeding", commenter_id: 5, video_id: 1)
  comment4 = Comment.create!(body: "this is my happy place", commenter_id: 2, video_id: 2)
  comment5 = Comment.create!(body: "mmmmm, corn", commenter_id: 3, video_id: 2)
  comment6 = Comment.create!(body: "why are they there...", commenter_id: 7, video_id: 2)
  comment7 = Comment.create!(body: "!?!?!??", commenter_id: 4, video_id: 2)
  comment8 = Comment.create!(body: "wonder what's so funny", commenter_id: 3, video_id: 3)
  comment9 = Comment.create!(body: "i wouldn't hire him for my kid's party", commenter_id: 1, video_id: 3)
  comment10 = Comment.create!(body: "get a job freak!", commenter_id: 7, video_id: 3)
  comment11 = Comment.create!(body: "he probably just watched the corn video", commenter_id: 2, video_id: 3)
  comment12 = Comment.create!(body: "great halloween inspiration!", commenter_id: 6, video_id: 4)
  comment13 = Comment.create!(body: "they better have good detergent", commenter_id: 5, video_id: 4)
  comment14 = Comment.create!(body: "ghosts!! EEK!", commenter_id: 4, video_id: 4)
  comment15 = Comment.create!(body: "haha i'm the demo user lol", commenter_id: 1, video_id: 4)
  comment16 = Comment.create!(body: "..........", commenter_id: 7, video_id: 4)
  comment17 = Comment.create!(body: "i'm super freaked out rn", commenter_id: 2, video_id: 4)
  comment18 = Comment.create!(body: "can we just admire this site for a minute? so beautifully horrific", commenter_id: 1, video_id: 5)
  comment19 = Comment.create!(body: "i'm the demo user!! jk i'm fred", commenter_id: 3, video_id: 5)
  comment20 = Comment.create!(body: "so many building codes broken, reported", commenter_id: 2, video_id: 5)
  comment21 = Comment.create!(body: "hard at work! love to see it", commenter_id: 6, video_id: 5)
  comment22 = Comment.create!(body: "YIKES!", commenter_id: 4, video_id: 5)
  comment23 = Comment.create!(body: "this is MY happy place", commenter_id: 5, video_id: 5)
  comment24 = Comment.create!(body: "great smile :D", commenter_id: 1, video_id: 6)
  comment25 = Comment.create!(body: "dentist's POV when they tell me to say ahhh", commenter_id: 3, video_id: 6)
  comment26 = Comment.create!(body: "gadzooks!!!!", commenter_id: 4, video_id: 6)
  comment27 = Comment.create!(body: "me after a yerba", commenter_id: 7, video_id: 6)
  comment28 = Comment.create!(body: "all smiles!", commenter_id: 2, video_id: 6)
  comment29 = Comment.create!(body: "perfectly good waste of a pumpkin", commenter_id: 6, video_id: 7)
  comment30 = Comment.create!(body: "yawnnnn, when does the scary part happen..", commenter_id: 5, video_id: 7)
  comment31 = Comment.create!(body: "i'm just so SPOOKED!!!", commenter_id: 4, video_id: 7)
  comment32 = Comment.create!(body: "tis the season to be spooky!", commenter_id: 3, video_id: 7)

  puts "Comments created succesfully!"

  puts "-----------------------------------------"

  puts "BooooTube all set up!"
end