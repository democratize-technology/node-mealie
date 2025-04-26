const { MealieClient, IngredientParserService } = require('../dist');

async function main() {
  // Initialize the client
  const client = new MealieClient({
    baseUrl: process.env.MEALIE_BASE_URL || 'http://localhost:9000',
    apiToken: process.env.MEALIE_API_TOKEN,
  });

  // Create ingredient parser service
  const parser = new IngredientParserService({
    baseUrl: client.config.baseUrl,
    apiToken: client.config.apiToken,
  });

  try {
    // Parse a single ingredient
    console.log('Parsing single ingredient...');
    const singleResult = await parser.parseIngredient('2 cups all-purpose flour');
    console.log('Result:', JSON.stringify(singleResult, null, 2));

    // Parse multiple ingredients
    console.log('\nParsing multiple ingredients...');
    const ingredients = [
      '2 cups all-purpose flour',
      '1 tsp vanilla extract',
      '3 large eggs, room temperature',
      '1/2 cup unsalted butter, softened',
      'pinch of salt',
    ];

    const multipleResults = await parser.parseIngredients(ingredients);
    console.log('Results:');
    multipleResults.forEach((result, index) => {
      console.log(`${index + 1}. ${ingredients[index]}`);
      console.log(`   Quantity: ${result.quantity || 'N/A'}`);
      console.log(`   Unit: ${result.unit || 'N/A'}`);
      console.log(`   Food: ${result.food || 'N/A'}`);
      console.log(`   Comment: ${result.comment || 'N/A'}`);
      console.log();
    });

    // Parse with language support (French example)
    console.log('Parsing with language support (French)...');
    const frenchResult = await parser.parseIngredient('2 tasses de farine', 'fr-FR');
    console.log('Result:', JSON.stringify(frenchResult, null, 2));

  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
  }
}

main();
