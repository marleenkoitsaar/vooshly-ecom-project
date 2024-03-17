import { createClient } from '@supabase/supabase-js';
import { Database, Collection } from './types';
import * as bcrypt from 'bcryptjs';

const supabase = createClient<Database>(
  'https://wmxocjbdwoeiujytdosw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndteG9jamJkd29laXVqeXRkb3N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg4ODIyODEsImV4cCI6MjAyNDQ1ODI4MX0.DBh19B08fVGf-t-qu9NDSauYnC0BNYC-sBGfi4s3jcw'
);

export async function getCollections() {
  try {
    const { error, data } = await supabase.from('collections').select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('error on getting collections', error);
    throw error;
  }
}

export async function getProducts(collectionId: number) {
  try {
    const { error, data } = await supabase
      .from('products')
      .select()
      .eq('collection_id', collectionId);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('error on getting products', error);
    throw error;
  }
}

export async function generateOrderNumber() {
  try {
    const { error, data } = await supabase.from('orders').select();
    if (error) throw error;
    const lastOrderNumber = data.at(-1)?.number;
    if (lastOrderNumber !== undefined)
      return String(Number(lastOrderNumber) + 1);
    return '100000';
  } catch (error) {
    console.error('error on generating order number', error);
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

export async function findOrCreateCustomer(
  params: Collection<'customers'>['Insert']
) {
  console.log(params)
  try {
    if (!params.email) throw new Error('No email specified');

    const { data: customers, error } = await supabase
      .from('customers')
      .select()
      .eq('email', params.email);

    console.log({ customers });

    if (error) throw error;
    if (customers !== null && customers.length > 0) return customers[0];

    const { error: errorOnCreation, data } = await supabase
      .from('customers')
      .insert(params)
      .select();
    console.log({ data });
    if (errorOnCreation) throw errorOnCreation;
    return data[0];
  } catch (error) {
    console.error('Failed to find or create custoemr');
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

export async function getAllProducts() {
  try {
    const { error, data } = await supabase.from('products').select();
    if (error) throw error;

    return data;
  } catch (error) {
    console.error('error on getting products', error);
    throw error;
  }
}
