import { createClient } from '@supabase/supabase-js';
import { Database, Collection } from './types';
import * as bcrypt from 'bcryptjs';

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

export async function createOrder(params: Collection<'orders'>['Insert']) {
  try {
    const { error, data } = await supabase
      .from('orders')
      .insert(params)
      .select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Failed to create an order');
    throw error;
  }
}

export async function createCustomer(
  params: Collection<'customers'>['Insert']
) {
  try {
    const { error, data } = await supabase
      .from('customers')
      .insert(params)
      .select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Failed to create an order');
    throw error;
  }
}

export async function findUser(
  email: Collection<'users'>['Row']['email'],
  password: Collection<'users'>['Row']['password']
) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('email', email);

    if (error) throw error;

    const user = data[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    const { password: pw, ...withoutPassword } = user;
    return withoutPassword;
  } catch (error) {
    console.error('Failed to find a user');
    throw error;
  }
}

export async function createUser(
  email: Collection<'users'>['Row']['email'],
  password: Collection<'users'>['Row']['password']
) {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data, error } = await supabase
      .from('users')
      .insert({ email, password: hashedPassword })
      .select();

    if (error) {
      if (error.code === '23505') {
        throw new Error('User with that email already exists');
      }
      throw error;
    }

    const [createdUser] = data;

    const { password: pw, ...withoutPassword } = createdUser;

    return withoutPassword;
  } catch (error) {
    console.error('Failed to create a user');
    throw error;
  }
}
