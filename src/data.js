// src/data.js
import { faker } from "@faker-js/faker";

// Function to generate fake customers
export function generateCustomers(count = 1_000_000) {
  const customers = [];

  for (let i = 0; i < count; i++) {
    customers.push({
      id: i + 1,
      name: faker.person.fullName(),
      phone: faker.phone.number("+91##########"),
      email: faker.internet.email(),
      score: faker.number.int({ min: 1, max: 100 }),
      lastMessageAt: faker.date.recent({ days: 100 }),
      addedBy: faker.person.fullName(),
      avatar: faker.image.avatar(), // small avatar image
    });
  }

  return customers;
}

