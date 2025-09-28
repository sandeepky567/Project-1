const sampleListings = [
  {
    title: "The Grand Palace, Gateway View",
    description:
      "Live like royalty in a suite overlooking the Pink City. This historic palace stay offers traditional Rajasthani grandeur, personal butler service, and an authentic royal feast.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1701087366618-112f1b333a9f?q=80&w=1181&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 15000,
    location: "Jaipur",
    country: "India",
  },
  {
    title: "The Grand Imperial Heritage",
    description:
      "A sleek, modern loft with panoramic views of the Arabian Sea and the city skyline. Located in the heart of Mumbai's chicest district, perfect for business or luxury city exploring.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1724681435399-972d668fade0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 18000,
    location: "Mumbai",
    country: "India",
  },
  {
    title: "The Cecil Heritage Hotel",
    description:
      "Unplug and recharge in this peaceful wooden cabin nestled in the Dhauladhar ranges. Enjoy breathtaking snow-capped mountain vistas and cozy fireplaces.",
    image: {
      filename: "listingimage",
      url: "", // URL removed
    },
    price: 12000,
    location: "Manali",
    country: "India",
  },
  {
    title: "The Udaivilas, Lake Pichola",
    description:
      "Experience the romance of Udaipur in this beautifully restored Haveli. Located by a lake, it offers stunning views, traditional Mewari architecture, and serene boat rides.",
    image: {
      filename: "listingimage",
      url: "https://plus.unsplash.com/premium_photo-1697730447144-a2f7257e4a1f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWxzJTIwJTIwYW5kJTIwcmVzb3J0cyUyMGluJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D",
    
    },
    price: 25000,
    location: "Udaipur",
    country: "India",
  },
  {
    title: "Ananda Himalayan Retreat",
    description:
      "Live among the treetops in this unique, secluded treehouse retreat in the spice plantations of Wayanad. A true nature lover's paradise with authentic Ayurvedic treatments.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1668169064124-2e27339780d3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 9500,
    location: "Wayanad",
    country: "India",
  },
  {
    title: "The Coastal Leela Resort",
    description:
      "Step out of your door onto the sandy beach of South Goa. This beachfront villa offers the ultimate relaxation with a private patio and stunning sunset views.",
    image: {
      filename: "listingimage",
      url: "https://plus.unsplash.com/premium_photo-1697729789803-48b0c82365ff?q=80&w=1361&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 18000,
    location: "Goa",
    country: "India",
  },
  {
    title: "Brunton Boatyard Heritage",
    description:
      "Spend your days cruising the serene backwaters of Kerala in a traditional Kettuvallam (houseboat). A cozy, all-inclusive cabin perfect for a tranquil, unique experience.",
    image: {
      filename: "listingimage",
      url: "https://plus.unsplash.com/premium_photo-1697730395452-e90ac9269968?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVscyUyMCUyMGFuZCUyMHJlc29ydHMlMjBpbiUyMGluZGlhfGVufDB8fDB8fHww", // URL removed
    },
    price: 11000,
    location: "Alleppey",
    country: "India",
  },
  {
    title: "The Residency Business Suites",
    description:
      "Indulge in luxury living with a panoramic view of Lutyens' Delhi from this stunning penthouse apartment. Centrally located for easy access to monuments and dining.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1695439928125-3b3903b7f9ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzJTIwJTIwYW5kJTIwcmVzb3J0cyUyMGluJTIwZGVsaGl8ZW58MHx8MHx8fDA%3D", // URL removed
    },
    price: 28000,
    location: "New Delhi",
    country: "India",
  },
  {
    title: "Aman-i-Khás Tented Camp",
    description:
      "An exclusive wilderness camp bordering a national park. Experience the thrill of a luxury tented lodge, complete with guided safaris to spot tigers and other wildlife.",
    image: {
      filename: "listingimage",
      url: "https://media.istockphoto.com/id/1317276731/photo/romantic-glamping-site-at-night.jpg?s=612x612&w=is&k=20&c=1Wplr9UEuyvUGJZlVeH2eNSNENi0Xstrb9v4QnjAtCE=", // URL removed
    },
    price: 35000,
    location: "Ranthambore",
    country: "India",
  },
  {
    title: "Falaknuma Palace",
    description:
      "Live like a Nizam in this meticulously restored palace perched on a hill. Enjoy royal Hyderabadi cuisine, opulence, and a breathtaking view of the old city.",
    image: {
      filename: "listingimage",
      url: "https://media.istockphoto.com/id/163851503/photo/indian-palace.jpg?s=612x612&w=is&k=20&c=rwmPv6qmogEUsbkivtb21-tHoui4TBlfoHhpiSRKT7E=", // URL removed
    },
    price: 45000,
    location: "Hyderabad",
    country: "India",
  },
  {
    title: "The Grand Dame of Chowringhee",
    description:
      "Stay in a piece of history in this beautifully preserved colonial-era bungalow in Kolkata's iconic district. Features high ceilings, a tranquil courtyard, and vintage charm.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1740774457725-38929be4e8c4?q=80&w=1158&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // URL removed
    },
    price: 14000,
    location: "Kolkata",
    country: "India",
  },
  {
    title: "Taj Exotica Island Resort",
    description:
      "Have an entire tropical island villa to yourself for a truly exclusive and unforgettable vacation experience. White sand beaches and pristine blue waters await.",
    image: {
      filename: "listingimage",
      url: "", // URL removed
    },
    price: 90000,
    location: "Lakshadweep",
    country: "India",
  },
  {
    title: "Evolve Back Kodagu",
    description:
      "Escape to the picturesque Eastern Ghats in this charming cottage surrounded by tea estates. Enjoy cool weather, fresh air, and traditional south Indian hospitality.",
    image: {
      filename: "listingimage",
      url: "", // URL removed
    },
    price: 8500,
    location: "Ooty",
    country: "India",
  },
  {
    title: "The Garden City Palace",
    description:
      "Stay in an elegant and historic hotel located in the heart of Bangalore's central business district. Features a lush garden, old-world charm, and modern amenities.",
    image: {
      filename: "listingimage",
      url: "", // URL removed
    },
    price: 19000,
    location: "Bengaluru",
    country: "India",
  },
  {
    title: "Pondicherry French Quarter Villa",
    description:
      "Relax on the tranquil streets of the French Quarter in this beautiful villa with a private courtyard. Experience the unique blend of French and Tamil cultures.",
    image: {
      filename: "listingimage",
      url: "", // URL removed
    },
    price: 13500,
    location: "Puducherry",
    country: "India",
  },
  {
    title: "JW Marriott Walnut Grove",
    description:
      "Enjoy breathtaking mountain views from this cozy cabin in the upper reaches of the Himalayas. Perfect for meditation and exploring the local Tibetan culture.",
    image: {
      filename: "listingimage",
      url: "", // URL removed
    },
    price: 10500,
    location: "Dharamshala",
    country: "India",
  },
  {
    title: "The ITC Grand Chola",
    description:
      "Step into the glamour of old Bombay in this stylish Art Deco apartment right on the iconic Marine Drive ('The Queen's Necklace').",
    image: {
      filename: "listingimage",
      url: "", // URL removed
    },
    price: 21000,
    location: "Mumbai",
    country: "India",
  },
  {
    title: "Taj Exotica Island Resort",
    description:
      "Escape to a tropical paradise in this luxurious villa with a private infinity pool overlooking the Bay of Bengal in Havelock Island.",
    image: {
      filename: "listingimage",
      url: "", // URL removed
    },
    price: 29000,
    location: "Port Blair",
    country: "India",
  },
  {
    title: "Suryagarh Golden Fortress",
    description:
      "Live with a direct view of the magnificent Golden Fort in this unique heritage property. Experience the desert culture and magnificent sunsets.",
    image: {
      filename: "listingimage",
      url: "", // URL removed
    },
    price: 16000,
    location: "Jaisalmer",
    country: "India",
  },
  {
    title: "Aman-i-Khás Tented Camp",
    description:
      "Experience luxury glamping in the middle of the Thar Desert. An opulent oasis with private pools and guided camel safaris under the stars.",
    image: {
      filename: "listingimage",
      url: "", // URL removed
    },
    price: 40000,
    location: "Jodhpur",
    country: "India",
  },
  {
    title: "Evolve Back Kodagu",
    description:
      "Unplug and unwind in this cozy cottage surrounded by the lush green coffee plantations of Coorg. Perfect for nature walks and tasting local coffee.",
    image: {
      filename: "listingimage",
      url: "", // URL removed
    },
    price: 8000,
    location: "Coorg",
    country: "India",
  },
  {
    title: "Kovalam Cliffside Villa",
    description:
      "Enjoy the serene Arabian Sea in this beautiful, private beachfront villa on the lesser-known coast of North Kerala.",
    image: {
      filename: "listingimage",
      url: "", // URL removed
    },
    price: 19000,
    location: "Kasargod",
    country: "India",
  },
  {
    title: "Ananda Himalayan Retreat",
    description:
      "Stay in an eco-friendly bamboo hut nestled by the Ganges river. It's the perfect escape for yoga, meditation, and spiritual seekers.",
    image: {
      filename: "listingimage",
      url: "", // URL removed
    },
    price: 7000,
    location: "Rishikesh",
    country: "India",
  },
  {
    title: "Vivanta Dal Lake View",
    description:
      "Experience the charm of Srinagar from a traditional, richly carved wooden houseboat on Dal Lake. Includes a personal Shikara ride.",
    image: {
      filename: "listingimage",
      url: "", // URL removed
    },
    price: 11500,
    location: "Srinagar",
    country: "India",
  },
  {
    title: "The Residency Business Suites",
    description:
      "Explore the vibrant city of Chennai from this modern and centrally located apartment, close to Marina Beach and key historical sites.",
    image: {
      filename: "listingimage",
      url: "", // URL removed
    },
    price: 14500,
    location: "Chennai",
    country: "India",
  },
  {
    title: "Taj Ganga Ghat",
    description:
      "Wake up to the serene view of the Ganges river in this guest house located near the ancient ghats of Varanasi. Experience true spiritual India.",
    image: {
      filename: "listingimage",
      url: "", // URL removed
    },
    price: 6500,
    location: "Varanasi",
    country: "India",
  },
  {
    title: "Taj Exotica Island Resort",
    description:
      "Indulge in luxury in this stunning overwater bungalow in the Andaman Islands with breathtaking views of the Indian Ocean.",
    image: {
      filename: "listingimage",
      url: "", // URL removed
    },
    price: 55000,
    location: "Havelock Island",
    country: "India",
  },
  {
    title: "The Cecil Heritage Hotel",
    description:
      "Hit the slopes in style with this luxurious ski chalet in the scenic mountains of Gulmarg. Perfect for winter sports enthusiasts.",
    image: {
      filename: "listingimage",
      url: "", // URL removed
    },
    price: 24000,
    location: "Gulmarg",
    country: "India",
  },
  {
    title: "The Coastal Leela Resort",
    description:
      "Escape to a secluded beach house on the Karnataka coast. Surf, relax, and unwind on the pristine sands of Om Beach.",
    image: {
      filename: "listingimage",
      url: "", // URL removed
    },
    price: 15500,
    location: "Gokarna",
    country: "India",
  },
];

module.exports = { data: sampleListings };