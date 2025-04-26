import { OrganizerService } from '../../services/organizers.js';
import type {
  CategoryIn,
  TagIn,
  RecipeToolCreate,
  RecipeQueryParams,
} from '../../types/index.js';

describe('OrganizerService', () => {
  let service: OrganizerService;
  const baseUrl = 'http://test.example.com';
  const token = 'test-token';

  beforeEach(() => {
    service = new OrganizerService({ baseUrl, token });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Categories', () => {
    it('should get all categories with pagination parameters', async () => {
      const mockResponse = {
        items: [
          { id: '1', name: 'Breakfast', slug: 'breakfast' },
          { id: '2', name: 'Lunch', slug: 'lunch' },
        ],
        total: 2,
        page: 1,
        perPage: 50,
      };

      jest.spyOn(service, 'get').mockResolvedValue(mockResponse);

      const params: RecipeQueryParams = {
        page: 1,
        perPage: 10,
        search: 'breakfast',
        orderBy: 'name',
        orderDirection: 'asc',
      };

      const result = await service.getAllCategories(params);

      expect(result).toEqual(mockResponse);
      expect(service.get).toHaveBeenCalledWith(
        '/api/organizers/categories?page=1&perPage=10&search=breakfast&orderBy=name&orderDirection=asc'
      );
    });

    it('should handle empty parameters when getting categories', async () => {
      const mockResponse = {
        items: [],
        total: 0,
        page: 1,
        perPage: 50,
      };

      jest.spyOn(service, 'get').mockResolvedValue(mockResponse);

      // Call without parameters
      const result = await service.getAllCategories();

      expect(result).toEqual(mockResponse);
      expect(service.get).toHaveBeenCalledWith('/api/organizers/categories');
    });

    it('should handle array parameters when getting categories', async () => {
      const mockResponse = {
        items: [
          { id: '1', name: 'Breakfast', slug: 'breakfast' },
          { id: '2', name: 'Lunch', slug: 'lunch' },
        ],
        total: 2,
        page: 1,
        perPage: 50,
      };

      jest.spyOn(service, 'get').mockResolvedValue(mockResponse);

      const params: RecipeQueryParams = {
        page: 1,
        categories: ['breakfast', 'lunch'],
        tags: ['healthy', 'quick'],
      };

      const result = await service.getAllCategories(params);

      expect(result).toEqual(mockResponse);
      expect(service.get).toHaveBeenCalledWith(
        '/api/organizers/categories?page=1&categories=breakfast&categories=lunch&tags=healthy&tags=quick'
      );
    });

    it('should create a new category', async () => {
      const categoryData: CategoryIn = { name: 'Desserts' };
      const mockResponse = {};

      jest.spyOn(service, 'post').mockResolvedValue(mockResponse);

      const result = await service.createCategory(categoryData);

      expect(result).toEqual(mockResponse);
      expect(service.post).toHaveBeenCalledWith('/api/organizers/categories', categoryData);
    });

    it('should get all empty categories', async () => {
      const mockResponse = [
        { id: '1', name: 'Empty Category', slug: 'empty-category' },
      ];

      jest.spyOn(service, 'get').mockResolvedValue(mockResponse);

      const result = await service.getAllEmptyCategories();

      expect(result).toEqual(mockResponse);
      expect(service.get).toHaveBeenCalledWith('/api/organizers/categories/empty');
    });

    it('should get a category by ID', async () => {
      const categoryId = '123e4567-e89b-12d3-a456-426614174000';
      const mockResponse = {
        id: categoryId,
        name: 'Breakfast',
        slug: 'breakfast',
        recipes: [],
      };

      jest.spyOn(service, 'get').mockResolvedValue(mockResponse);

      const result = await service.getCategoryById(categoryId);

      expect(result).toEqual(mockResponse);
      expect(service.get).toHaveBeenCalledWith(`/api/organizers/categories/${categoryId}`);
    });

    it('should update a category', async () => {
      const categoryId = '123e4567-e89b-12d3-a456-426614174000';
      const updateData: CategoryIn = { name: 'Updated Breakfast' };
      const mockResponse = {
        id: categoryId,
        name: 'Updated Breakfast',
        slug: 'updated-breakfast',
      };

      jest.spyOn(service, 'put').mockResolvedValue(mockResponse);

      const result = await service.updateCategory(categoryId, updateData);

      expect(result).toEqual(mockResponse);
      expect(service.put).toHaveBeenCalledWith(`/api/organizers/categories/${categoryId}`, updateData);
    });

    it('should delete a category', async () => {
      const categoryId = '123e4567-e89b-12d3-a456-426614174000';
      const mockResponse = {};

      jest.spyOn(service, 'delete').mockResolvedValue(mockResponse);

      const result = await service.deleteCategory(categoryId);

      expect(result).toEqual(mockResponse);
      expect(service.delete).toHaveBeenCalledWith(`/api/organizers/categories/${categoryId}`);
    });

    it('should get a category by slug', async () => {
      const slug = 'breakfast';
      const mockResponse = {};

      jest.spyOn(service, 'get').mockResolvedValue(mockResponse);

      const result = await service.getCategoryBySlug(slug);

      expect(result).toEqual(mockResponse);
      expect(service.get).toHaveBeenCalledWith(`/api/organizers/categories/slug/${slug}`);
    });
  });

  describe('Tags', () => {
    it('should get all tags with pagination parameters', async () => {
      const mockResponse = {
        items: [
          { id: '1', name: 'Healthy', slug: 'healthy' },
          { id: '2', name: 'Quick', slug: 'quick' },
        ],
        total: 2,
        page: 1,
        perPage: 50,
      };

      jest.spyOn(service, 'get').mockResolvedValue(mockResponse);

      const params: RecipeQueryParams = {
        page: 1,
        perPage: 10,
        search: 'healthy',
        orderBy: 'name',
        orderDirection: 'asc',
      };

      const result = await service.getAllTags(params);

      expect(result).toEqual(mockResponse);
      expect(service.get).toHaveBeenCalledWith(
        '/api/organizers/tags?page=1&perPage=10&search=healthy&orderBy=name&orderDirection=asc'
      );
    });

    it('should handle empty parameters when getting tags', async () => {
      const mockResponse = {
        items: [],
        total: 0,
        page: 1,
        perPage: 50,
      };

      jest.spyOn(service, 'get').mockResolvedValue(mockResponse);

      // Call without parameters
      const result = await service.getAllTags();

      expect(result).toEqual(mockResponse);
      expect(service.get).toHaveBeenCalledWith('/api/organizers/tags');
    });

    it('should handle array parameters when getting tags', async () => {
      const mockResponse = {
        items: [
          { id: '1', name: 'Healthy', slug: 'healthy' },
          { id: '2', name: 'Quick', slug: 'quick' },
        ],
        total: 2,
        page: 1,
        perPage: 50,
      };

      jest.spyOn(service, 'get').mockResolvedValue(mockResponse);

      const params: RecipeQueryParams = {
        page: 1,
        categories: ['breakfast', 'lunch'],
        tags: ['healthy', 'quick'],
      };

      const result = await service.getAllTags(params);

      expect(result).toEqual(mockResponse);
      expect(service.get).toHaveBeenCalledWith(
        '/api/organizers/tags?page=1&categories=breakfast&categories=lunch&tags=healthy&tags=quick'
      );
    });

    it('should create a new tag', async () => {
      const tagData: TagIn = { name: 'Vegetarian' };
      const mockResponse = {};

      jest.spyOn(service, 'post').mockResolvedValue(mockResponse);

      const result = await service.createTag(tagData);

      expect(result).toEqual(mockResponse);
      expect(service.post).toHaveBeenCalledWith('/api/organizers/tags', tagData);
    });

    it('should get empty tags', async () => {
      const mockResponse = {};

      jest.spyOn(service, 'get').mockResolvedValue(mockResponse);

      const result = await service.getEmptyTags();

      expect(result).toEqual(mockResponse);
      expect(service.get).toHaveBeenCalledWith('/api/organizers/tags/empty');
    });

    it('should get a tag by ID', async () => {
      const tagId = '123e4567-e89b-12d3-a456-426614174000';
      const mockResponse = {
        id: tagId,
        name: 'Healthy',
        slug: 'healthy',
      };

      jest.spyOn(service, 'get').mockResolvedValue(mockResponse);

      const result = await service.getTagById(tagId);

      expect(result).toEqual(mockResponse);
      expect(service.get).toHaveBeenCalledWith(`/api/organizers/tags/${tagId}`);
    });

    it('should update a tag', async () => {
      const tagId = '123e4567-e89b-12d3-a456-426614174000';
      const updateData: TagIn = { name: 'Updated Healthy' };
      const mockResponse = {
        id: tagId,
        name: 'Updated Healthy',
        slug: 'updated-healthy',
      };

      jest.spyOn(service, 'put').mockResolvedValue(mockResponse);

      const result = await service.updateTag(tagId, updateData);

      expect(result).toEqual(mockResponse);
      expect(service.put).toHaveBeenCalledWith(`/api/organizers/tags/${tagId}`, updateData);
    });

    it('should delete a tag', async () => {
      const tagId = '123e4567-e89b-12d3-a456-426614174000';
      const mockResponse = {};

      jest.spyOn(service, 'delete').mockResolvedValue(mockResponse);

      const result = await service.deleteTag(tagId);

      expect(result).toEqual(mockResponse);
      expect(service.delete).toHaveBeenCalledWith(`/api/organizers/tags/${tagId}`);
    });

    it('should get a tag by slug', async () => {
      const slug = 'healthy';
      const mockResponse = {
        id: '1',
        name: 'Healthy',
        slug: 'healthy',
      };

      jest.spyOn(service, 'get').mockResolvedValue(mockResponse);

      const result = await service.getTagBySlug(slug);

      expect(result).toEqual(mockResponse);
      expect(service.get).toHaveBeenCalledWith(`/api/organizers/tags/slug/${slug}`);
    });
  });

  describe('Tools', () => {
    it('should get all tools with pagination parameters', async () => {
      const mockResponse = {
        items: [
          { id: '1', name: 'Blender', slug: 'blender' },
          { id: '2', name: 'Knife', slug: 'knife' },
        ],
        total: 2,
        page: 1,
        perPage: 50,
      };

      jest.spyOn(service, 'get').mockResolvedValue(mockResponse);

      const params: RecipeQueryParams = {
        page: 1,
        perPage: 10,
        search: 'blender',
        orderBy: 'name',
        orderDirection: 'asc',
      };

      const result = await service.getAllTools(params);

      expect(result).toEqual(mockResponse);
      expect(service.get).toHaveBeenCalledWith(
        '/api/organizers/tools?page=1&perPage=10&search=blender&orderBy=name&orderDirection=asc'
      );
    });

    it('should handle empty parameters when getting tools', async () => {
      const mockResponse = {
        items: [],
        total: 0,
        page: 1,
        perPage: 50,
      };

      jest.spyOn(service, 'get').mockResolvedValue(mockResponse);

      // Call without parameters
      const result = await service.getAllTools();

      expect(result).toEqual(mockResponse);
      expect(service.get).toHaveBeenCalledWith('/api/organizers/tools');
    });

    it('should handle array parameters when getting tools', async () => {
      const mockResponse = {
        items: [
          { id: '1', name: 'Blender', slug: 'blender' },
          { id: '2', name: 'Knife', slug: 'knife' },
        ],
        total: 2,
        page: 1,
        perPage: 50,
      };

      jest.spyOn(service, 'get').mockResolvedValue(mockResponse);

      const params: RecipeQueryParams = {
        page: 1,
        categories: ['kitchen', 'appliance'],
        tools: ['blender', 'knife'],
      };

      const result = await service.getAllTools(params);

      expect(result).toEqual(mockResponse);
      expect(service.get).toHaveBeenCalledWith(
        '/api/organizers/tools?page=1&categories=kitchen&categories=appliance&tools=blender&tools=knife'
      );
    });

    it('should create a new tool', async () => {
      const toolData: RecipeToolCreate = { name: 'Food Processor' };
      const mockResponse = {
        id: '1',
        name: 'Food Processor',
        slug: 'food-processor',
      };

      jest.spyOn(service, 'post').mockResolvedValue(mockResponse);

      const result = await service.createTool(toolData);

      expect(result).toEqual(mockResponse);
      expect(service.post).toHaveBeenCalledWith('/api/organizers/tools', toolData);
    });

    it('should get a tool by ID', async () => {
      const toolId = '123e4567-e89b-12d3-a456-426614174000';
      const mockResponse = {
        id: toolId,
        name: 'Blender',
        slug: 'blender',
        onHand: true,
      };

      jest.spyOn(service, 'get').mockResolvedValue(mockResponse);

      const result = await service.getToolById(toolId);

      expect(result).toEqual(mockResponse);
      expect(service.get).toHaveBeenCalledWith(`/api/organizers/tools/${toolId}`);
    });

    it('should update a tool', async () => {
      const toolId = '123e4567-e89b-12d3-a456-426614174000';
      const updateData: RecipeToolCreate = { name: 'Updated Blender' };
      const mockResponse = {
        id: toolId,
        name: 'Updated Blender',
        slug: 'updated-blender',
      };

      jest.spyOn(service, 'put').mockResolvedValue(mockResponse);

      const result = await service.updateTool(toolId, updateData);

      expect(result).toEqual(mockResponse);
      expect(service.put).toHaveBeenCalledWith(`/api/organizers/tools/${toolId}`, updateData);
    });

    it('should delete a tool', async () => {
      const toolId = '123e4567-e89b-12d3-a456-426614174000';
      const mockResponse = {
        id: toolId,
        name: 'Blender',
        slug: 'blender',
      };

      jest.spyOn(service, 'delete').mockResolvedValue(mockResponse);

      const result = await service.deleteTool(toolId);

      expect(result).toEqual(mockResponse);
      expect(service.delete).toHaveBeenCalledWith(`/api/organizers/tools/${toolId}`);
    });

    it('should get a tool by slug', async () => {
      const slug = 'blender';
      const mockResponse = {
        id: '1',
        name: 'Blender',
        slug: 'blender',
      };

      jest.spyOn(service, 'get').mockResolvedValue(mockResponse);

      const result = await service.getToolBySlug(slug);

      expect(result).toEqual(mockResponse);
      expect(service.get).toHaveBeenCalledWith(`/api/organizers/tools/slug/${slug}`);
    });
  });
});
