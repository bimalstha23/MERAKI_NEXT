const { PrismaClient } = require('@prisma/client');

async function migrateData() {
  const prisma = new PrismaClient();

  try {
    // Retrieve existing cart items without a userId
    const cartItemsWithoutUserId = await prisma.cartItem.findMany({
      where: {
        userId: null,
      },
    });

    // Perform data migration for each cart item
    for (const cartItem of cartItemsWithoutUserId) {
      // Determine the appropriate userId based on your business logic.
      // For example, you might fetch it from related data or calculate it.

      // Replace the 'determineUserId' function with your logic.
      const userId = 1;

      // Update the cart item with the determined userId
      await prisma.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          userId,
        },
      });
    }

    console.log('Data migration completed successfully.');
  } catch (error) {
    console.error('Error during data migration:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the data migration
migrateData();
