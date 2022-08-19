Rails.application.routes.draw do
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # to redirect to client side routes

  # ---------- redirect all path for frontend ----------
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }

  # ------------- testing -------------
  get '/hello', to: 'application#hello_world'
end
