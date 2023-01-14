class Api::ReactionsController < ApplicationController
   wrap_parameters include: Like.attribute_names + [:reactable_type, :reactable_id, :is_like]
   
   def create
      @reaction = Reaction.new(user_params)

      if @reaction.save!
         render :show
      else
         render json: { errors: @reaction.errors.full_messages }, status: :unprocessable_entity
      end
   end

   def destroy
      @reaction = Reaction.find(params[:id])

      if @reaction.destroy!
         head :no_content
      else
         render json: {errors: @reaction.errors.full_messages }, status: :unprocessable_entity
      end
   end

   def toggle
      @reaction = Reaction.find(params[:id])

      if @reaction
         if @reaction[:is_like]
            @reaction[:is_like] = false
         else
            @reaction[:is_like] = true
         end
         
         if @reaction.save!
            render :show
         else
            render json: { errors: @reaction.errors.full_messages }, status: :unprocessable_entity
         end
      else
         render json: {errors: "Unable to find reaction"}, status: :unprocessable_entity
      end
   end

   private

   def user_params
      params.require(:reaction).permit(:reactable_type, :reactable_id, :is_like)
   end
end