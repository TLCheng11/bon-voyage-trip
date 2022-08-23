Rails.application.routes.draw do
  # route for sessions controller
  get "/auth", to: "users#show"
  post "/login", to: "sessions#login"
  post "/logout", to: "sessions#logout"

  # route for google map nearby search
  get "/search", to: "google_maps#search"

  resources :users, only: [:create]
  resources :trips, only: [:index, :create, :show, :destroy]
  resources :daily_plans, only: [:show]
  # resources :activities
  # resources :sight_spots
  # resources :restaurants
  # resources :transportation_plans
  # resources :hotel_bookings



  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # to redirect to client side routes

  # ---------- redirect all path for frontend ----------
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }

  # ------------- testing -------------
  # get '/hello', to: 'application#hello_world'
end
