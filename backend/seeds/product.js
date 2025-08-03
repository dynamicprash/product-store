import { sql } from "../config/db.js";

const SAMPLE_PRODUCTS = [
  {
    name: "Luffy",
    price: 299.99,
    image:
      "https://ae01.alicdn.com/kf/See6b579ad42845248dcff6c4ae5e972fJ.jpg",
  },
  {
    name: "The final Empire",
    price: 159.99,
    image:
      "https://m.media-amazon.com/images/I/A1UiLnAoHcL._UF1000,1000_QL80_.jpg",
  },
  {
    name: "Skywards",
    price: 249.99,
    image:
      "https://www.thebookbundle.com/cdn/shop/files/81J2yrP9HWL.jpg?v=1736348447",
  },
  {
    name: "One Piece vol.104",
    price: 899.99,
    image:
      "https://dwgkfo5b3odmw.cloudfront.net/manga/thumbs/thumb-93680-OnePiece_GN100_C1_Web-3-WlH6FYTOWwrUpPtZsb4mvQ.jpg",
  },
  {
    name: "Berserk vol.1",
    price: 79.99,
    image:
      "https://m.media-amazon.com/images/I/91rdTtLWAHL._UF1000,1000_QL80_.jpg",
  },
  {
    name: "Wireless Gaming Mouse",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&auto=format&fit=crop&q=60",
  },
  {
    name: "Smart Home Speaker",
    price: 159.99,
    image:
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&auto=format&fit=crop&q=60",
  },
  {
    name: "LED Gaming Monitor",
    price: 449.99,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=60",
  },
];

async function seedDatabase() {
  try {
    // first, clear existing data
    await sql`TRUNCATE TABLE products RESTART IDENTITY`;

    // insert all products
    for (const product of SAMPLE_PRODUCTS) {
      await sql`
        INSERT INTO products (name, price, image)
        VALUES (${product.name}, ${product.price}, ${product.image})
      `;
    }

    console.log("Database seeded successfully");
    process.exit(0); // success code
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1); // failure code
  }
}

seedDatabase();