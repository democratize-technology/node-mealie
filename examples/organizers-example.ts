import { OrganizerService } from '../src/services/organizers.js';
import type { CategoryIn, TagIn, RecipeToolCreate } from '../src/types/index.js';

async function demonstrateOrganizerService() {
  // Initialize the service
  const organizerService = new OrganizerService({
    baseUrl: 'https://demo.mealie.io',
    token: 'your-auth-token', // Replace with actual token
  });

  try {
    // =============== Categories ===============
    console.log('\n=== Working with Categories ===\n');

    // Get all categories with pagination
    const categories = await organizerService.getAllCategories({
      page: 1,
      perPage: 10,
      search: 'breakfast',
      orderBy: 'name',
      orderDirection: 'asc',
    });
    console.log('Categories:', categories);

    // Create a new category
    const newCategoryData: CategoryIn = { name: 'Desserts' };
    const newCategory = await organizerService.createCategory(newCategoryData);
    console.log('Created category:', newCategory);

    // Get empty categories
    const emptyCategories = await organizerService.getAllEmptyCategories();
    console.log('Empty categories:', emptyCategories);

    // Get a specific category by ID
    const categoryId = '123e4567-e89b-12d3-a456-426614174000'; // Replace with actual ID
    const category = await organizerService.getCategoryById(categoryId);
    console.log('Specific category:', category);

    // Update a category
    const updateData: CategoryIn = { name: 'Updated Desserts' };
    const updatedCategory = await organizerService.updateCategory(categoryId, updateData);
    console.log('Updated category:', updatedCategory);

    // Get category by slug
    const categoryBySlug = await organizerService.getCategoryBySlug('desserts');
    console.log('Category by slug:', categoryBySlug);

    // Delete a category
    const deletedCategory = await organizerService.deleteCategory(categoryId);
    console.log('Deleted category:', deletedCategory);

    // =============== Tags ===============
    console.log('\n=== Working with Tags ===\n');

    // Get all tags with pagination
    const tags = await organizerService.getAllTags({
      page: 1,
      perPage: 10,
      search: 'healthy',
      orderBy: 'name',
      orderDirection: 'asc',
    });
    console.log('Tags:', tags);

    // Create a new tag
    const newTagData: TagIn = { name: 'Vegetarian' };
    const newTag = await organizerService.createTag(newTagData);
    console.log('Created tag:', newTag);

    // Get empty tags
    const emptyTags = await organizerService.getEmptyTags();
    console.log('Empty tags:', emptyTags);

    // Get a specific tag by ID
    const tagId = '123e4567-e89b-12d3-a456-426614174000'; // Replace with actual ID
    const tag = await organizerService.getTagById(tagId);
    console.log('Specific tag:', tag);

    // Update a tag
    const updateTagData: TagIn = { name: 'Vegan' };
    const updatedTag = await organizerService.updateTag(tagId, updateTagData);
    console.log('Updated tag:', updatedTag);

    // Get tag by slug
    const tagBySlug = await organizerService.getTagBySlug('vegetarian');
    console.log('Tag by slug:', tagBySlug);

    // Delete a tag
    const deletedTag = await organizerService.deleteTag(tagId);
    console.log('Deleted tag:', deletedTag);

    // =============== Tools ===============
    console.log('\n=== Working with Tools ===\n');

    // Get all tools with pagination
    const tools = await organizerService.getAllTools({
      page: 1,
      perPage: 10,
      search: 'blender',
      orderBy: 'name',
      orderDirection: 'asc',
    });
    console.log('Tools:', tools);

    // Create a new tool
    const newToolData: RecipeToolCreate = { name: 'Food Processor' };
    const newTool = await organizerService.createTool(newToolData);
    console.log('Created tool:', newTool);

    // Get a specific tool by ID
    const toolId = '123e4567-e89b-12d3-a456-426614174000'; // Replace with actual ID
    const tool = await organizerService.getToolById(toolId);
    console.log('Specific tool:', tool);

    // Update a tool
    const updateToolData: RecipeToolCreate = { name: 'High-Speed Blender' };
    const updatedTool = await organizerService.updateTool(toolId, updateToolData);
    console.log('Updated tool:', updatedTool);

    // Get tool by slug
    const toolBySlug = await organizerService.getToolBySlug('food-processor');
    console.log('Tool by slug:', toolBySlug);

    // Delete a tool
    const deletedTool = await organizerService.deleteTool(toolId);
    console.log('Deleted tool:', deletedTool);

    // =============== Advanced Usage ===============
    console.log('\n=== Advanced Usage ===\n');

    // Working with array parameters for filtering
    const filteredCategories = await organizerService.getAllCategories({
      page: 1,
      categories: ['breakfast', 'lunch', 'dinner'],
      tags: ['healthy', 'quick', 'vegetarian'],
    });
    console.log('Filtered categories:', filteredCategories);

    // Getting all tags without parameters
    const allTags = await organizerService.getAllTags();
    console.log('All tags:', allTags);

  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the demonstration
demonstrateOrganizerService();
