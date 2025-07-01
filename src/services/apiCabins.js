import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.log(error);
    throw new Error('Cabin could not be loaded');
  }
  return data;
}

export async function createEditCabins(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

  let query = await supabase.from('cabins');

  // Creating new Cabin
  if (!id) {
    query = query
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single();
  }
  // Edit cabin
  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id)
      .select();
  }

  const { data, error } = await query;
  if (error) {
    console.log(error);
    throw new Error('Cabin could not be created');
  }

  // If already an image Uploaded
  if (hasImagePath) return data;

  // Uploading Cabin Image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image, {
      cacheControl: '3600',
      upsert: false,
    });

  // Delete Cabin If Image not Upload Correctly
  if (storageError) {
    const cabinId = data[0].id;
    await supabase.from('cabins').delete().eq('id', cabinId);
    throw Error(
      'Cabin image could not be uploaded and the cabin was not created'
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.log(error);
    throw new Error('Cabin could not be deleted');
  }
  return data;
}
