/**
 * Tests for the Groups service - Multi Purpose Labels API
 */

import { GroupsService } from '../../../services/groups';
import { MealieClient } from '../../../client';
import {
  MultiPurposeLabelOut,
  MultiPurposeLabelPagination,
  MultiPurposeLabelCreate,
  MultiPurposeLabelUpdate,
} from '../../../types/groups';

// Mock the client
jest.mock('../../../client');

describe('Groups Service - Multi Purpose Labels API', () => {
  let groupsService: GroupsService;

  beforeEach(() => {
    groupsService = new GroupsService({ baseURL: 'http://localhost' });
    groupsService.get = jest.fn();
    groupsService.post = jest.fn();
    groupsService.put = jest.fn();
    groupsService.delete = jest.fn();
  });

  test('getAllLabels should handle no parameters', async () => {
    const mockResponse: MultiPurposeLabelPagination = {
      items: [{ id: 'l1', name: 'Label 1', groupId: 'g1' }],
    };

    (groupsService.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.getAllLabels();

    expect(result).toEqual(mockResponse);
    expect(groupsService.get).toHaveBeenCalledWith('/api/groups/labels');
  });

  test('getAllLabels should handle search without other parameters', async () => {
    const mockResponse: MultiPurposeLabelPagination = {
      items: [{ id: 'l1', name: 'Label 1', groupId: 'g1' }],
    };

    (groupsService.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.getAllLabels({ search: 'label' });

    expect(result).toEqual(mockResponse);
    expect(groupsService.get).toHaveBeenCalledWith('/api/groups/labels?search=label');
  });

  test('getAllLabels should get all labels with pagination and search', async () => {
    const mockResponse: MultiPurposeLabelPagination = {
      items: [
        { id: 'l1', name: 'Label 1', groupId: 'g1' },
        { id: 'l2', name: 'Label 2', groupId: 'g1' },
      ],
    };

    (groupsService.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.getAllLabels({
      search: 'test',
      page: 1,
      perPage: 10,
    });

    expect(result).toEqual(mockResponse);
    expect(groupsService.get).toHaveBeenCalledWith('/api/groups/labels?search=test&page=1&perPage=10');
  });

  test('createLabel should create a new label', async () => {
    const mockResponse: MultiPurposeLabelOut = {
      id: 'l1',
      name: 'New Label',
      groupId: 'g1',
    };

    const createData: MultiPurposeLabelCreate = {
      name: 'New Label',
    };

    (groupsService.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.createLabel(createData);

    expect(result).toEqual(mockResponse);
    expect(groupsService.post).toHaveBeenCalledWith('/api/groups/labels', createData);
  });

  test('getOneLabel should get a specific label', async () => {
    const mockResponse: MultiPurposeLabelOut = {
      id: 'l1',
      name: 'Label 1',
      groupId: 'g1',
    };

    (groupsService.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.getOneLabel('l1');

    expect(result).toEqual(mockResponse);
    expect(groupsService.get).toHaveBeenCalledWith('/api/groups/labels/l1');
  });

  test('updateLabel should update a label', async () => {
    const mockResponse: MultiPurposeLabelOut = {
      id: 'l1',
      name: 'Updated Label',
      groupId: 'g1',
    };

    const updateData: MultiPurposeLabelUpdate = {
      id: 'l1',
      name: 'Updated Label',
      groupId: 'g1',
    };

    (groupsService.put as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.updateLabel('l1', updateData);

    expect(result).toEqual(mockResponse);
    expect(groupsService.put).toHaveBeenCalledWith('/api/groups/labels/l1', updateData);
  });

  test('deleteLabel should delete a label', async () => {
    const mockResponse: MultiPurposeLabelOut = {
      id: 'l1',
      name: 'Label 1',
      groupId: 'g1',
    };

    (groupsService.delete as jest.Mock).mockResolvedValue(mockResponse);

    const result = await groupsService.deleteLabel('l1');

    expect(result).toEqual(mockResponse);
    expect(groupsService.delete).toHaveBeenCalledWith('/api/groups/labels/l1');
  });

  test('should handle empty search parameter', async () => {
    (groupsService.get as jest.Mock).mockResolvedValue({ items: [] });

    await groupsService.getAllLabels({ search: '' });

    expect(groupsService.get).toHaveBeenCalledWith('/api/groups/labels?search=');
  });
});
