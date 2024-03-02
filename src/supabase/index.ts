import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

const supabase = createClient<Database>(
  'https://wmxocjbdwoeiujytdosw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndteG9jamJkd29laXVqeXRkb3N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg4ODIyODEsImV4cCI6MjAyNDQ1ODI4MX0.DBh19B08fVGf-t-qu9NDSauYnC0BNYC-sBGfi4s3jcw'
);

export async function getCollections() {
  try {
    const response = await supabase.from('collections').select();
    return response.data;
  } catch (error) {
    console.error('error on getting collections', error);
    throw error;
  }
}

export async function getProducts(collectionId: number) {
  try {
    const response = await supabase
      .from('products')
      .select()
      .eq('collection_id', collectionId);
    return response.data;
  } catch (error) {
    console.error('error on getting products', error);
    throw error;
  }
}
