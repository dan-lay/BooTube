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

  demo = User.create!(email: 'demouser@gmail.com', password: 'password', first_name:'Demo', last_name: 'User', handle: "demoaccount")
  dan = User.create!(email: 'dantheman@gmail.com', password: 'password', first_name:'Dan' , last_name: 'Lay', handle: "dan_the_man")
  fred = User.create!(email: 'bigford@gmail.com', password: 'password', first_name: 'Fred', last_name: 'The Goat', handle: "theGOAT")
  clide = User.create!(email: 'monkeyman@protonmail.com', password: 'password', first_name: 'Clide', last_name: 'Stefani', handle: "p1anom@n")
  adina = User.create!(email: 'coffee_and_communism@gmail.com', password: 'password', first_name: 'Adina', last_name: 'Cooper', handle: "hanabiGOD")
  ben = User.create!(email: 'brilliantdamage@gmail.com', password: 'password', first_name: 'Ben', last_name: 'Schwartz', handle: "ben_dmg")
  ian = User.create!(email: 'queenbee@gmail.com', password: 'password', first_name: 'Ian', last_name: 'Verger', handle: "inMIAMI!!!")

  puts "Users succesfully created!"

  puts "-----------------------------------------"

  puts "Creating videos..."

  demo_vid_description = "This video is from when our DIY home-improvement project went horribly wrong. As you can see I was very visibly frustrated, as was my family in the background. Next time, I think I might seek out a professional..."
  demo_vid = Video.new(title: "DIY Project GONE WRONG!!!", uploader_id: demo.id, description: demo_vid_description)
  demo_media_object = URI.open('https://booootube-dev.s3.amazonaws.com/zombie_chilling_out.mp4')
  demo_vid.media_object.attach(io: demo_media_object, filename: "zombie_chilling.mp4")
  demo_vid.save!

  dan_vid_description = "I was walking through the this corn field like i normally do every weekend, and stumbled upon this witch! she was super cool though and turns out we have a lot in common. She says to meet back here around midnight next weekend and to bring eye of newt... does anyone know where i might find that? maybe a whole foods or something?"
  dan_vid = Video.new(title: "Witches are real, and they love corn?", uploader_id: dan.id, description: dan_vid_description)
  dan_media_object = URI.open('https://booootube-dev.s3.amazonaws.com/corn_lady.mp4')
  dan_vid.media_object.attach(io: dan_media_object, filename: "corn_lady.mp4")
  dan_vid.save!

  fred_vid_description = "literally just heard the funniest thing lmao"
  fred_vid = Video.new(title: "LOL", uploader_id: fred.id, description: fred_vid_description)
  fred_media_object = URI.open('https://booootube-dev.s3.amazonaws.com/laughing_clown.mp4')
  fred_vid.media_object.attach(io: fred_media_object, filename: "laughing_clown.mp4")
  fred_vid.save!

  clide_vid_description = "AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH!!!!!!!!!!!!!!"
  clide_vid = Video.new(title: "i'm scared", uploader_id: clide.id, description: clide_vid_description)
  clide_media_object = URI.open('https://booootube-dev.s3.amazonaws.com/ghost_friends.mp4')
  clide_vid.media_object.attach(io: clide_media_object, filename: "ghost_friends.mp4")
  clide_vid.save!

  adina_vid_description = "quit clownin around"
  adina_vid = Video.new(title: "look at these clowns", uploader_id: adina.id, description: adina_vid_description)
  adina_media_object = URI.open('https://booootube-dev.s3.amazonaws.com/construction.mp4')
  adina_vid.media_object.attach(io: adina_media_object, filename: "construction.mp4")
  adina_vid.save!

  ben_vid_description = "It's Hallows Eve, you're Head Dentist, and this patient is waiting for their routine check up, WYD?"
  ben_vid = Video.new(title: "Dental Exams are Scary", uploader_id: ben.id, description: ben_vid_description)
  ben_media_object = URI.open('https://booootube-dev.s3.amazonaws.com/all_smiles.mp4')
  ben_vid.media_object.attach(io: ben_media_object, filename: "all_smiles.mp4")
  ben_vid.save!

  ian_vid_description = "I LOVE setting pumpkins on fire :D"
  ian_vid = Video.new(title: "what's the vibe?", uploader_id: ian.id, description: ian_vid_description)
  ian_media_object = URI.open('https://booootube-dev.s3.amazonaws.com/jackolantern.mp4')
  ian_vid.media_object.attach(io: ian_media_object, filename: "jackolantern.mp4")
  ian_vid.save!

  puts "Videos succesfully created!"

  puts "-----------------------------------------"

  puts "Creating comments..."

  Comment.create!(body: "this is so scary, right?!?", commenter_id: 1, video_id: 1)
  Comment.create!(body: "not scary at all, actually", commenter_id: 6, video_id: 1)
  Comment.create!(body: "hey nerd, you're bleeding", commenter_id: 5, video_id: 1)
  Comment.create!(body: "this is my happy place", commenter_id: 2, video_id: 2)
  Comment.create!(body: "mmmmm, corn", commenter_id: 3, video_id: 2)
  Comment.create!(body: "why are they there...", commenter_id: 7, video_id: 2)
  Comment.create!(body: "!?!?!??", commenter_id: 4, video_id: 2)
  Comment.create!(body: "wonder what's so funny", commenter_id: 3, video_id: 3)
  Comment.create!(body: "i wouldn't hire him for my kid's party", commenter_id: 1, video_id: 3)
  Comment.create!(body: "get a job freak!", commenter_id: 7, video_id: 3)
  Comment.create!(body: "he probably just watched the corn video", commenter_id: 2, video_id: 3)
  Comment.create!(body: "great halloween inspiration!", commenter_id: 6, video_id: 4)
  Comment.create!(body: "they better have good detergent", commenter_id: 5, video_id: 4)
  Comment.create!(body: "ghosts!! EEK!", commenter_id: 4, video_id: 4)
  Comment.create!(body: "haha i'm the demo user lol", commenter_id: 1, video_id: 4)
  Comment.create!(body: "..........", commenter_id: 7, video_id: 4)
  Comment.create!(body: "i'm super freaked out rn", commenter_id: 2, video_id: 4)
  Comment.create!(body: "can we just admire this site for a minute? so beautifully horrific", commenter_id: 1, video_id: 5)
  Comment.create!(body: "i'm the demo user!! jk i'm fred", commenter_id: 3, video_id: 5)
  Comment.create!(body: "so many building codes broken, reported", commenter_id: 2, video_id: 5)
  Comment.create!(body: "hard at work! love to see it", commenter_id: 6, video_id: 5)
  Comment.create!(body: "YIKES!", commenter_id: 4, video_id: 5)
  Comment.create!(body: "this is MY happy place", commenter_id: 5, video_id: 5)
  Comment.create!(body: "great smile :D", commenter_id: 1, video_id: 6)
  Comment.create!(body: "dentist's POV when they tell me to say ahhh", commenter_id: 3, video_id: 6)
  Comment.create!(body: "gadzooks!!!!", commenter_id: 4, video_id: 6)
  Comment.create!(body: "me after a yerba", commenter_id: 7, video_id: 6)
  Comment.create!(body: "all smiles!", commenter_id: 2, video_id: 6)
  Comment.create!(body: "perfectly good waste of a pumpkin", commenter_id: 6, video_id: 7)
  Comment.create!(body: "yawnnnn, when does the scary part happen..", commenter_id: 5, video_id: 7)
  Comment.create!(body: "i'm just so SPOOKED!!!", commenter_id: 4, video_id: 7)
  Comment.create!(body: "tis the season to be spooky!", commenter_id: 3, video_id: 7)

  puts "Comments created succesfully!"

  puts "-----------------------------------------"

  puts "Creating reactions..."

  Reaction.create!(reactable_type: "Video", reactable_id: 1, is_like: true)
  Reaction.create!(reactable_type: "Video", reactable_id: 1, is_like: true)
  Reaction.create!(reactable_type: "Video", reactable_id: 2, is_like: true)
  Reaction.create!(reactable_type: "Video", reactable_id: 1, is_like: true)
  Reaction.create!(reactable_type: "Video", reactable_id: 2, is_like: true)
  Reaction.create!(reactable_type: "Video", reactable_id: 1, is_like: true)
  Reaction.create!(reactable_type: "Video", reactable_id: 2, is_like: true)
  Reaction.create!(reactable_type: "Video", reactable_id: 2, is_like: true)
  Reaction.create!(reactable_type: "Video", reactable_id: 3, is_like: true)
  Reaction.create!(reactable_type: "Video", reactable_id: 3, is_like: true)
  Reaction.create!(reactable_type: "Video", reactable_id: 3, is_like: true)
  Reaction.create!(reactable_type: "Video", reactable_id: 3, is_like: true)
  Reaction.create!(reactable_type: "Video", reactable_id: 4, is_like: true)
  Reaction.create!(reactable_type: "Video", reactable_id: 4, is_like: true)
  Reaction.create!(reactable_type: "Video", reactable_id: 4, is_like: true)
  Reaction.create!(reactable_type: "Video", reactable_id: 4, is_like: true)
  Reaction.create!(reactable_type: "Video", reactable_id: 4, is_like: true)
  Reaction.create!(reactable_type: "Video", reactable_id: 4, is_like: false)
  Reaction.create!(reactable_type: "Video", reactable_id: 5, is_like: false)
  Reaction.create!(reactable_type: "Video", reactable_id: 5, is_like: false)
  Reaction.create!(reactable_type: "Video", reactable_id: 5, is_like: false)
  Reaction.create!(reactable_type: "Video", reactable_id: 5, is_like: false)
  Reaction.create!(reactable_type: "Video", reactable_id: 5, is_like: false)
  Reaction.create!(reactable_type: "Video", reactable_id: 5, is_like: false)
  Reaction.create!(reactable_type: "Video", reactable_id: 6, is_like: false)
  Reaction.create!(reactable_type: "Video", reactable_id: 6, is_like: false)
  Reaction.create!(reactable_type: "Video", reactable_id: 6, is_like: false)
  Reaction.create!(reactable_type: "Video", reactable_id: 6, is_like: false)
  Reaction.create!(reactable_type: "Video", reactable_id: 6, is_like: false)
  Reaction.create!(reactable_type: "Video", reactable_id: 7, is_like: false)
  Reaction.create!(reactable_type: "Video", reactable_id: 7, is_like: false)
  Reaction.create!(reactable_type: "Video", reactable_id: 7, is_like: false)
  Reaction.create!(reactable_type: "Video", reactable_id: 7, is_like: false)

  puts "Reactions created succesfully!"

  puts "-----------------------------------------"

  puts "BooooTube all set up!"
end