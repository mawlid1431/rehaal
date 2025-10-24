-- Sample data for testing

-- Insert sample trips
INSERT INTO trips (title, destination, start_date, end_date, duration, price, image_url, description) VALUES
('Amazing Paris Adventure', 'Paris, France', '2025-06-01', '2025-06-07', 7, 1299.99, 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', 'Experience the magic of Paris with visits to the Eiffel Tower, Louvre Museum, and charming cafes.'),
('Tropical Bali Escape', 'Bali, Indonesia', '2025-07-15', '2025-07-22', 8, 1599.99, 'https://images.unsplash.com/photo-1537996194471-e657df975ab4', 'Relax on pristine beaches, explore ancient temples, and enjoy Balinese culture.'),
('Tokyo City Lights', 'Tokyo, Japan', '2025-08-10', '2025-08-17', 8, 2199.99, 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf', 'Discover modern Tokyo, traditional temples, amazing food, and vibrant nightlife.');

-- Insert sample gallery items
INSERT INTO gallery (title, image_url, description) VALUES
('Sunset in Santorini', 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e', 'Beautiful sunset views from the Greek islands'),
('Mountain Adventure', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 'Breathtaking mountain landscapes from our hiking tours'),
('Beach Paradise', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19', 'Crystal clear waters and white sandy beaches');

-- Insert sample services
INSERT INTO services (icon, title, description) VALUES
('plane', 'Flight Booking', 'We handle all your flight arrangements with the best airlines and competitive prices.'),
('hotel', 'Hotel Accommodation', 'Carefully selected hotels and resorts that match your preferences and budget.'),
('map', 'Tour Guide', 'Expert local guides who know the best spots and hidden gems of each destination.'),
('shield', 'Travel Insurance', 'Comprehensive travel insurance to keep you protected throughout your journey.');

-- Insert sample testimonials
INSERT INTO testimonials (customer_name, rating, trip_id, date, comment) VALUES
('Sarah Johnson', 5, (SELECT id FROM trips WHERE title = 'Amazing Paris Adventure' LIMIT 1), '2024-09-15', 'Absolutely incredible experience! The tour was well-organized and our guide was fantastic.'),
('Michael Chen', 5, (SELECT id FROM trips WHERE title = 'Tropical Bali Escape' LIMIT 1), '2024-10-20', 'Bali was a dream come true. Everything was perfect from start to finish!'),
('Emma Williams', 4, (SELECT id FROM trips WHERE title = 'Tokyo City Lights' LIMIT 1), '2024-11-05', 'Great trip overall. Tokyo is amazing and the itinerary was well planned.');

-- Insert sample bookings
INSERT INTO bookings (trip_id, customer_name, customer_email, customer_phone, number_of_people, booking_date, special_requests, status, total_price) VALUES
((SELECT id FROM trips WHERE title = 'Amazing Paris Adventure' LIMIT 1), 'John Doe', 'john.doe@email.com', '+1234567890', 2, '2025-06-01', 'Need vegetarian meal options', 'confirmed', 2599.98),
((SELECT id FROM trips WHERE title = 'Tropical Bali Escape' LIMIT 1), 'Jane Smith', 'jane.smith@email.com', '+1987654321', 4, '2025-07-15', 'Celebrating anniversary', 'pending', 6399.96);
