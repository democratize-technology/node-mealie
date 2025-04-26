import { buildQueryParams } from '../../utils/query-builder';

describe('buildQueryParams', () => {
  it('should return empty string for undefined params', () => {
    expect(buildQueryParams()).toBe('');
  });

  it('should return empty string for null params', () => {
    expect(buildQueryParams(null as any)).toBe('');
  });

  it('should return empty string for empty object', () => {
    expect(buildQueryParams({})).toBe('');
  });

  it('should exclude undefined values', () => {
    const params = { key1: 'value1', key2: undefined };
    expect(buildQueryParams(params)).toBe('?key1=value1');
  });

  it('should exclude null values', () => {
    const params = { key1: 'value1', key2: null };
    expect(buildQueryParams(params)).toBe('?key1=value1');
  });

  it('should include 0 values', () => {
    const params = { number: 0 };
    expect(buildQueryParams(params)).toBe('?number=0');
  });

  it('should include empty string values', () => {
    const params = { empty: '' };
    expect(buildQueryParams(params)).toBe('?empty=');
  });

  it('should convert arrays to comma-separated strings', () => {
    const params = { items: ['a', 'b', 'c'] };
    expect(buildQueryParams(params)).toBe('?items=a,b,c');
  });

  it('should skip empty arrays', () => {
    const params = { items: [] };
    expect(buildQueryParams(params)).toBe('');
  });

  it('should JSON stringify objects', () => {
    const params = { filter: { active: true, type: 'user' } };
    expect(buildQueryParams(params)).toBe('?filter=%7B%22active%22%3Atrue%2C%22type%22%3A%22user%22%7D');
  });

  it('should handle boolean values', () => {
    const params = { active: true, disabled: false };
    expect(buildQueryParams(params)).toBe('?active=true&disabled=false');
  });

  it('should handle number values', () => {
    const params = { page: 1, perPage: 50 };
    expect(buildQueryParams(params)).toBe('?page=1&perPage=50');
  });

  it('should handle mixed types', () => {
    const params = {
      string: 'test',
      number: 42,
      boolean: true,
      array: ['a', 'b'],
      object: { nested: 'value' },
      zero: 0,
      empty: '',
      nullVal: null,
      undefinedVal: undefined,
    };

    const result = buildQueryParams(params);
    expect(result).toContain('string=test');
    expect(result).toContain('number=42');
    expect(result).toContain('boolean=true');
    expect(result).toContain('array=a,b');
    expect(result).toContain('object=%7B%22nested%22%3A%22value%22%7D');
    expect(result).toContain('zero=0');
    expect(result).toContain('empty=');
    expect(result).not.toContain('nullVal');
    expect(result).not.toContain('undefinedVal');
  });

  it('should properly encode special characters', () => {
    const params = { query: 'hello world', filter: 'user:admin' };
    const result = buildQueryParams(params);
    expect(result).toContain('query=hello%20world');
    expect(result).toContain('filter=user%3Aadmin');
  });
});
