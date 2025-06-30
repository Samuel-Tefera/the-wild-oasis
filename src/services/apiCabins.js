import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.log(error);
    throw new Error('Cabin could not be loaded');
  }
  return data;
}

export async function createCabins(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;
  //Creating new Cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    console.log(error);
    throw new Error('Cabin could not be created');
  }

  // Uploading Cabin Image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image, {
      cacheControl: '3600',
      upsert: false,
    });
  // Delete cabin if image not upload correctly
  if (storageError) {
    const cabinId = data[0].id;
    await supabase.from('cabins').delete().eq('id', cabinId);
    throw Error(
      'Cabin image could not be uploaded and the cabin was not created'
    );
  }

  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.log(error);
    throw new Error('Cabin could not be deleted');
  }
  return data;
}
