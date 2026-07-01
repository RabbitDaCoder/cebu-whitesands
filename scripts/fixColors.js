const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Users/USER/Documents/test hotel/resort-template/frontend/src';

const allFiles = [
  'pages/About.jsx', 'pages/Activities.jsx', 'pages/Amenities.jsx', 'pages/Booking.jsx',
  'pages/BookingPayment.jsx', 'pages/BookingSuccess.jsx', 'pages/Contact.jsx',
  'pages/ContinuePayment.jsx', 'pages/Events.jsx', 'pages/Experience.jsx', 'pages/FoodMenu.jsx',
  'pages/Gallery.jsx', 'pages/Home.jsx', 'pages/Login.jsx', 'pages/Offer.jsx',
  'pages/Restaurants.jsx', 'pages/RoomDetails.jsx', 'pages/Rooms.jsx', 'pages/BarMenu.jsx',
  'pages/admin/Dashboard.jsx', 'pages/admin/ManageRooms.jsx', 'pages/admin/ViewBookings.jsx',
  'pages/admin/AdminDiscounts.jsx', 'pages/admin/PendingPayments.jsx',
  'pages/admin/PaymentSettingsPage.jsx', 'pages/admin/SocialManager.jsx',
  'components/layout/BookingWidget.jsx',
  'layouts/AdminLayout.jsx',
  'pages/Activities.jsx',
  'pages/Contact.jsx',
  'pages/Offer.jsx',
  'sections/home/HeroSection.jsx',
];

allFiles.forEach(rel => {
  const p = path.join(baseDir, rel);
  if (!fs.existsSync(p)) { console.log('SKIP (not found): ' + rel); return; }
  let c = fs.readFileSync(p, 'utf8');

  c = c.replace(/\[#c9a96e\]/g, 'gold-light');
  c = c.replace(/#f5f1ea/g, '#faf6f0');
  c = c.replace(/bg-\[#faf6f0\]/g, 'bg-ivory');
  c = c.replace(/\[#f7f7f5\]/g, 'ivory');
  c = c.replace(/\[#0a0a0a\]/g, 'ocean');
  c = c.replace(/\[#111111\]/g, 'ocean');
  c = c.replace(/\[#1a1a1a\]/g, 'charcoal');
  c = c.replace(/\[#008c8c\]/g, 'teal');
  c = c.replace(/\[#007474\]/g, 'teal-dark');
  c = c.replace(/\[#00a0a0\]/g, 'teal-light');

  fs.writeFileSync(p, c);
  console.log(rel.split('/').pop() + ' done');
});
