Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # post 'api/test', to: 'application#test'

  namespace :api, defaults: {format: :json} do
    resources :videos, only: [:show, :index, :create, :destroy, :update]
    resources :comments, only: [:create, :update, :destroy]
    resources :users, only: [:create, :update, :destroy]
    resource :session, only: [:show, :create, :destroy]
    resources :likes, only: [:create, :destroy]

    get '/users/:handle', to: "users#show"
  end

  

  get '*path', to: "static_pages#frontend_index"
end
