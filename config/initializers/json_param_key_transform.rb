ActionDispatch::Request.parameter_parsers[:json] = lambda { |raw_request|
   # Modified from action_dispatch/http/parameters.rb
   data = ActiveSupport::JSON.decode(raw_request)
 
   # Transform camelCase param keys to snake_case
   if data.is_a?(Array)
     data.map { |item| item.deep_transform_keys!(&:underscore) }
   else
     data.deep_transform_keys!(&:underscore)
   end
 
   # Return data
   data.is_a?(Hash) ? data : { '_json': data }
 }