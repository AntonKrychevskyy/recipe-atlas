import axios, { Axios } from 'axios';
import { convertToStringsRecord } from './api.utils';
import { API_BASE_URL } from './api.const';
import { RecipeDetails, RecipeParams } from '../types';

export default class RecipeAPI {
  private api_path: string;
  private api: Axios;

  constructor(api_path: string) {
    this.api_path = api_path;
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json: charset=UTF-8',
      },
    });
  }

  async readMany(params: RecipeParams = {}): Promise<RecipeDetails[]> {
    try {
      let queryParams;

      if ('s' in params && params?.s?.trim()) {
        queryParams = new URLSearchParams({ s: params.s.trim() });
      } else if ('f' in params && params?.f?.trim()) {
        queryParams = new URLSearchParams({ f: params.f.trim() });
      } else {
        queryParams = new URLSearchParams(
          convertToStringsRecord(params as Record<string, unknown>)
        );
      }

      const response = await this.api.get(this.api_path, { params: queryParams });

      return response.data.meals || response.data;
    } catch (error) {
      console.error('Error fetching recipes: ', error);
      throw error;
    }
  }

  async readOne(id: string): Promise<RecipeDetails> {
    try {
      const response = await this.api.get(`${this.api_path}/${id}`);

      return response.data.meals ? response.data.meals.at(0) : response.data;
    } catch (error) {
      console.error(`Error fetching recipe with id ${id}: `, error);
      throw error;
    }
  }
}
